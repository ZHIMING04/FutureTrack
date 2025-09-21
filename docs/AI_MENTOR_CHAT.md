# AI Mentor Chat — Implementation Spec (FutureTrack)

> **Scope:** Adds an AI-powered “Mentors & Guidance → AI Mentor Chat” that answers preset quick questions grounded in **MySQL** data via **AWS Bedrock (Amazon Nova)**. Free-text remains available but returns a default message for non-preset queries (demo constraint).

---

## 1) Objectives

* Provide fast, reliable answers to student questions using **deterministic DB retrieval** + **LLM verbalization**.
* Avoid vector DB for the hackathon; read from **MySQL** directly.
* Use **AWS Bedrock (Nova)** exclusively through the existing `BedrockChatService`.
* Ship a clean UX that matches the shown UI:

  * Left: navigation.
  * Center: **AI Mentor Chat** messages.
  * Right: “**Quick Questions**” list (click to query), plus a feature highlights card.

**Non-Goals (for this iteration):**

* No open-ended NLP search.
* No human mentor routing/escalation.
* No realtime typing indicators (optional).

---

## 2) End-to-End Flow

```
[User clicks Quick Question]
        │
        ▼
[Frontend] POST /api/ai/mentor
        │   payload: { intent_id, params?, message_id? }
        ▼
[Backend Controller] MentorController@answer
        │
        ├─ validate intent_id against AI_QUICK_QUESTIONS.json
        ├─ run retrieval (Eloquent/Query Builder)
        ├─ build compact Context JSON (≤ 2 KB)
        ├─ call BedrockChatService->chatWithContext()
        └─ return { answer, sources, intent_id, ts }
        ▼
[Frontend] render in chat; optionally persist to "My Sessions"
```

---

## 3) Frontend (React + Inertia)

### 3.1 Components

* `resources/js/Pages/Mentors/Guidance.jsx`

  * **Tabs:** `["AI Mentor", "Human Mentors", "My Sessions"]` (AI tab default)
  * **AI Mentor Panel**:

    * `ChatThread` — bubbles for user/AI messages.
    * `QuickQuestionsList` — right rail buttons (10–12 items).
    * `MessageInput` — input + Send button.
* **States:**

  * `messages: Array<{role: "user"|"assistant", text: string, intent_id?: string, meta?: any}>`
  * `loading: boolean`
  * `selectedQuick: intent_id | null`

### 3.2 API Calls

* `POST /api/ai/mentor`

  * Body: `{ intent_id: string, params?: object }`
  * Response: `{ answer: string, sources: Array<{table: string, ids: number[]}> , intent_id, ts }`

* `POST /api/ai/mentor/free_text` (optional; demo returns fallback)

  * Body: `{ text: string }`
  * Response: `{ answer: DEFAULT_MESSAGE, intent_id: "fallback" }`

### 3.3 UX Notes

* On click of a quick question: disable input, show loading spinner in chat.
* When answer returns: append AI bubble, show **small “from: table#id”** chips if available.
* Keep history in component state; optional persistence via localStorage.

---

## 4) Data Sources & Intents

> The agent ranked these as the best demo sources:
> **pathway\_requirements, career\_matches, deadlines, university\_courses, user\_progress**.
> Data gaps to ignore for now: `user_applications`, `course_enrollments`, `simulations`.

### 4.1 Quick Questions (Preset)

> Save as `/docs/ai/AI_QUICK_QUESTIONS.json` **and** seed into config at deploy.

| Intent ID                      | Label (UI)                                      | Source Tables                                   | Typical Params              | Retrieval Stub (SQL-like)                                                                                                                                                                                                    | Answer Fields                                  |
| ------------------------------ | ----------------------------------------------- | ----------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `requirements_for_course`      | What are the requirements for Computer Science? | `pathway_requirements` ↔ `pathways`             | `course="Computer Science"` | `SELECT r.description, r.min_grade FROM requirements r JOIN pathways p ON p.id=r.pathway_id WHERE p.name ILIKE :course LIMIT 5;`                                                                                             | `description, min_grade`                       |
| `compare_entry_routes`         | Compare STPM vs Foundation                      | `entry_routes`                                  |                             | `SELECT pathway, duration_years, competitiveness, notes FROM entry_routes WHERE pathway IN ('STPM','Foundation');`                                                                                                           | `pathway,duration_years,competitiveness,notes` |
| `eligibility_hint_from_scores` | How to improve my pathway eligibility?          | `pathway_requirements`, `assessments` (by user) | `user_id`                   | join requirements to user’s assessment highlights (subjects/grades or personality)                                                                                                                                           | top gaps & tips                                |
| `deadlines_this_month`         | Deadlines this month                            | `deadlines` ↔ `applications`                    | `now`                       | `SELECT a.program_name, d.deadline_date, a.portal_url FROM deadlines d JOIN applications a ON a.id=d.application_id WHERE MONTH(d.deadline_date)=MONTH(:now) AND YEAR(d.deadline_date)=YEAR(:now) ORDER BY d.deadline_date;` | `program_name, deadline_date, portal_url`      |
| `university_offerings_cs`      | Universities offering Computer Science          | `university_courses`                            |                             | `SELECT university_name, course_name, duration_years FROM university_courses WHERE discipline ILIKE 'Computer Science';`                                                                                                     | `university_name, course_name, duration_years` |
| `top_career_matches`           | My top career matches                           | `career_matches` ↔ `assessments`                | `user_id`                   | `SELECT cm.career_name, cm.score, cm.why_match FROM career_matches cm JOIN assessments a ON a.id=cm.assessment_id WHERE a.user_id=:user_id ORDER BY cm.score DESC LIMIT 5;`                                                  | `career_name, score, why_match`                |
| `roadmap_next_actions`         | What should I do next?                          | `user_progress` ↔ `roadmap_phases`              | `user_id`                   | `SELECT rp.phase_name, up.status, rp.recommended_actions FROM user_progress up JOIN roadmap_phases rp ON rp.id=up.phase_id WHERE up.user_id=:user_id ORDER BY rp.ordering LIMIT 3;`                                          | `phase_name, status, recommended_actions`      |
| `subjects_needed_stpm_cs`      | STPM subjects needed for CS                     | `pathway_requirements` ↔ `pathways`             |                             | `SELECT subject_code, min_grade FROM requirements r JOIN pathways p ON p.id=r.pathway_id WHERE p.name ILIKE 'Computer Science' AND p.entry_route='STPM';`                                                                    | `subject_code, min_grade`                      |
| `matriculation_vs_stpm_speed`  | Which is faster: STPM or Matriculation?         | `entry_routes`                                  |                             | `SELECT pathway, duration_years FROM entry_routes WHERE pathway IN ('STPM','Matriculation');`                                                                                                                                | `pathway, duration_years`                      |
| `next_deadline_for_program`    | Next deadline for <program>                     | `deadlines`,`applications`                      | `program_name`              | `SELECT a.program_name, MIN(d.deadline_date) as next_deadline FROM deadlines d JOIN applications a ON a.id=d.application_id WHERE a.program_name ILIKE :program GROUP BY a.program_name;`                                    | `program_name, next_deadline`                  |

> **Guardrails (global):** If retrieval returns zero rows, respond: *“I don’t have enough data for that yet.”*

---

## 5) Backend Design (Laravel)

### 5.1 Routes

```php
// routes/api.php
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/ai/mentor', [MentorController::class, 'answer']);
    Route::post('/ai/mentor/free_text', [MentorController::class, 'fallback']); // optional
});
```

### 5.2 Config & Files

* `config/ai.php`

  * `quick_questions_path` → `base_path('docs/ai/AI_QUICK_QUESTIONS.json')`
  * `max_context_bytes` → `2048`
  * `model_id` → `env('BEDROCK_MODEL_ID','amazon.nova-lite-v1:0')`
* `/docs/ai/AI_QUICK_QUESTIONS.json` — the table above (machine JSON).

### 5.3 Controller

```php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Ai\MentorService;
use Illuminate\Http\Request;

class MentorController extends Controller
{
    public function answer(Request $req, MentorService $svc)
    {
        $data = $req->validate([
            'intent_id' => 'required|string',
            'params'    => 'array'
        ]);

        return response()->json($svc->answerQuickQuestion(
            $data['intent_id'],
            $data['params'] ?? [],
            $req->user()
        ));
    }

    public function fallback(Request $req)
    {
        return response()->json([
            'intent_id' => 'fallback',
            'answer'    => "For the demo, please use the Quick Questions on the right.",
            'sources'   => [],
            'ts'        => now()->toIso8601String(),
        ]);
    }
}
```

### 5.4 Service Layer

```php
namespace App\Services\Ai;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use App\Services\BedrockChatService; // existing Nova wrapper

class MentorService
{
    public function __construct(
        private BedrockChatService $llm
    ) {}

    public function answerQuickQuestion(string $intentId, array $params, $user): array
    {
        $specs = $this->specs(); // load AI_QUICK_QUESTIONS.json
        $spec  = $specs[$intentId] ?? null;
        abort_if(!$spec, 404, 'Unknown intent');

        // 1) Retrieve (deterministic; never let LLM build SQL)
        [$rows, $sources] = $this->runRetrieval($spec, $params, $user);

        if (empty($rows)) {
            return [
                'intent_id' => $intentId,
                'answer'    => $spec['guardrails'] ?? "I don’t have enough data for that yet.",
                'sources'   => [],
                'ts'        => now()->toIso8601String(),
            ];
        }

        // 2) Build compact context
        $context = [
            'intent_id' => $intentId,
            'params'    => $params,
            'rows'      => $this->slim($rows, Arr::wrap($spec['answer_fields'] ?? [])),
            'sources'   => $sources,
        ];

        // 3) Call LLM
        $answer = $this->llm->chatWithContext(
            $this->prompt($spec['label'] ?? $intentId, $context)
        );

        return [
            'intent_id' => $intentId,
            'answer'    => $answer,
            'sources'   => $sources,
            'ts'        => now()->toIso8601String(),
        ];
    }

    private function prompt(string $label, array $context): string
    {
        return <<<TXT
You are the FutureTrack AI Mentor. Answer ONLY using the Context.
If information is missing, say so briefly. Keep answers under 120 words.

Question: {$label}

Context (JSON):
"""{$this->json($context)}"""
TXT;
    }

    private function runRetrieval(array $spec, array $params, $user): array
    {
        // Pseudocode: switch by intent, or interpret a safe subset from spec
        // Ensure all inputs are validated and whitelisted.
        // Return: [$rows, $sources]
        // Implement with Query Builder/Eloquent for each intent.
        return [[], []];
    }

    private function specs(): array
    {
        $path = config('ai.quick_questions_path');
        return json_decode(file_get_contents($path), true) ?? [];
    }

    private function slim(array $rows, array $fields): array
    {
        if (!$fields) return $rows;
        return array_map(fn($r) => array_intersect_key($r, array_flip($fields)), $rows);
    }

    private function json($x): string
    {
        return mb_strimwidth(json_encode($x, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES), 0, config('ai.max_context_bytes'));
    }
}
```

### 5.5 Bedrock Wrapper (Nova)

```php
// App/Services/BedrockChatService.php
public function chatWithContext(string $prompt): string
{
    $resp = $this->client->converse([
        'modelId'  => $this->modelId,
        'messages' => [
            ['role' => 'user', 'content' => [['text' => $prompt]]],
        ],
        'inferenceConfig' => ['maxTokens' => 400, 'temperature' => 0.2],
    ]);

    foreach ($resp['output']['message']['content'] ?? [] as $part) {
        if (isset($part['text'])) return $part['text'];
    }
    return 'Sorry, I could not generate a response.';
}
```

---

## 6) Retrieval Examples (Eloquent/Builder)

> Implement these in `MentorService::runRetrieval(...)`.

```php
// requirements_for_course
$rows = DB::table('requirements as r')
  ->join('pathways as p', 'p.id', '=', 'r.pathway_id')
  ->where('p.name', 'ILIKE', $params['course'] ?? 'Computer Science')
  ->select('r.description','r.min_grade','r.id')
  ->limit(5)->get()->map(fn($x)=>(array)$x)->all();
$sources = [['table'=>'requirements','ids'=>array_column($rows,'id')]];

// top_career_matches
$rows = DB::table('career_matches as cm')
  ->join('assessments as a','a.id','=','cm.assessment_id')
  ->where('a.user_id',$user->id)
  ->orderByDesc('cm.score')->limit(5)
  ->select('cm.career_name','cm.score','cm.why_match','cm.id')->get()->map(fn($x)=>(array)$x)->all();
$sources = [['table'=>'career_matches','ids'=>array_column($rows,'id')]];

// deadlines_this_month
$rows = DB::table('deadlines as d')
  ->join('applications as a','a.id','=','d.application_id')
  ->whereMonth('d.deadline_date', now()->month)
  ->whereYear('d.deadline_date', now()->year)
  ->orderBy('d.deadline_date')
  ->select('a.program_name','d.deadline_date','a.portal_url','d.id')->get()->map(fn($x)=>(array)$x)->all();
$sources = [['table'=>'deadlines','ids'=>array_column($rows,'id')]];
```

---

## 7) Security & Compliance

* **Auth:** Require `auth:sanctum` on `/api/ai/*`.
* **Authorization:** Read-only queries; restrict to the current user when joining user-owned rows (assessments, progress).
* **PII:** Do not include emails, tokens, or sensitive fields in the context.
* **Prompt Hardening:** Always include “Answer ONLY using the Context.”
* **Rate Limiting:** `throttle:ai` (e.g., 30/min per user).
* **Logging:** Log intent\_id, duration, row count, not the prompt text or raw rows (optional hash).

---

## 8) Performance & Caching

* **DB:** Ensure indexes on `deadlines.deadline_date`, FKs (`*_id`), and `career_matches.assessment_id`.
* **App Cache:** Cache hot intent answers per `(intent_id, params_hash, user_id)` for 60–120s.
* **Payload Size:** Trim context to only the `answer_fields`.

---

## 9) Error Handling

* **No rows:** Return guardrail message.
* **Bedrock error:** Return “I couldn’t generate an answer. Please try again.” and log the exception.
* **Timeouts:** Set SDK timeout (e.g., 8–12s) and DB query timeouts.

---

## 10) Observability

* Metrics:

  * `ai.intent.count`, `ai.intent.latency_ms`, `ai.intent.rows`
  * `ai.bedrock.error.count`, `ai.db.error.count`
* Traces:

  * Tag each request with `intent_id`, `user_id` (hashed), `rows_count`.

---

## 11) Testing Plan (Minimum)

* **Unit:**

  * `MentorService::slim()` trims fields correctly.
  * Retrieval methods return expected shapes given seed data.
* **Feature:**

  * Auth required for `/api/ai/mentor`.
  * Each intent returns 200 with non-empty answer when data exists.
  * Guardrail path when data is missing.
* **Frontend:**

  * Clicking a quick question triggers API call and renders a bubble.
  * Loading state visible; input disabled during request.

*(Later)* Add Playwright/Cypress E2E for the Mentors & Guidance page.

---

## 12) Deployment & Config

* **IAM:** Role with `bedrock:Converse`, `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream` (if streaming).
* **EC2:** Attach role to instance; **do not** set access keys on EC2. Keep `AWS_REGION=ap-southeast-1`.
* **ENV:**

  * `BEDROCK_MODEL_ID=amazon.nova-lite-v1:0` (or via config).
  * `APP_URL`, DB credentials, cache/queue drivers.
* **Artifacts:**

  * Ensure `/docs/ai/AI_QUICK_QUESTIONS.json` is deployed.
  * DB seeded for the five source tables.

---

## 13) Future Enhancements

* **Streaming responses** via `converseStream` → SSE.
* **Human mentor handoff** (create a session with a mentor).
* **Light keyword search** using MySQL FULLTEXT for one “Search catalog” intent.
* **Analytics** to reorder quick questions by popularity.
* **Localization** for Malay/Chinese responses.

---

## 14) Sample Prompt Sent to Nova

```
You are the FutureTrack AI Mentor. Answer ONLY using the Context.
If information is missing, say so briefly. Keep answers under 120 words.

Question: What are the requirements for Computer Science?

Context (JSON):
{"intent_id":"requirements_for_course","params":{"course":"Computer Science"},"rows":[{"description":"STPM: Mathematics T and one science subject at grade B- or above","min_grade":"B-"}],"sources":[{"table":"requirements","ids":[12,15,21]}]}
```

---

## 15) Acceptance Criteria

* **UX** matches the screenshot: quick questions on the right, answers appear in the chat.
* **Each preset intent** returns grounded, <120-word responses derived from MySQL.
* **Fallback** for free-text is shown for non-preset queries.
* **No secrets** in prompts or logs.
* **All tests** described in §11 pass locally.

---

**Owner:** AI/Platform
**Target Models:** `amazon.nova-lite-v1:0` (Bedrock)
**Data Sources (current):** `pathway_requirements`, `career_matches`, `deadlines`, `university_courses`, `user_progress`

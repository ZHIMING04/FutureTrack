<?php

namespace App\Services\Ai;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Services\Ai\BedrockChatClient;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class MentorService
{
    public function __construct(
        private BedrockChatClient $llm
    ) {}

    public function answerQuickQuestion(string $intentId, array $params, ?User $user): array
    {
        $specs = $this->specs();
        $spec  = $specs[$intentId] ?? null;

        if (!$spec) {
            Log::warning('Unknown AI mentor intent', ['intent_id' => $intentId, 'user_id' => $user?->id]);
            abort(404, 'Unknown intent');
        }

        // Handle user-scoped intents for guests
        if (($spec['by_user_fk'] ?? false) && !$user) {
            return [
                'intent_id' => $intentId,
                'answer'    => 'Please sign in to get personalized results for this question.',
                'sources'   => [],
                'ts'        => now()->toIso8601String(),
            ];
        }

        // 1) Retrieve (deterministic; never let LLM build SQL)
        [$rows, $sources] = $this->runRetrieval($spec, $params, $user);

        if (empty($rows)) {
            Log::info('AI mentor: No data found', ['intent_id' => $intentId, 'user_id' => $user?->id]);
            return [
                'intent_id' => $intentId,
                'answer'    => $spec['guardrails'] ?? "I don't have enough data for that yet.",
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
        $startTime = microtime(true);
        try {
            $systemPrompt = "You are the FutureTrack AI Mentor. Answer ONLY using the Context. If information is missing, say so briefly. Keep answers under 120 words.";
            $userPrompt = $this->prompt($spec['label'] ?? $intentId, $context);

            $messages = [
                ['role' => 'user', 'content' => [['text' => $systemPrompt . "\n\nQuestion: " . $userPrompt]]],
            ];

            $answer = $this->llm->send($messages);
        } catch (\Exception $e) {
            Log::error('AI mentor Bedrock error', [
                'intent_id' => $intentId,
                'user_id' => $user?->id,
                'error' => $e->getMessage()
            ]);
            return [
                'intent_id' => $intentId,
                'answer'    => "I couldn't generate an answer. Please try again.",
                'sources'   => $sources,
                'ts'        => now()->toIso8601String(),
            ];
        }

        $duration = microtime(true) - $startTime;
        Log::info('AI mentor request completed', [
            'intent_id' => $intentId,
            'user_id' => $user?->id,
            'rows_count' => count($rows),
            'duration_ms' => round($duration * 1000)
        ]);

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

    private function runRetrieval(array $spec, array $params, ?User $user): array
    {
        return match($spec['intent_id']) {
            'requirements_for_course' => $this->retrieveRequirementsForCourse($spec, $params, $user),
            'compare_entry_routes' => $this->retrieveCompareEntryRoutes($spec, $params, $user),
            'eligibility_hint_from_scores' => $this->retrieveEligibilityHintFromScores($spec, $params, $user),
            'deadlines_this_month' => $this->retrieveDeadlinesThisMonth($spec, $params, $user),
            'university_offerings_cs' => $this->retrieveUniversityOfferingsCs($spec, $params, $user),
            'top_career_matches' => $this->retrieveTopCareerMatches($spec, $params, $user),
            'roadmap_next_actions' => $this->retrieveRoadmapNextActions($spec, $params, $user),
            'subjects_needed_stpm_cs' => $this->retrieveSubjectsNeededStpmCs($spec, $params, $user),
            'matriculation_vs_stpm_speed' => $this->retrieveMatriculationVsStpmSpeed($spec, $params, $user),
            'next_deadline_for_program' => $this->retrieveNextDeadlineForProgram($spec, $params, $user),
            default => [[], []]
        };
    }

    private function retrieveRequirementsForCourse(array $spec, array $params, ?User $user): array
    {
        $course = $params['course'] ?? 'Computer Science';
        $qb = DB::table('pathway_requirements as pr')
            ->join('pathways as p', 'p.id', '=', 'pr.pathway_id')
            ->select('pr.description', 'pr.minimum_grade', 'pr.subject_name', 'pr.id');
            
        $this->whereCiLike($qb, 'p.name', $course);
        $rows = $qb->limit(5)->get()->map(fn($x) => (array)$x)->all();
        
        // Fallback for demo if no data found
        if (empty($rows)) {
            $rows = DB::table('pathway_requirements as pr')
                ->join('pathways as p', 'p.id', '=', 'pr.pathway_id')
                ->select('pr.description', 'pr.minimum_grade', 'pr.subject_name', 'pr.id')
                ->orderBy('pr.id')
                ->limit(5)
                ->get()->map(fn($x) => (array)$x)->all();
        }

        $sources = [['table' => 'pathway_requirements', 'ids' => array_column($rows, 'id')]];
        return [$rows, $sources];
    }

    private function retrieveCompareEntryRoutes(array $spec, array $params, ?User $user): array
    {
        $rows = DB::table('pathways')
            ->whereIn('name', ['STPM → Degree', 'Foundation → Degree'])
            ->select('name', 'total_duration', 'competitiveness')
            ->get()->map(fn($x) => (array)$x)->all();

        $sources = [['table' => 'pathways', 'ids' => array_column($rows, 'id') ?? []]];
        return [$rows, $sources];
    }

    private function retrieveEligibilityHintFromScores(array $spec, array $params, ?User $user): array
    {
        // This is a conceptual query - join user's academic subjects with pathway requirements
        // For simplicity, we'll get user's academic subjects and compare with common requirements
        $userSubjects = DB::table('academic_subjects')
            ->where('user_id', $user->id)
            ->select('subject_name', 'grade')
            ->get()->map(fn($x) => (array)$x)->all();

        // Get pathway requirements for Computer Science
        $qb = DB::table('pathway_requirements as pr')
            ->join('pathways as p', 'p.id', '=', 'pr.pathway_id')
            ->select('pr.subject_name', 'pr.minimum_grade');
        $this->whereCiLike($qb, 'p.name', 'Computer Science');
        $requirements = $qb->get()->map(fn($x) => (array)$x)->all();

        // Simple comparison logic - find gaps
        $gaps = [];
        foreach ($requirements as $req) {
            $userGrade = null;
            foreach ($userSubjects as $subject) {
                if (strtolower($subject['subject_name']) === strtolower($req['subject_name'])) {
                    $userGrade = $subject['grade'];
                    break;
                }
            }

            if (!$userGrade || $this->compareGrades($userGrade, $req['minimum_grade']) < 0) {
                $gaps[] = [
                    'subject_name' => $req['subject_name'],
                    'minimum_grade' => $req['minimum_grade'],
                    'current_grade' => $userGrade
                ];
            }
        }

        $sources = [
            ['table' => 'academic_subjects', 'ids' => array_column($userSubjects, 'id') ?? []],
            ['table' => 'pathway_requirements', 'ids' => array_column($requirements, 'id') ?? []]
        ];
        return [$gaps, $sources];
    }

    private function retrieveDeadlinesThisMonth(array $spec, array $params, ?User $user): array
    {
        $rows = DB::table('deadlines as d')
            ->join('applications as a', 'a.id', '=', 'd.application_id')
            ->whereMonth('d.due_date', now()->month)
            ->whereYear('d.due_date', now()->year)
            ->orderBy('d.due_date')
            ->select('d.title', 'd.due_date', 'a.name as program_name', 'd.id')
            ->get()->map(fn($x) => (array)$x)->all();
            
        // Fallback for demo if no data found
        if (empty($rows)) {
            $rows = DB::table('deadlines as d')
                ->join('applications as a', 'a.id', '=', 'd.application_id')
                ->where('d.due_date', '>=', now())
                ->orderBy('d.due_date')
                ->limit(5)
                ->select('d.title', 'd.due_date', 'a.name as program_name', 'd.id')
                ->get()->map(fn($x) => (array)$x)->all();
        }

        $sources = [['table' => 'deadlines', 'ids' => array_column($rows, 'id')]];
        return [$rows, $sources];
    }

    private function retrieveUniversityOfferingsCs(array $spec, array $params, ?User $user): array
    {
        $discipline = $params['discipline'] ?? 'Computer Science';
        $qb = DB::table('university_courses')
            ->select('university_name', 'course_name', 'duration_years', 'id');
            
        $this->whereCiLike($qb, 'course_name', $discipline);
        $rows = $qb->limit(10)->get()->map(fn($x) => (array)$x)->all();
        
        // Fallback for demo if no data found
        if (empty($rows)) {
            $rows = DB::table('university_courses')
                ->select('university_name', 'course_name', 'duration_years', 'id')
                ->orderBy('id')
                ->limit(5)
                ->get()->map(fn($x) => (array)$x)->all();
        }

        $sources = [['table' => 'university_courses', 'ids' => array_column($rows, 'id') ?? []]];
        return [$rows, $sources];
    }

    private function retrieveTopCareerMatches(array $spec, array $params, ?User $user): array
    {
        // Handle case when no user is logged in
        if (!$user) {
            return [
                [],
                [['table' => 'career_matches', 'ids' => []]]
            ];
        }
        
        $rows = DB::table('career_matches as cm')
            ->join('careers as c', 'c.id', '=', 'cm.career_id')
            ->where('cm.user_id', $user->id)
            ->orderByDesc('cm.match_percentage')
            ->limit(5)
            ->select('c.title', 'cm.match_percentage', 'cm.matching_factors', 'cm.id')
            ->get()->map(fn($x) => (array)$x)->all();
            
        // Fallback for demo if no data found
        if (empty($rows)) {
            $rows = DB::table('career_matches as cm')
                ->join('careers as c', 'c.id', '=', 'cm.career_id')
                ->orderByDesc('cm.match_percentage')
                ->limit(5)
                ->select('c.title', 'cm.match_percentage', 'cm.matching_factors', 'cm.id')
                ->get()->map(fn($x) => (array)$x)->all();
        }

        $sources = [['table' => 'career_matches', 'ids' => array_column($rows, 'id')]];
        return [$rows, $sources];
    }

    private function retrieveRoadmapNextActions(array $spec, array $params, ?User $user): array
    {
        // Handle case when no user is logged in
        if (!$user) {
            return [
                [],
                [['table' => 'user_progress', 'ids' => []]]
            ];
        }
        
        $rows = DB::table('user_progress as up')
            ->join('roadmap_phases as rp', 'rp.id', '=', 'up.roadmap_phase_id')
            ->where('up.user_id', $user->id)
            ->where('up.status', '!=', 'Completed')
            ->orderBy('rp.order')
            ->limit(3)
            ->select('up.task_name', 'up.status', 'rp.name as phase_name', 'up.id')
            ->get()->map(fn($x) => (array)$x)->all();
            
        // Fallback for demo if no data found
        if (empty($rows)) {
            $rows = DB::table('user_progress as up')
                ->join('roadmap_phases as rp', 'rp.id', '=', 'up.roadmap_phase_id')
                ->orderBy('rp.order')
                ->limit(3)
                ->select('up.task_name', 'up.status', 'rp.name as phase_name', 'up.id')
                ->get()->map(fn($x) => (array)$x)->all();
        }

        $sources = [['table' => 'user_progress', 'ids' => array_column($rows, 'id')]];
        return [$rows, $sources];
    }

    private function retrieveSubjectsNeededStpmCs(array $spec, array $params, ?User $user): array
    {
        $qb = DB::table('pathway_requirements as pr')
            ->join('pathways as p', 'p.id', '=', 'pr.pathway_id')
            ->where('pr.requirement_type', 'STPM')
            ->select('pr.subject_name', 'pr.minimum_grade', 'pr.id');
            
        $this->whereCiLike($qb, 'p.name', 'Computer Science');
        $rows = $qb->limit(5)->get()->map(fn($x) => (array)$x)->all();
        
        // Fallback for demo if no data found
        if (empty($rows)) {
            $rows = DB::table('pathway_requirements as pr')
                ->join('pathways as p', 'p.id', '=', 'pr.pathway_id')
                ->where('pr.requirement_type', 'STPM')
                ->select('pr.subject_name', 'pr.minimum_grade', 'pr.id')
                ->orderBy('pr.id')
                ->limit(5)
                ->get()->map(fn($x) => (array)$x)->all();
        }

        $sources = [['table' => 'pathway_requirements', 'ids' => array_column($rows, 'id')]];
        return [$rows, $sources];
    }

    private function retrieveMatriculationVsStpmSpeed(array $spec, array $params, ?User $user): array
    {
        $qb = DB::table('pathways')->select('name', 'total_duration', 'id');
        $this->whereCiLike($qb, 'name', 'STPM');
        $this->orWhereCiLike($qb, 'name', 'Matriculation');
        $rows = $qb->get()->map(fn($x) => (array)$x)->all();
        
        // Fallback for demo if no data found
        if (empty($rows)) {
            $rows = DB::table('pathways')
                ->select('name', 'total_duration', 'id')
                ->orderBy('id')
                ->limit(2)
                ->get()->map(fn($x) => (array)$x)->all();
        }

        $sources = [['table' => 'pathways', 'ids' => array_column($rows, 'id') ?? []]];
        return [$rows, $sources];
    }

    private function retrieveNextDeadlineForProgram(array $spec, array $params, ?User $user): array
    {
        $programName = $params['program_name'] ?? 'UPU';
        $qb = DB::table('deadlines as d')
            ->join('applications as a', 'a.id', '=', 'd.application_id')
            ->where('d.due_date', '>=', now())
            ->orderBy('d.due_date')
            ->limit(1)
            ->select('d.title', 'd.due_date', 'a.name as program_name', 'd.id');
            
        $this->whereCiLike($qb, 'a.name', $programName);
        $rows = $qb->get()->map(fn($x) => (array)$x)->all();
        
        // Fallback for demo if no data found
        if (empty($rows)) {
            $rows = DB::table('deadlines as d')
                ->join('applications as a', 'a.id', '=', 'd.application_id')
                ->orderBy('d.due_date')
                ->limit(1)
                ->select('d.title', 'd.due_date', 'a.name as program_name', 'd.id')
                ->get()->map(fn($x) => (array)$x)->all();
        }

        $sources = [['table' => 'deadlines', 'ids' => array_column($rows, 'id')]];
        return [$rows, $sources];
    }

    private function specs(): array
    {
        $path = config('ai.quick_questions_path');
        if (!is_string($path) || !file_exists($path)) {
            Log::warning('AI mentor quick-questions file missing', ['path' => $path]);
            return [];
        }
        $list = json_decode(file_get_contents($path), true);
        if (!is_array($list)) {
            Log::warning('AI mentor quick-questions JSON invalid', ['path' => $path, 'json_error' => json_last_error_msg()]);
            return [];
        }
        $byId = [];
        foreach ($list as $item) {
            if (is_array($item) && isset($item['intent_id'])) {
                $byId[$item['intent_id']] = $item;
            }
        }
        return $byId;
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
    
    private function whereCiLike($qb, string $column, string $term) {
        return $qb->where(DB::raw("LOWER($column)"), 'like', '%'.strtolower($term).'%');
    }

    private function orWhereCiLike($qb, string $column, string $term) {
        return $qb->orWhere(DB::raw("LOWER($column)"), 'like', '%'.strtolower($term).'%');
    }

    private function compareGrades(string $userGrade, string $minGrade): int
    {
        // Simple grade comparison - this could be enhanced with a proper grade scale
        $gradeOrder = ['F', 'E', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];
        $userPos = array_search($userGrade, $gradeOrder);
        $minPos = array_search($minGrade, $gradeOrder);

        if ($userPos === false) return -1;
        if ($minPos === false) return 1;

        return $userPos <=> $minPos;
    }
}

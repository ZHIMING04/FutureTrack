<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\Ai\MentorService;
use App\Services\BedrockChatService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery;

class MentorServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_slim_removes_unwanted_fields()
    {
        $service = app(MentorService::class);

        $rows = [
            ['name' => 'Computer Science', 'description' => 'A course', 'id' => 1],
            ['name' => 'Data Science', 'description' => 'Another course', 'id' => 2]
        ];

        $fields = ['name', 'description'];
        $result = $this->invokePrivateMethod($service, 'slim', [$rows, $fields]);

        $this->assertEquals([
            ['name' => 'Computer Science', 'description' => 'A course'],
            ['name' => 'Data Science', 'description' => 'Another course']
        ], $result);
    }

    public function test_prompt_contains_guard_phrase()
    {
        $service = app(MentorService::class);
        $context = ['intent_id' => 'test', 'params' => [], 'rows' => [], 'sources' => []];

        $prompt = $this->invokePrivateMethod($service, 'prompt', ['Test question', $context]);

        $this->assertStringContains('Answer ONLY using the Context', $prompt);
        $this->assertStringContains('Test question', $prompt);
        $this->assertStringContains('Keep answers under 120 words', $prompt);
    }

    public function test_specs_loads_json_configuration()
    {
        $service = app(MentorService::class);
        $specs = $this->invokePrivateMethod($service, 'specs', []);

        $this->assertIsArray($specs);
        $this->assertArrayHasKey('requirements_for_course', $specs);
    }

    public function test_answer_quick_question_returns_guardrail_when_no_data()
    {
        $user = User::factory()->create();
        $llmMock = Mockery::mock(BedrockChatService::class);
        $llmMock->shouldNotReceive('chatWithContext');

        $service = new MentorService($llmMock);

        $result = $service->answerQuickQuestion('unknown_intent', [], $user);

        $this->assertEquals('unknown_intent', $result['intent_id']);
        $this->assertStringContains('I don\'t have enough data', $result['answer']);
        $this->assertEmpty($result['sources']);
    }

    public function test_json_method_trims_context()
    {
        $service = app(MentorService::class);

        $largeData = ['data' => str_repeat('a', 3000)];
        $result = $this->invokePrivateMethod($service, 'json', [$largeData]);

        $this->assertLessThanOrEqual(2048, strlen($result));
    }

    /**
     * Helper method to invoke private methods for testing
     */
    private function invokePrivateMethod($object, $method, $args = [])
    {
        $reflection = new \ReflectionClass($object);
        $method = $reflection->getMethod($method);
        $method->setAccessible(true);

        return $method->invokeArgs($object, $args);
    }
}

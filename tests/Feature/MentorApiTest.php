<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MentorApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_mentor_answer_requires_authentication()
    {
        $response = $this->postJson('/api/ai/mentor', [
            'intent_id' => 'requirements_for_course',
            'params' => ['course' => 'Computer Science']
        ]);

        $response->assertStatus(401);
    }

    public function test_mentor_fallback_requires_authentication()
    {
        $response = $this->postJson('/api/ai/mentor/free_text', [
            'text' => 'What is computer science?'
        ]);

        $response->assertStatus(401);
    }

    public function test_mentor_answer_returns_structured_response()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/ai/mentor', [
                'intent_id' => 'requirements_for_course',
                'params' => ['course' => 'Computer Science']
            ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'intent_id',
                'answer',
                'sources',
                'ts'
            ]);
    }

    public function test_mentor_fallback_returns_demo_message()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/ai/mentor/free_text', [
                'text' => 'What is computer science?'
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'intent_id' => 'fallback',
                'answer' => 'For the demo, please use the Quick Questions on the right.',
                'sources' => [],
            ])
            ->assertJsonStructure(['ts']);
    }

    public function test_mentor_answer_validates_input()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/ai/mentor', [
                'params' => ['course' => 'Computer Science']
                // missing intent_id
            ]);

        $response->assertStatus(422);
    }

    public function test_unknown_intent_returns_404()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/ai/mentor', [
                'intent_id' => 'unknown_intent',
                'params' => []
            ]);

        $response->assertStatus(404);
    }
}

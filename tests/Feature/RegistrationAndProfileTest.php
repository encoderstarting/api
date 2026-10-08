<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RegistrationAndProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_receive_tokens(): void
    {
        $response = $this->postJson('/api/registration', [
            'email' => 'new.user@example.com',
            'password' => 'password123',
            'gender' => 'female',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('user.email', 'new.user@example.com')
            ->assertJsonPath('user.gender', 'female')
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'gender'],
                'token' => ['access_token', 'refresh_token', 'expires_in'],
            ])
            ->assertJsonMissingPath('user.password');

        $user = User::where('email', 'new.user@example.com')->firstOrFail();

        $this->assertTrue(Hash::check('password123', $user->password));
    }

    public function test_registration_validates_email_password_and_gender(): void
    {
        User::factory()->create(['email' => 'taken@example.com']);

        $this->postJson('/api/registration', [
            'email' => 'taken@example.com',
            'password' => 'short',
            'gender' => 'unknown',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email', 'password', 'gender']);
    }

    public function test_authenticated_user_can_open_profile(): void
    {
        $registration = $this->postJson('/api/registration', [
            'email' => 'profile@example.com',
            'password' => 'password123',
            'gender' => 'male',
        ])->assertCreated();

        $accessToken = $registration->json('token.access_token');

        $this->withToken($accessToken)
            ->getJson('/api/profile')
            ->assertOk()
            ->assertJsonPath('user.email', 'profile@example.com')
            ->assertJsonPath('user.gender', 'male')
            ->assertJsonMissingPath('user.password');
    }

    public function test_guest_cannot_open_profile(): void
    {
        $this->getJson('/api/profile')->assertUnauthorized();
    }
}

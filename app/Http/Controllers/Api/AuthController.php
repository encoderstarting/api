<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RefreshTokenRequest;
use App\Http\Requests\RegistrationRequest;
use App\Models\RefreshToken;
use App\Models\User;
use App\Services\AuthServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function registration(RegistrationRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = User::create([
            'name' => str($data['email'])->before('@')->toString(),
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'gender' => $data['gender'],
        ]);

        return response()->json([
            'user' => $user,
            'token' => (new AuthServices)->generateTokens($user),
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        if (! Auth::attempt($data)) {
            throw ValidationException::withMessages([
                'email' => ['Неверный email или пароль.'],
            ]);
        }

        $user = $request->user();

        return response()->json([
            'user' => $user,
            'token' => (new AuthServices)->generateTokens($user),
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return $this->profile($request);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->refreshTokens()->delete();

        return response()->json([
            'message' => 'Вы успешно вышли из системы',
        ]);
    }

    public function refresh(RefreshTokenRequest $request): JsonResponse
    {
        $data = $request->validated();
        $refreshToken = RefreshToken::where('token', $data['refresh_token'])->first();

        if (! $refreshToken) {
            return response()->json([
                'message' => 'Refresh token is invalid',
            ], 401);
        }

        if ($refreshToken->expires_at < now()) {
            $refreshToken->delete();

            return response()->json([
                'message' => 'Refresh token is expired',
            ], 401);
        }

        $user = $refreshToken->user;
        $refreshToken->delete();

        return response()->json([
            'user' => $user,
            'token' => (new AuthServices)->generateTokens($user),
        ]);
    }
}

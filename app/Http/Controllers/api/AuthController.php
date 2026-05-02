<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\LoginRequest;
use App\Services\AuthServices;



class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validated();
        if (!Auth::attempt($data)) {
            throw ValidationException::withMessages([
                'email' => ['Неверный email или пароль.'],
            ]);
            
        }
        $user = $request->user();
        return response()->json([
            'user' => $user,
            'token' => (new AuthServices())->generateTokens($user),
        ]);

      
    }
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Вы успешно вышли из системы',
        ]);
    }
     
  

    
}

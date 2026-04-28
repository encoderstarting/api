<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;



class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        if (!Auth::attempt($data)) {
            throw ValidationException::withMessages([
                'email' => ['Неверный email или пароль.'],
            ]);
            
        }
        $user = $request->user();
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken,
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

<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use App\Service\UserService;
use App\Http\Resources\UserResource;


class UserController extends Controller
{
    public function updateRole(Request $request, User $user)
    {
       $data = $request->validated(['role' => 'required|in:admin,user']);
        $user->update(['role' => $data['role']]);
        return response()->json(['message' => 'Роль пользователя обновлена']);
    }
}

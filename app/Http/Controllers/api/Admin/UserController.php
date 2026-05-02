<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use App\Service\UserService;
use App\Http\Resources\UserResource;
use App\Enums\Role;


class UserController extends Controller
{
    public function __construct(private UserService $userService)
    {
        $this->userService = $userService;
    }
    public function updateRole(Request $request, User $user)
    {   
       $data = $request->validate(['role' => 'required|in:admin,user']);
        $this->userService->assignRole($user, $data['role']);
        return response()->json(['message' => 'Роль пользователя обновлена']);
    }
}

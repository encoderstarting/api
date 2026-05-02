<?php

namespace App\Enums;
use App\Models\User as UserModel;
use App\Models\Role as RoleModel;
use Closure;
use Illuminate\Http\Request;



enum Role: string
{
    case ADMIN = 'admin';
    case USER = 'user';
    case MODERATOR = 'editor';
    public function handle(Request $request, Closure $next, Role $role)
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        if (! $user->roles->contains('name', $role->value)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return $next($request);
    }
}


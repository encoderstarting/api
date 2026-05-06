<?php

namespace App\Service;

use App\Models\User as UserModel;
use App\Models\Role as RoleModel;

class UserService
{
    public function assignRole(UserModel $user, string $role): void
    {
        $role = RoleModel::where('name', $role)->first();
        if (!$role) {
            throw new \Exception('Role not found: ' . $role);
        }
        $user->roles()->attach($role->id);
    }
}
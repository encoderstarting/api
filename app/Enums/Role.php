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
    
}


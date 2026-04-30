<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Middleware\EnsureAdmin;
use App\Http\Controllers\Api\Admin\PostController as AdminPostController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum',EnsureAdmin::class])->prefix('admin')->group(function () {
    Route::post('/posts', [AdminPostController::class, 'store']);
    Route::put('/posts/{post}', [AdminPostController::class, 'update']);
    Route::delete('/posts/{post}', [AdminPostController::class, 'destroy']);
});
Route::middleware(['auth:sanctum',EnsureAdmin::class])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
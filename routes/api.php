<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Middleware\EnsureAdmin;
use App\Http\Controllers\Api\Admin\PostController as AdminPostController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\WeatherController;
use App\Http\Controllers\Api\ProductQrCodeController;
use App\Http\Controllers\Api\CurrencyController;
use App\Http\Controllers\Api\Admin\AnalyticsController;

Route::get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:api','role:admin'])->group(function () {
    Route::post('/posts', [AdminPostController::class, 'store']);
    Route::put('/posts/{post}', [AdminPostController::class, 'update']);
    Route::delete('/posts/{post}', [AdminPostController::class, 'destroy']);
    Route::post('/products', [AdminProductController::class, 'store']);
    Route::put('/products/{product}', [AdminProductController::class, 'update']);
    Route::delete('/products/{product}', [AdminProductController::class, 'destroy']);
    Route::put('/users/{user}/role', [AdminUserController::class, 'updateRole']);
    Route::get('/analytics', [AnalyticsController::class, 'index']);
});
Route::middleware(['auth:api'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/orders', [OrderController::class, 'store']);
});

Route::post('/refresh', [AuthController::class, 'refresh']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/weather', [WeatherController::class, 'show']);
Route::get('/products/{product}/qr-code', [ProductQrCodeController::class, 'show']);
Route::get('/currency/convert', [CurrencyController::class, 'convert']);
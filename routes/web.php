<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}', function () {
    $frontend = public_path('index.html');

    if (! file_exists($frontend)) {
        $frontend = base_path('frontend/dist/index.html');
    }

    return file_exists($frontend)
        ? response()->file($frontend)
        : view('welcome');
})->where('path', '^(?!api(?:/|$)).*');

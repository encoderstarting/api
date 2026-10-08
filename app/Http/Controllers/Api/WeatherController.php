<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WeatherService;
use App\Http\Requests\WeatherRequest;

class WeatherController extends Controller
{
    public function __construct(private WeatherService $weatherService)
    {
    }

    public function show(WeatherRequest $request)
    {
        return response()->json(
            $this->weatherService->getCurrentWeatherByCity($request->validated('city'))
        );
    }
}
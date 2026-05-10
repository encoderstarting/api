<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
public function getCurrentWeatherByCity(string $city): array
{
    $geoResponse = Http::withoutVerifying()
        ->timeout(10)
        ->get(config('services.open_meteo.geocoding_url') . '/search', [
            'name' => $city,
            'count' => 1,
            'language' => 'ru',
            'format' => 'json',
        ])
        ->throw()
        ->json();

    $location = $geoResponse['results'][0] ?? null;

    if (! $location) {
        return [
            'message' => 'Город не найден',
        ];
    }

    $weatherResponse = Http::withoutVerifying()
        ->timeout(10)
        ->get(config('services.open_meteo.forecast_url') . '/forecast', [
            'latitude' => $location['latitude'],
            'longitude' => $location['longitude'],
            'current' => 'temperature_2m,wind_speed_10m,weather_code',
        ])
        ->throw()
        ->json();

    return [
        'city' => $location['name'],
        'country' => $location['country'] ?? null,
        'latitude' => $location['latitude'],
        'longitude' => $location['longitude'],
        'weather' => $weatherResponse['current'] ?? null,
    ];
}
}
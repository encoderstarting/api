<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CurrencyService
{
    public function convertFromRub(float $amount): array
{
    $usdResponse = Http::withoutVerifying()
        ->timeout(10)
        ->get(config('services.currency.url') . '/USD')
        ->throw()
        ->json();

    $eurResponse = Http::withoutVerifying()
        ->timeout(10)
        ->get(config('services.currency.url') . '/EUR')
        ->throw()
        ->json();

    $usdRate = $usdResponse['rates']['RUB'];
    $eurRate = $eurResponse['rates']['RUB'];

    return [
        'rub' => round($amount, 2),
        'usd' => round($amount / $usdRate, 2),
        'eur' => round($amount / $eurRate, 2),
        'rates' => [
            'usd_to_rub' => $usdRate,
            'eur_to_rub' => $eurRate,
        ],
    ];
}




}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CurrencyService;
use App\Http\Requests\CurrencyRequest;

class CurrencyController extends Controller
{
    public function __construct(private CurrencyService $currencyService)
    {
    }

    public function convert(CurrencyRequest $request)
    {
        return response()->json(
            $this->currencyService->convertFromRub((float) $request->validated('amount'))
        );
    }
}
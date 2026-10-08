<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AnalyticsService;
use App\Http\Requests\AnalyticsRequest;

class AnalyticsController extends Controller
{
    public function __construct(private AnalyticsService $analyticsService){

    }
    public function index(AnalyticsRequest $request)
    {
        $summary = $this->analyticsService->getSummary($request->from, $request->to);
        return response()->json($summary);
    }
}
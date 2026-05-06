<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Services\OrderService;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;

class OrderController extends Controller
{
    public function __construct(private OrderService $orderService){
        $this->orderService = $orderService;
    }
    public function store(StoreOrderRequest $request){
        $order = $this->orderService->createOrder($request->user(), $request->validated());
        return new OrderResource($order);
    }
    
   
}
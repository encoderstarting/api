<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Service\OrderService;
use App\Http\Resources\OrderResource;
use App\Models\Order;
class OrderController extends Controller
{
    public function __construct(private OrderService $orderService){
        $this->orderService = $orderService;
    }
    
}
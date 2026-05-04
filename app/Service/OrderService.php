<?php
namespace App\Service;
use App\Models\Order;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
class OrderService
{
    public function __construct(private OrderRepository $orderRepository){
        $this->orderRepository = $orderRepository;
    }
    
}
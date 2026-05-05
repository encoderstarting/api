<?php
namespace App\Repository;
use App\Models\Order;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\OrderItem;
class OrderRepository
{
    public function createOrder(array $data): Order
    {
        return Order::create($data);
    }
    public function createOrderItem(array $data): OrderItem
    {
        return OrderItem::create($data);
    }

    
}
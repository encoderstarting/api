<?php
namespace App\Repository;
use App\Models\Order;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
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
    public function getUserOrders(User $user): Collection
    {
        return Order::where('user_id', $user->id)->with('items.product')->get();
    }
    
}
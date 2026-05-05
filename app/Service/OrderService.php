<?php
namespace App\Service;
use App\Models\Order;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Repository\OrderRepository;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Models\Product;

class OrderService
{
    public function __construct(private OrderRepository $orderRepository){
        $this->orderRepository = $orderRepository;
    }
    public function createOrder(User $user,array $data): Order
    {
        return DB::transaction(function () use ($user, $data) {
            $product = Product::findOrFail($data['product_id']);
            if(!$product->is_active){
                throw ValidationException::withMessages([
                    'product_id' => 'Товара недостаточно',
                ]);
            }
            if($product->quantity < $data['quantity']){
                throw ValidationException::withMessages([
                    'quantity' => 'Товара недостаточно',
                ]);
            }
        
            $totalAmount = $product->price * $data['quantity'];
            $order = $this->orderRepository->createOrder([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'created',
            ]);
            $this->orderRepository->createOrderItem([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $data['quantity'],
                'price' => $product->price,
            ]);
            $product->quantity -= $data['quantity'];
            $product->save();
            return $order->load('items.product');
        });
    }
    
}
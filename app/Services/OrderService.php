<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Repository\OrderRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function __construct(
        private OrderRepository $orderRepository,
        private TelegramService $telegramService
    ) {
    }

    public function createOrder(User $user, array $data): Order
    {
        $order = DB::transaction(function () use ($user, $data) {
            $totalAmount = 0;
            $products = [];

            foreach ($data['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);

                if (!$product->is_active) {
                    throw ValidationException::withMessages([
                        'product_id' => 'Товар недоступен',
                    ]);
                }

                if ($product->quantity < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'quantity' => "Недостаточно товара: {$product->name}",
                    ]);
                }

                $totalAmount += $product->price * $item['quantity'];

                $products[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                ];
            }

            $order = $this->orderRepository->createOrder([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'created',
            ]);

            foreach ($products as $productData) {
                $product = $productData['product'];
                $quantity = $productData['quantity'];

                $this->orderRepository->createOrderItem([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $product->price,
                ]);

                $product->quantity -= $quantity;
                $product->save();
            }

            return $order->load('items.product', 'user');
        });

        $this->telegramService->sendOrderCreated($order);

        return $order;
    }

    public function getUserOrders(User $user): Collection
    {
        return $this->orderRepository->getUserOrders($user);
    }
}
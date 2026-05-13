<?php

namespace App\Repository;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AnalyticsRepository
{
    public function ordersCount(?string $from = null, ?string $to = null): int
    {
        return $this->ordersQuery($from, $to)->count();
    }

    public function totalRevenue(?string $from = null, ?string $to = null): float
    {
        return (float) $this->ordersQuery($from, $to)->sum('total_amount');
    }

    public function averageOrderValue(?string $from = null, ?string $to = null): float
    {
        return (float) $this->ordersQuery($from, $to)->avg('total_amount');
    }

    public function activeProductsCount(): int
    {
        return Product::where('is_active', true)->count();
    }

    public function usersCount(): int
    {
        return User::count();
    }

    public function lowStockProducts(int $limit = 5)
    {
        return Product::where('is_active', true)
            ->where('quantity', '<=', $limit)
            ->orderBy('quantity')
            ->get(['id', 'name', 'quantity']);
    }

    public function topProducts(?string $from = null, ?string $to = null)
    {
        return OrderItem::query()
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->when($from, fn ($query) => $query->whereDate('orders.created_at', '>=', $from))
            ->when($to, fn ($query) => $query->whereDate('orders.created_at', '<=', $to))
            ->select(
                'products.id',
                'products.name',
                DB::raw('SUM(order_items.quantity) as sold_quantity'),
                DB::raw('SUM(order_items.quantity * order_items.price) as revenue')
            )
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('sold_quantity')
            ->limit(5)
            ->get();
    }

    private function ordersQuery(?string $from = null, ?string $to = null)
    {
        return Order::query()
            ->when($from, fn ($query) => $query->whereDate('created_at', '>=', $from))
            ->when($to, fn ($query) => $query->whereDate('created_at', '<=', $to));
    }
}
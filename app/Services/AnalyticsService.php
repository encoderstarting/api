<?php

namespace App\Services;

use App\Repository\AnalyticsRepository;

class AnalyticsService
{
    public function __construct(private AnalyticsRepository $analyticsRepository)
    {
    }

    public function getSummary(?string $from = null, ?string $to = null): array
    {
        $ordersCount = $this->analyticsRepository->ordersCount($from, $to);
        $totalRevenue = $this->analyticsRepository->totalRevenue($from, $to);

        return [
            'orders_count' => $ordersCount,
            'total_revenue' => $totalRevenue,
            'average_order_value' => $ordersCount > 0
                ? round($totalRevenue / $ordersCount, 2)
                : 0,
            'active_products_count' => $this->analyticsRepository->activeProductsCount(),
            'users_count' => $this->analyticsRepository->usersCount(),
            'low_stock_products' => $this->analyticsRepository->lowStockProducts(),
            'top_products' => $this->analyticsRepository->topProducts($from, $to),
        ];
    }
}
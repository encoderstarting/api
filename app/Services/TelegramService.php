<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Order;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    
    
        public function sendOrderCreated(Order $order) : void
        {
            $token = config('services.telegram.bot_token');
            $chatId = config('services.telegram.chat_id');
            if (!$token || !$chatId) {
                return;
            }
            $order->loadMissing('user','items.product');
            $itemsText = $order->items->map(function ($item) {
                return "- {$item->product->name}: {$item->quantity} шт. x {$item->price} руб.";
            })->join("\n");
            
            $message = "Новый заказ #{$order->id}\n" .
                "Имя: {$order->user->name}\n" .
                "Email: {$order->user->email}\n" .
                "Товары:\n{$itemsText}\n" .
                "Общая стоимость: {$order->total_amount} руб.";
            try{
                Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                    'chat_id' => $chatId,
                    'text' => $message,
                ]);
            } catch (\Exception $e) {
                Log::error("Failed to send order created message: {$e->getMessage()}");
            }

        }


       
    
}
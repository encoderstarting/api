<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\QrCodeService;

class ProductQrCodeController extends Controller
{
    public function __construct(private QrCodeService $qrCodeService)
    {
    }

    public function show(Product $product)
    {
        $productUrl = config('app.frontend_url') . '/products/' . $product->id;

        return response()->json([
            'product_id' => $product->id,
            'url' => $productUrl,
            'qr_code_url' => $this->qrCodeService->getQrCodeUrl($productUrl),
        ]);
    }
}
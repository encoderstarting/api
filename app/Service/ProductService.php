<?php

namespace App\Service;

use App\Repository\ProductRepository;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
class ProductService
{
    /**
     * Create a new class instance.
     */
    protected $productRepository;
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    public function getPaginatedProducts(): LengthAwarePaginator
    {
        return $this->productRepository->paginate();
    }
    public function createProduct(array $data): Product
    {

        $data['is_active'] = $data['is_active'] ?? true;
        $data['quantity'] = $data['quantity'] ?? 0;
        return $this->productRepository->create($data);
    }
    public function updateProduct(Product $product, array $data): Product
    {
        $data['is_active'] = $data['is_active'];
        $data['quantity'] = $data['quantity'];
        return $this->productRepository->update($product, $data);
    }
    public function deleteProduct(Product $product): bool
    {
        $product->is_active = false;
        $product->save();
        return true;
    }
}

<?php
namespace App\Repository;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository 
{
    public function paginate(): LengthAwarePaginator
    {
        return Product::paginate(10);
    }
    public function create(array $data): Product
    {
        return Product::create($data);
    }
    public function update(Product $product, array $data): Product
    {
        $product->update($data);
        return $product;
    }
    public function delete(Product $product): bool
    {
        return $product->delete();
    }

}
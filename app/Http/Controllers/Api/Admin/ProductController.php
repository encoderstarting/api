<?php
namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Services\ProductService;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;



class ProductController extends Controller
{
    public function __construct(private ProductService $productService){
        $this->productService = $productService;
    }
    public function store(StoreProductRequest $request){
        $data = $request->validated();
        $product = $this->productService->createProduct($data);
        return new ProductResource($product);
    }
    public function update(UpdateProductRequest $request, Product $product){
        $data = $request->validated();
        $product = $this->productService->updateProduct($product, $data);
        return new ProductResource($product);
    }
    public function destroy(Product $product){
        $this->productService->deleteProduct($product);
        return response()->json(['message' => 'товар удален']);

    }
}
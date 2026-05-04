<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Service\ProductService;
use App\Http\Resources\ProductResource;
use App\Models\Product;
class ProductController extends Controller
{
    public function __construct(private ProductService $productService){
        $this->productService = $productService;
    }
    public function index(){
        $products = $this->productService->getPaginatedProducts();
        return ProductResource::collection($products);
    }
    public function show(Product $product){
        return new ProductResource($product);

    }
    
}
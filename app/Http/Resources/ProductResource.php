<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use App\Models\Product;
class ProductResource extends JsonResource
{
    public function toArray( Request $request): array
    {   
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'brand' => $this->brand,
            'is_active' => $this->is_active,
        ];
    }
}
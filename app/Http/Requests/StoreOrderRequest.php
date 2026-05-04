<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreOrderRequest extends FormRequest
{
    

    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
        ];
    }
    public function messages(): array
    {
        return [
            'product_id.required' => 'id товара обязательно',
            'product_id.exists' => 'id товара не найден',
        ];
    }
}
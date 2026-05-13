<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnalyticsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'from' => 'nullable|date',
            'to' => 'nullable|date',
        ];
    }
    public function messages(): array
    {
        return [
            'from.date' => 'date format is YYYY-MM-DD',
            'to.date' => 'date format is YYYY-MM-DD',
        ];
    }
}
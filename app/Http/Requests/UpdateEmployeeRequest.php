<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'position' => 'required|string',
            'salary' => 'required|numeric',
            'start_date'=>'required|date',
            'end_date'=>'required|date',
            'projects' => 'nullable|array',
            'users' => 'nullable|array',
            'user.name' => 'required|string',
            'user.email' => 'required|string|unique:users,email',
            'user.phone' => 'required|string|max:10|min:10|unique:users,phone',
            'user.role' => 'required|string'
        ];
    }
}

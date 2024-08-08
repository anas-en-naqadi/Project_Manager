<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
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
            'title' => 'required|string|unique:tasks,title',
            'description' => 'required|string',
            'status' => 'required|in:in_progress,failed,completed',
            'due_date' => 'required|date',
            'priority' => 'required|string',
            'assigned_to' => 'required|exists:employees,id',
            'project_id' => 'required|exists:projects,id'
        ];
    }
}

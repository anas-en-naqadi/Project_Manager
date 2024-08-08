<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->load('projectManager.employee.company');

        return [
            'id'=>$this->id,
            'company'=>$this->projectManager->employee->company->name ?? null,
            'project_manager' => $this->projectManager->name,
            'name' => $this->name,
            'status'=>$this->status,
            'description' => $this->description,
            'start_date' => Carbon::parse($this->start_date)->format('Y-m-d'),
            'end_date' => Carbon::parse($this->end_date)->format('Y-m-d'),
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'employee_count' => $this->employees->count()
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'position' => $this->position,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'salary' => $this->salary,
            'user' => $this->user,
            'departement'=>$this->departement,
            'company' => $this->company->name,
            'projects' => ProjectResources::collection($this->projects),
             'tasks' => $this->tasks

        ];
    }
}

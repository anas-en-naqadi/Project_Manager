<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date',
        'assigned_to',
        'priority',
        'project_manager_id',
        'project_id',
        'completed_at'
    ];

    public function projectManager(){
        return $this->belongsTo(Employee::class, 'project_manager_id');
    }
    public function assignedTo(){
        return $this->belongsTo(Employee::class, 'assigned_to');
    }
    public function project(){
        return $this->belongsTo(Project::class);
    }
    public function employee(){
        return $this->belongsTo(Employee::class,'assigned_to');
    }
}

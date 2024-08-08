<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['company_id','project_manager_id', 'name', 'description','status', 'start_date', 'end_date'];

    protected $attributes = [
        'status' => 'in_progress', // Set default value
    ];
    public function projectManager()
    {
        return $this->belongsTo(User::class, 'project_manager_id');
    }

    public function company(){
        return $this->belongsTo(Company::class);
    }


    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'project_employees', 'project_id', 'employee_id');
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }
}

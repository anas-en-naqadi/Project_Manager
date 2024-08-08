<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $fillable=[
        'company_id',
        'user_id',
        'position',
        'start_date',
        'end_date',
        'salary',
        'departement'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function projects(){
        return $this->belongsToMany(Project::class,'project_employees','employee_id','project_id');
    }
    public function company(){
        return $this->belongsTo(Company::class);
    }
    public function tasks(){
        return $this->hasMany(Task::class,'assigned_to');
    }
}

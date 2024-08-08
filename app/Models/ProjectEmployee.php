<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectEmployee extends Model
{
    use HasFactory;
    protected $fillable=[
        'employee_id',
        'project_id',
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function employee(){
        return $this->belongsTo(Employee::class);
    }
}

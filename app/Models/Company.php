<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['user_id',
     'name',
      'address'
    ,'logo'];

    public function owner(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public function employees(){
        return $this->hasMany(Employee::class);
    }
    public function projects(){
        return $this->hasMany(Project::class);
    }
    public function projectManagers()
    {
        return $this->employees()
                    ->whereHas('user', function ($query) {
                        $query->where('role', 'project_manager');
                    });

    }
    public function getLogoUrlAttribute()
    {
        return URL::to($this->logo);
    }

}

<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Employee;
use App\Models\Project;
use App\Models\ProjectEmployee;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(10)->create();
         Company::factory(10)->create();
         Project::factory(10)->create();
         Employee::factory(50)->create();
         Task::factory(80)->create();
         ProjectEmployee::factory(40)->create();



    }
}

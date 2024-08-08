<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_manager_id' =>\App\Models\Employee::inRandomOrder()->first()->user_id,
            'project_id' => \App\Models\Project::inRandomOrder()->first()->id,
            'title' => $this->faker->sentence(5),
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['pending', 'in progress', 'completed']),
            'priority' => $this->faker->randomElement(['strong', 'week', 'important']),
            'due_date' => $this->faker->date(),
            'assigned_to' => \App\Models\Employee::inRandomOrder()->first()->user_id,
        ];
    }
}

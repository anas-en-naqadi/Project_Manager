<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_id' => \App\Models\Company::inRandomOrder()->first()->id,
            'project_manager_id' => \App\Models\User::inRandomOrder()->first()->id,
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,

        ];
    }
}

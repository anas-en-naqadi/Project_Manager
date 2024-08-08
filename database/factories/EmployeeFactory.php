<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'user_id' => \App\Models\User::inRandomOrder()->where('role',['employee','project_manager'])->first()->id,
            'company_id'=> \App\Models\Company::inRandomOrder()->first()->id,
            'position' => $this->faker->jobTitle,
            'salary' => $this->faker->numberBetween(30000, 100000),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date()

        ];
    }
}

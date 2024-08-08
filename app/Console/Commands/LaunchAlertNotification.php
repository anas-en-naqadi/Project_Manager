<?php

namespace App\Console\Commands;

use App\Jobs\LaunchAlertRolesJob;
use App\Models\Employee;
use App\Models\Project;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Console\Command;

class LaunchAlertNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:launch-alert-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get the date for tomorrow
        $tomorrow = Carbon::tomorrow()->toDateString();

        // Fetch employees, projects, and tasks ending tomorrow
        $employees = Employee::whereDate('end_date', $tomorrow)->where('status', '!=', 'delivered')->get();
        $projects = Project::whereDate('end_date', $tomorrow)->where('status', '!=', 'delivered')->get();
        $tasks = Task::whereDate('due_date', $tomorrow)->get();

        // Dispatch the jobs
        if ($employees->isNotEmpty()) {
            dispatch(new LaunchAlertRolesJob($employees, 'employee'));
        }

        if ($projects->isNotEmpty()) {

            dispatch(new LaunchAlertRolesJob($projects, 'project'));
        }

        if ($tasks->isNotEmpty()) {

            dispatch(new LaunchAlertRolesJob($tasks, 'task'));
        }

        // Log or output a message
        $this->info('Alert notifications for roles ending tomorrow have been dispatched.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function CompanyDashboard()
    {
        $user = getAuthUser(); // Retrieve the user once
        $company = $user?->company; // Get the user's company

        $employeesCount = $company?->employees()->count(); // Use relationship methods to count
        $projectsCount = $company?->projects()->count(); // Use relationship methods to count
        $projectManagersCount = $company?->projectManagers()->count(); // Use the method we defined earlier to count project managers
        $deliveredProjectsCount = 0; // Use `where` to filter and count delivered projects

        return response()->json([
            'employeesCount' => $employeesCount,
            'projectsCount' => $projectsCount,
            'projectManagersCount' => $projectManagersCount,
            'deliveredProjectsCount' => $deliveredProjectsCount,
        ]);
    }
    public function ProjectManagerDashboard()
    {
        $user = getAuthUser();

        if (!$user) {
            return response()->json(['message' => 'No project manager found'], 404);
        }
        $sum = 0;
        // Count the number of employees, projects, assigned tasks, and completed tasks
        $user->employee->projects->each(function($project) use (&$sum){
            $sum += $project->employees->count();
        });
        $projectsCount = $user->employee->projects()?->count();

        $assignedTasksCount = 0;
        $completedTasksCount = 0;

        $user->employee->projects->each(function($project) use (&$assignedTasksCount, &$completedTasksCount) {
            $assignedTasksCount += $project->tasks()->count();
            $completedTasksCount += $project->tasks()->where('status', 'completed')->count();
        });

        return response()->json([
            'employeesCount' => $sum,
            'projectsCount' => $projectsCount,
            'assignedTasksCount' => $assignedTasksCount,
            'completedTasksCount' => $completedTasksCount,
        ]);
    }
    public function EmployeeDashboard()
    {
        // Retrieve the first user with the role 'employee'
        $user = getAuthUser();

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'No employee found'], 404);
        }

        $tasksCount = $user?->tasks->count();
        $projectsCount = $user?->projects->count();

        $assignedTasksCount = $user?->tasks->where('created_at', now()->startOfDay())->count();

        $completedTasksCount = $user?->tasks->where('status', 'completed')->count();

        return response()->json([
            'tasksCount' => $tasksCount,
            'projectsCount' => $projectsCount,
            'assignedTasksCount' => $assignedTasksCount,
            'completedTasksCount' => $completedTasksCount,
        ]);
    }


    public function projectPie()
    {
        $user = getAuthUser(); // Retrieve the user once
        $company = $user?->company; // Get the user's company

        // Use the `count` method directly on the query builder to get the counts
        $deliveredProjects = $company?->projects()->where('status', 'Delivered')->count();
        $onProgressProjects = $company?->projects()->where('status', 'in_progress')->count();
        $failedProjects = $company?->projects()->where('status', 'failed')->count();

        // Return the results as an array or in any desired format
        return response()->json([
            'delivered' => $deliveredProjects,
            'on_progress' => $onProgressProjects,
            'failed' => $failedProjects,
        ]);
    }

    public function projectProgress()
    {
        $user = getAuthUser(); // Retrieve the user once

        $projects = $user->employee->projects;
        $categories = $projects?->pluck('name')->toArray() ?? [];
        $failed = [];
        $inProgress = [];
        $delivered = [];
       if(!empty($projects)){
        foreach ($projects as $project) {
            $failed[] = $project->tasks()->where('status', 'failed')->count();
            $inProgress[] = $project->tasks()->where('status', 'in_progress')->count();
            $delivered[] = $project->tasks()->where('status', 'delivered')->count();
        }
       }

        return response()->json([
            'categories' => $categories,
            'failed' => $failed,
            'in_progress' => $inProgress,
            'delivered' => $delivered,
        ]);
    }

    public function projectStatus()
    {
        $user = getAuthUser(); // Retrieve the user once
        $company = $user?->company; // Get the user's company

        $projects = $company?->projects;
        $delivered = $projects?->where('status', 'delivered')->count();
        $inProgress = $projects?->where('status', 'in_progress')->count();
        $failed = $projects?->where('status', 'failed')->count();

        return response()->json([
            'delivered' => $delivered,
            'in_progress' => $inProgress,
            'failed' => $failed,
        ]);
    }




    public function employeeDistributionByDepartment()
    {
        $user = getAuthUser(); // Retrieve the user once
        $company = $user?->company; // Get the user's company
        $employees = $company?->employees;
        $positions = $employees?->pluck('position')->unique()->values()->toArray();
        $positionsCount = [];

        if (!empty($positions)) {
            foreach ($positions as $position) {
                $employeesInPosition = $employees?->where('position', $position)->count();
                $positionsCount[] = [
                    'name' => strtoupper($position),
                    'y' => $employeesInPosition
                ];
            }
        }

        return response()->json([
            'data' => $positionsCount,
        ]);
    }

    public function employeeTasksRank()
    {
        $user = getAuthUser();
        $tasks =
        $user->employee->tasks;
        $status = ['in_progress', 'completed', 'failed'];
        foreach ($status as $statu) {
            $taskData[] = [
                'name' => ucwords(str_replace('_', ' ', $statu)),
                'y' => $tasks->where('status', '=', $statu)->count(),
            ];
        }
        return response()->json([
            'data' => $taskData,
        ]);
    }
    public function employeeTenure()
    {
        $user = getAuthUser(); // Assuming this user is the owner of the company
        $company = $user?->company;
        $employees = $company?->employees;

        $tenureRanges = [
            '0-1 Years' => 0,
            '1-3 Years' => 0,
            '3-5 Years' => 0,
            '5-10 Years' => 0,
            '10+ Years' => 0,
        ];

        if(!empty($employees)){
            foreach ($employees as $employee) {
                $years = Carbon::parse($employee->start_date)->diffInYears(now());

                if ($years < 1) {
                    $tenureRanges['0-1 Years']++;
                } elseif ($years >= 1 && $years < 3) {
                    $tenureRanges['1-3 Years']++;
                } elseif ($years >= 3 && $years < 5) {
                    $tenureRanges['3-5 Years']++;
                } elseif ($years >= 5 && $years < 10) {
                    $tenureRanges['5-10 Years']++;
                } else {
                    $tenureRanges['10+ Years']++;
                }
            }
        }
        $data = array_values($tenureRanges);

        return response()->json([
            'data' => $data
        ]);
    }

    public function monthlyTaskCompletion()
    {
        $user = getAuthUser();
        $tasks =
        $user->employee->tasks;

        $completionData = [];
        $months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];

        // Initialize completion data array with months
        foreach ($months as $month) {
            $completionData[$month] = 0;
        }

       if(!empty($tasks)){
         // Calculate task completions for each month
         foreach ($tasks as $task) {
            $month = $task->completed_at->format('M');
            $completionData[$month]++;
        }
       }



        return response()->json([
            'categories' => array_keys($completionData),
            'data' => array_values($completionData)
        ]);
    }

    public function getNotifications(){
        $user=getAuthUser();
        $notifications = $user->notifications;
        return response()->json($notifications);
    }
    public function setAsReadAt()
    {
        $user = getAuthUser();
         $user->notifications->each(function($n){
            $n->read_at = now();
            $n->save();
         });
        return response("",200);
    }
    public function deleteNotifications()
    {
        $user = getAuthUser();
        $user?->notifications()->delete();
        return response(["message"=>"All Notifications deleted successfully !!"],200);
    }
}

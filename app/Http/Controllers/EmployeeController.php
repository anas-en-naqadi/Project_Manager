<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResources;
use App\Mail\AlertUsersMail;
use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use App\Notifications\AlertUsersNotifications;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmployeeController extends Controller
{

    public function index()
    {
        $user = getAuthUser();
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        if ($user->hasRole("project_manager")) {

            $projects = $user->employee->projects;
            $employees = collect();
            foreach ($projects as $project) {
                $employees = $employees->merge($project->employees);
            }
            $employees = $employees->unique('id');
        } else {
            $employees = $user->company->employees;
        }

        return response()->json(EmployeeResources::collection($employees));
    }


    public function store(StoreEmployeeRequest $request)
    {
        // Start a database transaction
        DB::beginTransaction();

        try {
            $user = getAuthUser();
            // Validate incoming request data
            $data = $request->validated();
            $data['company_id'] = $user->company->id;
            // Extract and unset user and projects from $data
            $userData = $data['user'] ?? [];
            $password = Str::random(8);

            $userData['password'] = Hash::make($password);
            $projects = $data['projects'] ?? [];

            unset($data['user']);
            unset($data['projects']);


            if (!empty($userData)) {
                // Create the user
                $newUser = User::create($userData);

            }

            // Create the employee
            $employeeData = array_merge($data, ['user_id' => $newUser->id]);
            $employee = Employee::create($employeeData);
            $message = "Welcome to our Company, I hope you enjoy working with our team. This is your password: <b>$password</b>";
               $details = ['subject' => 'Breaking News', 'company_name' => $user->company->name, 'data' => ['message' => $message, 'employee_name' => $employee->user->name]];
            Mail::to($employee->user->email)->send(new AlertUsersMail($details));

            // Attach projects if any
            if (!empty($projects)) {
                $projectIds = array_column($projects, 'id');
                $employee->projects()->sync($projectIds);
            }

            // Commit the transaction
            DB::commit();

            // Return the created employee with a success message
            return response()->json([
                'employee' => EmployeeResources::make($employee),
                'message' => 'Employee created successfully'
            ], 200);
        } catch (\Exception $e) {
            // Rollback the transaction if there is an error
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create employee',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function show(Employee $employee)
    {
        return $employee;
    }

    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        // Validate the incoming request data
        $data = $request->validated();
        $user = getAuthUser();
        // Extract and unset projects from $data
        $projects = $data['projects'] ?? [];
        unset($data['projects']);

        // Update the employee's basic information
        $employee->update($data);
        $user->update($data['user']);

        // Sync projects in the pivot table 'project_employees'
        if (!empty($projects)) {
            $projectIds = array_column($projects, 'id');

            // Sync the projects using sync method with additional pivot data
            $employee->projects()->sync($projectIds);
        } else {
            // If no projects are provided, detach all existing projects
            $employee->projects()->detach();
        }

        // Return the updated employee instance with a success message
        return response()->json([
            'employee' => EmployeeResources::make($employee->fresh()), // fresh() to get the updated relationships
            'message' => 'Employee updated successfully'
        ]);
    }


    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response(['message' => 'Employee Deleted Successfully']);
    }

    public function changeRole(Request $request)
    {
        $user = getAuthUser();
        $data = $request->validate(['id' => 'required|exists:employees', 'role' => 'required|string']);
        $employee = Employee::find($data['id']);
        if (!$employee)
            return response()->json(['message' => 'Employee not found'], 404);
        $employee->user->role = $data['role'];
        $employee->user->save();
        if ($data['role'] === "employee")
            $employee->projects()->delete();
        $message = $employee->role === "project_manager" ? "Good news, The Ceo sets you as a project manager " : "Bad news, The Ceo sets you back as employee";
        $employee->user->notify(new AlertUsersNotifications($message));
        $details = ['subject' => 'Breaking news', 'company_name' => $user->company->name, 'data' => ['message' => $message, 'employee_name' => $employee->user->name]];
        Mail::to($user->email)->send(new AlertUsersMail($details));
        return response()->json([
            'employee' => EmployeeResources::make($employee->fresh()), // fresh() to get the updated relationships
            'message' => 'Role has been updated successfully'
        ]);
    }
}

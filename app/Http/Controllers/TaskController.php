<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResources;
use App\Mail\AlertUsersMail;
use App\Models\Employee;
use App\Models\ProjectEmployee;
use App\Models\Task;
use App\Models\User;
use App\Notifications\AlertUsersNotifications;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class TaskController extends Controller
{

    public function index()
    {
        $user=getAuthUser();
            $tasks = $user->employee->tasks;

        return response()->json(TaskResources::collection($tasks));
    }

    public function store(TaskRequest $request)
    {
        $user = getAuthUser();
        $data = $request->validated();
        $data['project_manager_id'] = $user->employee->id;
        $data['completed_at'] = Carbon::parse("2024-08-28");
        $task = Task::create($data);
        $message = "New task assigned to you : ". $task->title . " by the project manager : " . $task->projectManager->user->name;
        $task->assignedTo->user->notify(new AlertUsersNotifications($message));
        $details = ['subject' => 'Breaking news', 'company_name' => $task->projectManager->user->name, 'data' => ['message' => $message, 'employee_name' => $task->assignedTo->user->name]];
        Mail::to($task->assignedTo->user->email)->send(new AlertUsersMail($details));
        return response()->json(["message"=>"Task added successfully !","task"=>TaskResources::make($task)]);
    }

    public function show(Task $task)
    {
        return $task;
    }

    public function update(TaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['project_manager_id'] = getAuthUser()->employee->id ;
        $task->update($data);
        $message = "The Task with id : " . $task->id . " was updated, check details";

        $task->assignedTo->user->notify(new AlertUsersNotifications($message));
        $details = ['subject' => 'Breaking news', 'company_name' => $task->projectManager->user->name, 'data' => ['message' => $message, 'employee_name' => $task->assignedTo->user->name]];
        Mail::to($task->assignedTo->user->email)->send(new AlertUsersMail($details));
        return response()->json(["message"=>"Task updated successfully !","task"=>TaskResources::make($task)]);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        $message = "The Task with id : " . $task->id . " was deleted, check details";
        $task->assignedTo->user->notify(new AlertUsersNotifications($message));
        $details = ['subject' => 'Breaking news', 'company_name' => $task->projectManager->user->name, 'data' => ['message' => $message, 'employee_name' => $task->assignedTo->user->name]];
        Mail::to($task->assignedTo->user->email)->send(new AlertUsersMail($details));
        return response()->json('deleted successfully !!');
    }

    public function setTaskStatus(Request $request,Task $task){
        $status = $request->validate(['status'=>'required|string'])['status'];
        $task->status = $status;
        $task->save();
        $message = "The Task with id : " . $task->id . " status was updated to : ". $status;
        $task->projectManager->user->notify(new AlertUsersNotifications($message));
        $details = ['subject' => 'Breaking news', 'company_name' => $task->projectManager->user->name, 'data' => ['message' => $message, 'employee_name' => $task->assignedTo->user->name]];
        Mail::to($task->projectManager->user->email)->send(new AlertUsersMail($details));
        return response()->json(["message" => "Task updated successfully !", "task" => TaskResources::make($task)]);

    }


}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResources;
use App\Mail\AlertUsersMail;
use App\Models\Project;
use App\Models\User;
use App\Notifications\AlertUsersNotifications;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class ProjectController extends Controller
{

    public function index()
    {
        $user = getAuthUser();
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        if ($user->hasRole("project_manager") || $user->hasRole("employee")) {
            $projects = $user->employee->projects;
        } else {
            $projects = $user->company->projects;
        }
        return response()->json(ProjectResources::collection($projects));
    }

    public function store(ProjectRequest $request)
    {
        $user = getAuthUser();
        $data = $request->validated() ;
        $data['company_id'] = $user->company->id;
        $project = Project::create($data);
        $use_r=User::find($data['project_manager_id']);
        $project->employees()->attach($use_r->employee->id);
        $message = "You have assigned to be project manager of the project : " . $project->name ;
        $project->projectManager->notify(new AlertUsersNotifications($message));
        $details = ['subject' => 'Breaking news', 'company_name' => $user->company->name, 'data' => ['message' => $message, 'employee_name' => $project->projectManager->name]];
        Mail::to($project->projectManager->email)->send(new AlertUsersMail($details));
        return response()->json(['message'=>'Project added successfully !!','project'=>ProjectResources::make($project)]);
    }

    public function show(Project $project)
    {
        return $project;
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $user = getAuthUser();
        $data = $request->validated() ;
        $data['company_id'] = getAuthUser()->company->id;
        $project->update($data);
        $message = "The project with id : " . $project->id . "was updated, check details";
        $this->Notification($project, $message);
        $details = ['subject' => 'Breaking news', 'company_name' => $user->company->name, 'data' => ['message' => $message, 'employee_name' => $project->projectManager->name]];
        Mail::to($project->projectManager->email)->send(new AlertUsersMail($details));
        return response()->json(['message'=>'Project updated successfully !!','project'=>ProjectResources::make($project)]);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        $message = "The project with id : " . $project->id . "was deleted, check details";
        $this->Notification($project,$message);
        $details = ['subject' => 'Breaking news', 'company_name' => getAuthUser()->company->name, 'data' => ['message' => $message, 'employee_name' => $project->projectManager->name]];
        Mail::to($project->projectManager->email)->send(new AlertUsersMail($details));
        return response()->json(['message'=>'Project deleted successfully !!']);
    }

    public function projectAsDelivered(Request $request,Project $project){
        $user = getAuthUser();
        $data = $request->validate(['status'=>'required|in:delivered,failed']);
        $project->status = $data['status'];
        $project->save();
        $message = "The project with id : " . $project->id . "status was updated to : ". $project->status . " by the project manager " . $project->projectManager->name;
        $user->notify(new AlertUsersNotifications($message));
        $details = ['subject' => 'Breaking news', 'company_name' => $project->projectManager->name, 'data' => ['message' => $message, 'employee_name' => $user->name]];
        Mail::to($user->email)->send(new AlertUsersMail($details));
        return response()->json(['message'=>'Status updated successfully !!','project'=>ProjectResources::make($project)]);
    }
    private function Notification($project,$message){
        $project->projectManager->notify(new AlertUsersNotifications($message));
        $project->employees->each(function ($employee) use ($message) {
            $employee->user->notify(new AlertUsersNotifications($message));
        });
    }
}


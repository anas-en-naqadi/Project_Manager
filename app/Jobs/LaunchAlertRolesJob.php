<?php

namespace App\Jobs;

use App\Mail\AlertUsersMail;
use App\Notifications\AlertUsersNotifications;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class LaunchAlertRolesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private  $data;
    private string $type;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param string $type
     */
    public function __construct( $data,  $type)
    {
        $this->data = $data;
        $this->type = $type;
    }
    public function getData(){
        return $this->data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
                foreach ($this->data as $row) {
            if (Carbon::parse($row?->due_date)->isTomorrow() || Carbon::parse($row?->end_date)->isTomorrow()) {                switch ($this->type) {
                    case 'task':

                        $message = "One day left to complete your task. Please ensure to finish it as soon as possible.";
                        $row->employee->user->notify(new AlertUsersNotifications($message));
                        $details = [
                            'subject' => 'Task Alert',
                            'company_name' => $row->employee->company->name,
                            'data' => [
                                'message' => $message,
                                'employee_name' => $row->employee->user->name
                            ]
                        ];
                        Mail::to($row->employee->user->email)->send(new AlertUsersMail($details));
                        break;

                    case 'project':
                        $message = "One day left to deliver the project. Please ensure to deliver it as soon as possible.";
                        $row->projectManager->notify(new AlertUsersNotifications($message));
                        $details = [
                            'subject' => 'Project Alert',
                            'company_name' => $row->company->name,
                            'data' => [
                                'message' => $message,
                                'employee_name' => $row->projectManager->name
                            ]
                        ];
                        Mail::to($row->projectManager->email)->send(new AlertUsersMail($details));
                        break;

                    case 'employee':

                        $message = "Your work period will end tomorrow. Please prepare your paperwork.";
                        $row->user->notify(new AlertUsersNotifications($message));
                        $details = [
                            'subject' => 'Employee Alert',
                            'company_name' => $row->company->name,
                            'data' => [
                                'message' => $message,
                                'employee_name' => $row->user->name
                            ]
                        ];
                        Mail::to($row->user->email)->send(new AlertUsersMail($details));
                        break;
                }
            }
        }
    }
}

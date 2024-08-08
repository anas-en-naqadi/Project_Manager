<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

// Group routes with common middleware
require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->group(function () {

    Route::middleware('role:company')->group(function () {
        Route::get('/project_status', [DashboardController::class, 'projectStatus']);
        Route::put('/change_role', [EmployeeController::class, 'changeRole']);
        Route::get('/company_statistics', [DashboardController::class, 'CompanyDashboard']);
        Route::get('/employee_by_departement', [DashboardController::class, 'employeeDistributionByDepartment']); // Fixed typo
        Route::get('/employee_tenure_rank', [DashboardController::class, 'employeeTenure']);
        Route::resource('project', ProjectController::class)
            ->only(['store', 'update', 'destroy']);

        Route::resource('employee', EmployeeController::class)
            ->only(['store', 'update', 'destroy']);
        Route::resource('company', CompanyController::class);
        Route::post('/update_user', [CompanyController::class, 'updateUserInfo']); // Fixed typo
        Route::post('/update_password', [CompanyController::class, 'updatePass']); // Fixed typo
        Route::post('/update_company', [CompanyController::class, 'updateCompanyInfo']); // Fixed typo


    });
    // Apply middleware and define resource routes
    Route::middleware('role:project_manager')->group(function () {
        Route::get('/pm_statistics', [DashboardController::class, 'ProjectManagerDashboard']);
        Route::get('/project_progress', [DashboardController::class, 'projectProgress']);
        Route::post('/set_task_status/{task}', [TaskController::class, 'setTaskStatus']);
        Route::post('/mark_project_as_delivered/{project}', [ProjectController::class, 'projectAsDelivered']);
        Route::resource('task', TaskController::class)
            ->only(['store', 'update', 'destroy']);
    });



    Route::middleware('role:employee')->group(function () {
        Route::get('/employee_statistics', [DashboardController::class, 'EmployeeDashboard']);
        Route::get('/employee_status_rank', [DashboardController::class, 'employeeTasksRank']);
        Route::get('/employee_task_completion', [DashboardController::class, 'monthlyTaskCompletion']);
    });




    Route::get('/employee', [EmployeeController::class, 'index']);
    Route::get('/task', [TaskController::class, 'index']);


    Route::get('/user', function () {
        $user= getAuthUser()?->load('company');
     if($user->company){
            $user->company->logo = URL::to($user->company?->logo) ?? null;
            $user->company->save();
     }
        return $user;
    });
    Route::get('/project', [ProjectController::class, 'index']);

    Route::get('/notifications', [DashboardController::class, 'getNotifications']);
    Route::delete('/delete_notifications', [DashboardController::class, 'deleteNotifications']);

    Route::get('/set_as_read_at', [DashboardController::class, 'setAsReadAt']);
});

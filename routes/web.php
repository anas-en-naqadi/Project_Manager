<?php

use App\Models\Task;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Notifications\AlertEndOfTimeNotifications;

Route::get("/test",function(){

    $user = getAuthUser();
    if (!$user) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }
    $employees = $user?->company?->employees ?? [];
    return json_encode($employees);
});

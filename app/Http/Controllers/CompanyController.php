<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use App\Models\User;
use App\Notifications\AlertUsersNotifications;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class CompanyController extends Controller
{
    public function index()
    {
        return Company::all();
    }

    public function store(CompanyRequest $request)
    {
        $data = $request->validated();
        $user = getAuthUser();
        $logo_path =storeImage($data['logo']);
        $data['logo'] = $logo_path;
        $company = $user->company()->create($data);
        $message = "Your Company : " . $company->name . " was created successfully, enjoy";
        $company->owner->notify(new AlertUsersNotifications($message));
        return response(['message'=>'Compnay Added successfully','company'=>$company]);
    }

    public function show(Company $company)
    {
        return $company;
    }

    public function update(CompanyRequest $request, Company $company)
    {
        $company->update($request->validated());
        return response($company, Response::HTTP_OK);
    }

    public function destroy(Company $company)
    {
        $company->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function updatePass(Request $request)
    {
        $user =  getAuthUser(); // If $user is null, use getSimpleUser()

        // Array to store validation errors
        $errors = [];

        // Check if the current password is correct
        if (!Hash::check($request->current_password, $user->password)) {
            array_push($errors, 'Current password is incorrect');
        }

        // Check if the new password meets the minimum length requirement
        if (strlen($request->new_password) < 8) {
            array_push($errors, 'The password must be at least 8 characters long');
        }

        // Check if the new password and confirmation match
        if ($request->new_password !== $request->confirm_password) {
            array_push($errors, 'The password confirmation does not match');
        }

        // If there are validation errors, return them
        if (!empty($errors)) {
            return response(['errors' => $errors], 422);
        }

        // Update the user's password
        $user->password = Hash::make($request->new_password);
        $user->save();

        // Return success message
        return response()->json(['message' => 'Password updated successfully']);
    }
    public function updateUserInfo(Request $request)

    {
        $user = getAuthUser();
        // Validate request data
        $validated = $request->validate([
            'email' => 'required|email',
            'phone' => 'required|string', // Corrected 'fitst_name' to 'first_name'
            'name' => 'required|string',  // Corrected 'require' to 'required'
        ]);

            CleanInputs($validated);


        // Update user information
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone'=>$validated['phone']
        ]);



        return response(['message' => 'User information updated Successfully']);
    }
    public function updateCompanyInfo(CompanyRequest $request)

    {
        $user = getAuthUser();
        // Validate request data

        $validated = $request->validated();
        CleanInputs($validated);
        $validated['logo'] = storeImage($validated['logo']);


        // Update user information
        $user->company()->update($validated);

        return response(['message'=>'Company information updated Successfully']);
    }
}

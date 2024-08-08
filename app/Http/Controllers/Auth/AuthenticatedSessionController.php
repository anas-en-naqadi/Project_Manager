<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

        $token = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json(['token' => $token,'data'=>$user->load("company")],200);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        $user = Auth::user();
        Auth::guard('web')->logout();
        $user->tokens()->delete();
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['message'=>'Logged out successfully !!']);
    }
}

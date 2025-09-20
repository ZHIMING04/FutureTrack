<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('Settings', [
                'user' => null,
                'settingsData' => null
            ]);
        }

        $settingsData = [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'profile' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'currentEducationLevel' => $user->current_education_level,
                'school' => $user->school
            ],
            'preferences' => $user->preferences ?? [
                'notifications' => true,
                'theme' => 'light',
                'language' => 'en',
                'emailUpdates' => true,
                'smsUpdates' => false
            ],
            'privacy' => [
                'profileVisibility' => 'public',
                'showAcademicRecords' => true,
                'showActivities' => true,
                'allowMentorContact' => true
            ],
            'notifications' => [
                'deadlineReminders' => true,
                'applicationUpdates' => true,
                'courseReminders' => true,
                'mentorMessages' => true,
                'systemUpdates' => false
            ]
        ];

        return Inertia::render('Settings', $settingsData);
    }

    public function updateProfile(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'current_education_level' => 'nullable|string',
            'school' => 'nullable|string|max:255'
        ]);

        $user->update($request->only([
            'name', 'email', 'phone', 'current_education_level', 'school'
        ]));

        return redirect()->back()->with('success', 'Profile updated successfully');
    }

    public function updatePreferences(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'preferences' => 'required|array',
            'preferences.notifications' => 'boolean',
            'preferences.theme' => 'in:light,dark',
            'preferences.language' => 'in:en,ms',
            'preferences.emailUpdates' => 'boolean',
            'preferences.smsUpdates' => 'boolean'
        ]);

        $user->update([
            'preferences' => $request->preferences
        ]);

        return redirect()->back()->with('success', 'Preferences updated successfully');
    }

    public function updatePassword(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:8|confirmed'
        ]);

        if (!password_verify($request->current_password, $user->password)) {
            return redirect()->back()->with('error', 'Current password is incorrect');
        }

        $user->update([
            'password' => bcrypt($request->new_password)
        ]);

        return redirect()->back()->with('success', 'Password updated successfully');
    }

    public function deleteAccount(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'confirmation' => 'required|in:DELETE'
        ]);

        // In a real implementation, you would soft delete or anonymize the user
        // $user->delete();

        return redirect()->back()->with('success', 'Account deletion requested. You will receive an email confirmation.');
    }
}

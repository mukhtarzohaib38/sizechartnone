<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Models\AppSetting;

class AppSettingsController extends Controller
{
    public function saveSettings(Request $request)
    {
        // $validatedData = $request->validate([
        //     'setting_key' => 'required|string|max:255',
        //     'setting_value' => 'required|string|max:255',
        // ]);

        // $setting = AppSetting::updateOrCreate(
        //     ['setting_key' => $validatedData['setting_key']],
        //     ['setting_value' => $validatedData['setting_value']]
        // );
        $setting = [
            'setting_key',
            'setting_value'
        ];

        return response()->json(['success' => true, 'setting' => $setting]);
    }
}

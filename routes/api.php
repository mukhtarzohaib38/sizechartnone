<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppSettingsController;

Route::post('/settings', [AppSettingsController::class, "saveSettings"])->name('settings');

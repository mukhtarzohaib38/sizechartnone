<?php

use App\Http\Controllers\ChartController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebhooksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
})->middleware(['verify.shopify'])->name('home');

// GDPR webhooks
Route::post('/webhooks/gdpr/customer-redact', [WebhooksController::class, 'customerRedact'])->middleware('auth.webhook');
Route::post('/webhooks/gdpr/shop-redact', [WebhooksController::class, 'shopRedact'])->middleware('auth.webhook');
Route::post('/webhooks/gdpr/shop-data-request', [WebhooksController::class, 'shopDataRequest'])->middleware('auth.webhook');

// Catch-all route to handle all other requests and direct them to the React app
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*')->middleware(['verify.shopify']);


Route::post('/upload', function (Request $request) {
    $uploadedUrls = [];

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $filename = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $filename);
            $uploadedUrls[] = asset('uploads/' . $filename);
        }
    }

    return response()->json(['urls' => $uploadedUrls]);
});
Route::post('/save_chart', [ChartController::class, 'save_chart']);
Route::post('/get_charts', [ChartController::class, 'get_charts']);
Route::post('/dell_chart', [ChartController::class, 'dell_chart']);
Route::post('/dell_all_charts', [ChartController::class, 'dell_all_charts']);
Route::get('/edit/{id}', [ChartController::class, 'edit']);
Route::post('/get_chart', [ChartController::class, 'get_chart']);


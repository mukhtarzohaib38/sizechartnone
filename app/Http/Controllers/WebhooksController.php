<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Models\AppSetting;

class WebhooksController extends Controller
{
    public function customerRedact(Request $request)
    {
        // $data = $request->all();
        // $data['webhook'] = 'customer-redact';
        // $data['store'] = $request->header('x-shopify-shop-domain');
        // $data['timestamp'] = Carbon::now()->toDateTimeString();
        // $data['ip'] = $request->ip();
        // $data['headers'] = $request->header();
        // $data['body'] = $request->getContent();
        // $data['user'] = $request->user();
        // $data['user-agent'] = $request->header('User-Agent');
        // $data['request'] = $request;
        // $data['request-all'] = $request->all();
        // $data['request-headers'] = $request->header();
        // $data['request-content'] = $request->getContent();
        // $data['request-ip'] = $request->ip();
        // $data['request-timestamp'] = Carbon::now()->toDateTimeString();
        // $data['request-store'] = $request->header('x-shopify-shop-domain');
        // $data['request-webhook'] = 'customer-redact';
        // $data['request-user'] = $request->user();
        // $data['request-user-agent'] = $request->header('User-Agent');
        // $data['request-headers'] = $request->header();
        // $data['request-headers-all'] = $request->headers->all();
        // $data['request-headers-raw'] = $request->headers->raw();
        // $data['request-headers-raw-all'] = $request->headers->raw();
        // $data['request-headers-raw-content-type'] = $request->headers->raw('Content-Type');
        // $data['request-headers-raw-content-type-0'] = $request->headers->raw('Content-Type')[0];
        // $data['request-headers-raw-content-type-1'] = $request->headers->raw('Content-Type')[1];
        // $data['request-headers-raw-content-type-2'] = $request->headers->raw('Content-Type')[2];
        // $data['request-headers-raw-content-type-3'] = $request->headers->raw('Content-Type')[3];

        // return response()->json($data);
        return response()->json(['message' => 'customer-redact'], 200);
    }

    public function shopRedact(Request $request)
    {
        // $data = $request->all();
        // $data['webhook'] = 'shop-redact';
        // $data['store'] = $request->header('x-shopify-shop-domain');
        // $data['timestamp'] = Carbon::now()->toDateTimeString();
        // $data['ip'] = $request->ip();
        // $data['headers'] = $request->header();
        // $data['body'] = $request->getContent();
        // $data['user'] = $request->user();
        // $data['user-agent'] = $request->header('User-Agent');
        // $data['request'] = $request;
        // $data['request-all'] = $request->all();
        // $data['request-headers'] = $request->header();
        // $data['request-content'] = $request->getContent();
        // $data['request-ip'] = $request->ip();
        // $data['request-timestamp'] = Carbon::now()->toDateTimeString();
        // $data['request-store'] = $request->header('x-shopify-shop-domain');
        // $data['request-webhook'] = 'shop-redact';
        // $data['request-user'] = $request->user();
        // $data['request-user-agent'] = $request->header('User-Agent');
        // $data['request-headers'] = $request->header();
        // $data['request-headers-all'] = $request->headers->all();
        // $data['request-headers-raw'] = $request->headers->raw();
        // $data['request-headers-raw-all'] = $request->headers->raw();
        // $data['request-headers-raw-content-type'] = $request->headers->raw('Content-Type');
        // $data['request-headers-raw-content-type-0'] = $request->headers->raw('Content-Type')[0];
        // $data['request-headers-raw-content-type-1'] = $request->headers->raw('Content-Type')[1];
        // $data['request-headers-raw-content-type-2'] = $request->headers->raw('Content-Type')[2];
        // $data['request-headers-raw-content-type-3'] = $request->headers->raw('Content-Type')[3];

        // return response()->json($data);
        return response()->json(['message' => 'shop-redact'], 200);
    }

    public function shopDataRequest(Request $request)
    {
        // $data = $request->all();
        // $data['webhook'] = 'shop-data-request';
        // $data['store'] = $request->header('x-shopify-shop-domain');
        // $data['timestamp'] = Carbon::now()->toDateTimeString();
        // $data['ip'] = $request->ip();
        // $data['headers'] = $request->header();
        // $data['body'] = $request->getContent();
        // $data['user'] = $request->user();
        // $data['user-agent'] = $request->header('User-Agent');
        // $data['request'] = $request;
        // $data['request-all'] = $request->all();
        // $data['request-headers'] = $request->header();
        // $data['request-content'] = $request->getContent();
        // $data['request-ip'] = $request->ip();
        // $data['request-timestamp'] = Carbon::now()->toDateTimeString();
        // $data['request-store'] = $request->header('x-shopify-shop-domain');
        // $data['request-webhook'] = 'shop-data-request';
        // $data['request-user'] = $request->user();
        // $data['request-user-agent'] = $request->header('User-Agent');
        // $data['request-headers'] = $request->header();
        // $data['request-headers-all'] = $request->headers->all();
        // $data['request-headers-raw'] = $request->headers->raw();
        // $data['request-headers-raw-all'] = $request->headers->raw();
        // $data['request-headers-raw-content-type'] = $request->headers->raw('Content-Type');
        // $data['request-headers-raw-content-type-0'] = $request->headers->raw('Content-Type')[0];
        // $data['request-headers-raw-content-type-1'] = $request->headers->raw('Content-Type')[1];
        // $data['request-headers-raw-content-type-2'] = $request->headers->raw('Content-Type')[2];
        // $data['request-headers-raw-content-type-3'] = $request->headers->raw('Content-Type')[3];

        // return response()->json($data);
        return response()->json(['message' => 'shop-data-request'], 200);
    }
}

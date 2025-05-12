@extends('shopify-app::layouts.default')

@section('styles')
    @viteReactRefresh
    @vite('resources/js/app.jsx')
@endsection

@section('content')
    {{-- <ui-title-bar title="Products">
        <button onclick="console.log('Secondary action')">Secondary action</button>
        <button variant="primary" onclick="console.log('Primary action')">
            Primary action
        </button>
    </ui-title-bar> --}}
    <ui-nav-menu>
        <a href="/" rel="home" onclick="shopify.loading(true);">Home</a>
    </ui-nav-menu>

    <!-- You are: (shop domain name) -->
    <input type="hidden" value="{{ Auth::user()->name }}" id="usernamemain" />

    <div id="app"></div>
@endsection

@section('scripts')
@endsection

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('charts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('priority')->nullable();
            $table->string('status')->nullable();
            $table->string('product')->nullable();
            $table->string('homepage')->nullable();
            $table->string('collectionPage')->nullable();
            $table->string('country')->nullable();
            $table->string('status2')->nullable();
            $table->string('selectedPreset')->nullable();
            $table->string('title')->nullable();
            $table->string('unit')->nullable();
            $table->string('headersTable')->nullable();
            $table->string('dataTable')->nullable();
            $table->string('storefront')->nullable();
            $table->string('images')->nullable();
            $table->string('subtitle')->nullable();
            $table->string('shopname')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charts');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chart extends Model
{
    protected $fillable = [
        'name',
        'priority',
        'status',
        'product',
        'homepage',
        'collectionPage',
        'country',
        'status2',
        'selectedPreset',
        'title',
        'unit',
        'headersTable',
        'dataTable',
        'storefront',
        'images',
        'subtitle',
        'shopname',
    ];
}

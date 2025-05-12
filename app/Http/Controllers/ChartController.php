<?php

namespace App\Http\Controllers;

use App\Models\Chart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChartController extends Controller
{
    public function get_chart(Request $request){
        $data = Chart::where('id', $request['0'])->first();
        return response()->json($data);
    }
    public function edit(Request $request){
        $data = Chart::where('id', $request->id)->first();
        return view('edit',compact('data'));
    }
    public function save_chart(Request $request) {

        Chart::create($request->all());
        return true;
    }
    public function get_charts(Request $request) {
        $data = Chart::where('shopname', $request['0'])->get();
        return response()->json($data);
    }
    public function dell_chart(Request $request)
    {
        $shopname = $request['0']; 
        Chart::where(column: 'id', operator: $shopname)->delete();
        $data = Chart::where(column: 'shopname', operator: $request['1'])->get();
        return response()->json(data: $data);

    }
    public function dell_all_charts(Request $request)
    {
        $ids = $request->all(); 
        Chart::whereIn('id', $ids)->delete();
        return response()->json(status: true);
    }


}

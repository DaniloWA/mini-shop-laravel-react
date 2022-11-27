<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function get_all_product(Request $request)
    {
        $products = Product::all();
        return response()->json([
            'products' => $products
        ],200);
    }

}

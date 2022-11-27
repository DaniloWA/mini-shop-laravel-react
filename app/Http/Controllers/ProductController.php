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

    public function add_product(Request $request) {
        $product = new Product();

        $product->name = $request->name;
        $product->description = $request->description;

        if (!empty($request->photo) && $request->hasFile('photo') ) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.' . $extension;
            $file->move(public_path('uploads/'), $filename);
            $product->photo = 'public/uploads/'.$filename;
        } else {
             $product->photo = "0";
        };

        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();

    }
}

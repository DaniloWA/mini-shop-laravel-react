<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

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
            $product->photo = 'uploads/'.$filename;
        } else {
             $product->photo = "0";
        };

        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();

    }

    public function get_edit_product($id) {
        $product = Product::find($id);
        return response()->json([
            'product' => $product
        ], 200);
    }

    public function update_product(Request $request, $id) {
        $product = Product::find($id);

        $product->name = $request->name;
        $product->description = $request->description;

        if (!empty($request->photo) && $request->hasFile('photo') ) {

            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.' . $extension;
            $file->move(public_path('uploads/'), $filename);
            if(file_exists($file)){
                @unlink($file);
            }

            $product->photo = 'uploads/'.$filename;
        } else {
            $name = $product->photo;
        };
        $product->photo =  $name;
        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
    }

    public function delete_product($id) {
        $product = Product::findOrFail($id);
        $image = public_path(). $product->photo;
        if(file_exists($image)){
            @unlink($image);
        }
        $product->delete();
    }

}

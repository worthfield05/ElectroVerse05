import { Heart, ShoppingCart } from "lucide-react";
import React from "react";

const ProductCard = () => {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border hover:border-neutral-300 hover:shadow-lg transition-all">
      <div className="relative aspect-square bg-neutral-100 overflow-hidden">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            d
          </span>
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            -25%
          </span>
        </div>
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4" />
        </button>
        <img
          src=""
          alt="product.jpg"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full bg-white text-black text-sm py-2 rounded-lg font-medium hover:bg-neutral-100">
            <ShoppingCart className="w-4 h-4 inline mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-neutral-500 uppercase mb-1">Category</p>
        <h3 className="font-medium text-sm mb-2 line-clamp-2">Iphone xs max</h3>
        <div className="flex items-center gap-2 mb-2">
          *****
          <span className="text-xs text-neutral-500">(0)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Rs. 150</span>
          <span className="text-sm text-neutral-500 line-through">Rs 200</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { Heart, ShoppingCart } from "lucide-react";
import React from "react";
import RatingStar from "./RatingStar";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border hover:border-neutral-300 hover:shadow-lg transition-all">
      <div className="relative aspect-square bg-neutral-100 overflow-hidden">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            sale
          </span>
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            -25%
          </span>
        </div>
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4" />
        </button>
        <img
          src={product?.image[0]?.url}
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
        <p className="text-xs text-neutral-500 uppercase mb-1">
          {product.category}
        </p>
        <Link
          to={`/products/${product._id}`}
          className="font-medium text-sm mb-2 line-clamp-2"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <RatingStar rating={product.ratings} />
          <span className="text-xs text-neutral-500">
            ({product.numOfReviews})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Rs. ${product.price}</span>
          <span className="text-sm text-neutral-500 line-through">Rs 200</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

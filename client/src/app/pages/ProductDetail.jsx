import ReviewList from "@/components/ecommerce/ReviewList";
import ProductDetailSkeleton from "@/components/ecommerce/Skeletons";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/hooks/useCartItem";
import { useProductDetail } from "@/hooks/useProduct";
import { cn } from "@/lib/utils";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const extra = {
  images: [
    "https://images.unsplash.com/photo-150574042092s8-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop",
  ],
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium comfort design",
    "Bluetooth 5.0",
    "Quick charge capability",
  ],
};

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    comment:
      "Absolutely love these headphones! The sound quality is exceptional and the noise cancellation works perfectly. Worth every penny.",
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    date: "1 week ago",
    comment:
      "Great product overall. Very comfortable for long sessions. Battery life is as advertised. Only minor issue is the carrying case could be better.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Best headphones I've ever owned. The bass is deep without being overwhelming, and the highs are crystal clear. Highly recommend!",
  },
];
const ProductDetail = () => {
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const { id } = useParams();
  const { isLoading, isError, data } = useProductDetail(id);
  const [selectedImage, setSelectedImage] = useState(extra?.images[0]);
  const product = data?.product;
  const [quantity, setQuantity] = useState(0);

  // const onRatingChange = () => {};
  const handleQuantity = (val) => {
    if (val === "inc") {
      if (product?.stock <= quantity) {
        toast.error("Quantity cannot exceed product stock");
        return;
      }

      setQuantity((pre) => pre + 1);
    } else {
      if (quantity <= 1) {
        toast.error("Quantity cannot be less than 1");
        return;
      }
      setQuantity((pre) => pre - 1);
    }
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Section */}
        {isLoading ? (
          <ProductDetailSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Images */}

            <div className="space-y-4 ">
              <div className="bg-gray-100 aspect-square rounded-lg overflow-hidden border-2 border-black">
                <img
                  src={extra.images[selectedImage]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid  grid-cols-4 gap-4">
                {extra.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === index
                        ? "border-black "
                        : "border-gray-300 hover:border-gray-500"
                    )}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product?.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  {/* <Rating
                  value={product.ratings}
                  interactive={false}
                  onRatingChange={onRatingChange}
                /> */}
                  <span className="text-gray-600">
                    {product?.ratings} ({product?.numOfReviews}
                    {product?.numOfReviews <= 1 ? " review" : " reviews"})
                  </span>
                </div>
                <p className="text-5xl font-bold mb-6">Rs. {product?.price}</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product?.description}
                </p>
              </div>
              <div className="border-t-2 border-b-2 border-black py-6 space-y-4">
                <h3 className="font-bold text-lg">Key Features</h3>
                <ul className="space-y-2">
                  {extra.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                {product?.stock > 0 ? (
                  <div className="text-green-900">
                    In Stock ({product?.stock} available )
                  </div>
                ) : (
                  <span className=" text-lg text-gray-800">Out of Stock</span>
                )}
              </div>
              {product?.stock > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-bold">Quantity:</span>
                    <div className="flex items-center border-2 border-black rounded-lg">
                      <button
                        onClick={() => handleQuantity("dec")}
                        className="p-3 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-5 h-5" />{" "}
                      </button>
                      <span className="px-6 font-bold">{quantity}</span>
                      <button
                        onClick={() => handleQuantity("inc")}
                        className="p-3 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => addToCart(id, quantity)}
                      className={
                        "flex-1 bg-black text-white hover:bg-gray-800 py-6 text-lg font-bold rounded-lg"
                      }
                    >
                      <ShoppingCart className="mr-2 w-5 h-5" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className={
                        "border-2 border-black hover:bg-gray-100 p-6 rounded-lg"
                      }
                    >
                      <Heart className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <ReviewList />
      </div>
    </div>
  );
};

export default ProductDetail;

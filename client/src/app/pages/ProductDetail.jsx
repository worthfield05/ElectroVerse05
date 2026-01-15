// import ReviewList from "@/components/ecommerce/ReviewList";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import React, { Suspense, useState } from "react";
// import { Await, useLoaderData } from "react-router";
// const data = {
//   images: [
//     "https://images.unsplash.com/photo-150574042092s8-5e560c06d30e?w=600&h=600&fit=crop",
//     "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
//     "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
//     "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop",
//   ],
//   features: [
//     "Active Noise Cancellation",
//     "30-hour battery life",
//     "Premium comfort design",
//     "Bluetooth 5.0",
//     "Quick charge capability",
//   ],
// };
// const reviews = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     rating: 5,
//     date: "2 days ago",
//     comment:
//       "Absolutely love these headphones! The sound quality is exceptional and the noise cancellation works perfectly. Worth every penny.",
//   },
//   {
//     id: 2,
//     name: "Mike Chen",
//     rating: 4,
//     date: "1 week ago",
//     comment:
//       "Great product overall. Very comfortable for long sessions. Battery life is as advertised. Only minor issue is the carrying case could be better.",
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     rating: 5,
//     date: "2 weeks ago",
//     comment:
//       "Best headphones I've ever owned. The bass is deep without being overwhelming, and the highs are crystal clear. Highly recommend!",
//   },
// ];
// const ProductDetail = () => {
//   const [reviewerName, setReviewerName] = useState("");
//   return (
//     <div className="mb-16">
//       <Card className={"border-2 border-black"}>
//         <CardHeader>
//           <CardTitle className={"text-2xl"}>Write a Review</CardTitle>
//           <CardDescription>
//             Share your experience with this product
//           </CardDescription>
//         </CardHeader>
//         <CardContent className={"space-y-6"}>
//           <div>
//             <label className="block font-bold mb-2">Your Rating</label>
//             {/* <Rating
//               value={rating}
//               interactive={true}
//               onRatingChange={onRatingChange}
//             /> */}
//           </div>
//           <div>
//             <label className="block font-bold mb-2">Your Name</label>
//             <Input
//               className={"border-2 border-black rounded-lg"}
//               placeholder="Enter your name"
//               value={reviewerName}
//               onChange={(e) => setReviewerName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block font-bold mb-2" htmlFor="">
//               Your Review
//             </label>
//             <Textarea
//               className={"border-2 border-black rounded-lg min-h-32"}
//               placeholder="Tell us what you think about this product..."
//             />
//           </div>
//           <Button
//             className={
//               "bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg font-bold rounded-lg"
//             }
//           >
//             Submit Review
//           </Button>
//         </CardContent>
//       </Card>
//       <ReviewList />
//     </div>
//   );
// };

// export default ProductDetail;
import ProductCard from "@/components/ecommerce/ProductCard";
import ReviewList from "@/components/ecommerce/ReviewList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

// import Rating from "../rating/Rating";

import { useParams } from "react-router";

const data = {
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
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const { id } = useParams();
  // const { product, error, loading } = useSelector((state) => state.product);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (id) {
  //     dispatch(getProductDetail(id));
  //   }
  //   return () => {
  //     dispatch(removeErrors());
  //   };
  // }, [dispatch, id]);
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error.message);
  //     dispatch(removeErrors());
  //   }
  // }, [dispatch, error]);

  const [selectedImage, setSelectedImage] = useState(data?.images[0]);

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
  const relatedProducts = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 179.99,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Studio Monitor Speakers",
      price: 449.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "USB Audio Interface",
      price: 199.99,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Premium Cable Pack",
      price: 49.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    },
  ];
  // const onRatingChange = () => {};
  // const handleQuantity = (val) => {
  //   setQuantity(Math.max(0, quantity + val));
  // };
  // if (loading) {
  //   return <Loader />;
  // }
  // if (error || !product) {
  //   return <Loader />;
  // }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}

          <div className="space-y-4 ">
            <div className="bg-gray-100 aspect-square rounded-lg overflow-hidden border-2 border-black">
              <img
                src={data.images[selectedImage]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid  grid-cols-4 gap-4">
              {data.images.map((img, index) => (
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
              <h1 className="text-4xl font-bold mb-4">
                {/* {product.name} */}
                Iphone XS max
              </h1>
              <div className="flex items-center gap-4 mb-4">
                {/* <Rating
                  value={product.ratings}
                  interactive={false}
                  onRatingChange={onRatingChange}
                /> */}
                <span className="text-gray-600">
                  3.5 (5) Reviews
                  {/* {product.ratings} ({product.numOfReviews}
                  {product.numOfReviews <= 1 ? " review" : " reviews"}) */}
                </span>
              </div>
              <p className="text-5xl font-bold mb-6">
                {/* Rs. {product.price} */}Rs. 5
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {/* {product.description} */}
                Product description
              </p>
            </div>
            <div className="border-t-2 border-b-2 border-black py-6 space-y-4">
              <h3 className="font-bold text-lg">Key Features</h3>
              <ul className="space-y-2">
                {data.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="space-y-4">
              {product?.stock > 0 ? (
                <div className="text-green-900">
                  In Stock ({product?.stock} available )
                </div>
              ) : (
                <span className=" text-lg text-gray-800">Out of Stock</span>
              )}
            </div> */}
            {/* {product?.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold">Quantity:</span>
                  <div className="flex items-center border-2 border-black rounded-lg">
                    <button
                      onClick={() => handleQuantity(-1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-5 h-5" />{" "}
                    </button>
                    <span className="px-6 font-bold">{quantity}</span>
                    <button
                      onClick={() => handleQuantity(1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
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
            )} */}
          </div>
        </div>
        {/* Reviews Section */}
        <ReviewList />

        {/* Related Products */}

        <div className="py-6">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

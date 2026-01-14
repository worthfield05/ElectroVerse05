import EmptyState from "@/components/ecommerce/EmptyState";
import ProductCard from "@/components/ecommerce/ProductCard";
import RatingStar from "@/components/ecommerce/RatingStar";
import ProductDetailSkeleton, {
  ProductGridSkeleton,
} from "@/components/ecommerce/Skeletons";
import {
  ArrowRight,
  Headphones,
  Heart,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import React from "react";
const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On orders over $50",
  },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Dedicated support",
  },
  {
    icon: ShoppingBag,
    title: "Easy Returns",
    desc: "30-day guarantee",
  },
];
const Home = () => {
  return (
    <>
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Premium Products for Modern Living
            </h1>
            <p className="text-xl text-neutral-300 mb-8">
              Discover our curated collection of high-quality products
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-neutral-100">
                Shop Now <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
              <button className="border border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* features */}
      <section className="border-b py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div className="text-center" key={i}>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* categories */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Electronics", "Clothing", "Home", "Books"].map((cat) => (
              <div className="aspect-square bg-neutral-200 rounded-lg flex items-end p-6">
                <h3 className="text-white font-semibold text-lg">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* featured products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

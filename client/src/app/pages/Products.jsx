import ProductCard from "@/components/ecommerce/ProductCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
const categories = [
  { name: "All Products", count: 48 },
  { name: "Headphones", count: 12 },
  { name: "Speakers", count: 8 },
  { name: "Earbuds", count: 15 },
  { name: "Accessories", count: 13 },
];
const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <Card className={"border-2 border-black sticky top-4"}>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={cn(
                      `w-full text-left px-4 py-3 rounded-lg transition-all font-medium`,
                      selectedCategory === category.name
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span
                        className={cn(
                          "text-sm",
                          selectedCategory === category.name
                            ? "text-gray-300"
                            : "text-gray-500"
                        )}
                      >
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </aside>
          {/* {Products.length >= 1 ? (
            
          )} */}
          <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

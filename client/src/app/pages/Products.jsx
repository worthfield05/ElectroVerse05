import { getProducts } from "@/apis/product.api";
import PageTitle from "@/components/common/PageTitle";
import EmptyState from "@/components/ecommerce/EmptyState";
import PaginationList from "@/components/ecommerce/PaginationList";
import ProductCard from "@/components/ecommerce/ProductCard";
import { ProductGridSkeleton } from "@/components/ecommerce/Skeletons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProducts } from "@/hooks/useProduct";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
const categories = [
  { name: "All Products", count: 48 },
  { name: "Headphones", count: 12 },
  { name: "Speakers", count: 8 },
  { name: "Earbuds", count: 15 },
  { name: "Accessories", count: 13 },
];
const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") || 1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetProducts({
    keyword,
    page,
    category,
  });

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Something went wrong");
    }
  }, [isError, error]);
  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["products", keyword, page + 1, category],
        queryFn: () => {
          return getProducts({
            keyword,
            page: page + 1,
            category,
          });
        },
        staleTime: 1000 * 60 * 2,
      });
    }
  }, [page, keyword, category, totalPages]);
  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      prev.set("page", page);
      return prev;
    });
  };
  const handleCategoryChange = (category) => {
    if (category === "All Products") {
      setSearchParams();
      setSelectedCategory(category);
      return;
    }
    setSearchParams((prev) => {
      prev.set("category", category.toLowerCase());
      prev.set("page", 1);
      setSelectedCategory(category);
      return prev;
    });
  };

  return (
    <>
      <PageTitle title={"Products"} />

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
                      onClick={() => handleCategoryChange(category.name)}
                      key={category.name}
                      className={cn(
                        `w-full text-left px-4 py-3 rounded-lg transition-all font-medium`,
                        selectedCategory === category.name
                          ? "bg-black text-white"
                          : "hover:bg-gray-100",
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span
                          className={cn(
                            "text-sm",
                            selectedCategory === category.name
                              ? "text-gray-300"
                              : "text-gray-500",
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
            {isLoading ? (
              <ProductGridSkeleton />
            ) : products.length >= 1 ? (
              <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className=" w-full">
                <EmptyState type="search" />
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <PaginationList
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;

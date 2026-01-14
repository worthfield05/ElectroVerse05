import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className={"aspect-square gap-2"} />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className={"aspect-square rounded-lg"} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <Skeleton className={"h-8 w-3/4 mb-4"} />
            <Skeleton className={"h-4 w-full mb-2"} />
            <Skeleton className={"h-4 w-5/6"} />
          </div>
          <Skeleton className={"h-12 w-full"} />
          <Skeleton className={"h-12 w-full"} />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className={"h-4 w-full"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => {
        return (
          <div key={i} className="bg-white rounded-lg overflow-hidden border">
            <Skeleton className={"aspect-square"} />
            <div className="p-4 space-y-3">
              <Skeleton className={"h-3 w-16"} />
              <Skeleton className={"h-4 w-full"} />
              <Skeleton className={"h-4 w-3/4"} />
              <Skeleton className={"h-3 w-24"} />
              <Skeleton className={"h-5 w-20"} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

const ProductDetail = () => {
  const { product, reviews } = useLoaderData();
  return (
    <>
      <div className="bg-blue-300 mb-10">{JSON.stringify(product)}</div>
      <h1 className="mb-3">Reviews</h1>
      <Suspense fallback={<div>Loading review...</div>}>
        <Await resolve={reviews}>
          <div className="bg-amber-400">{(data) => console.log(data)}</div>
        </Await>
      </Suspense>
    </>
  );
};

export default ProductDetail;

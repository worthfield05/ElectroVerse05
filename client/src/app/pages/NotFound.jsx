import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-neutral-200 select-none">
            404
          </h1>
        </div>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-neutral-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might
          have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={"/"}>
            <Button size="lg">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <Link to={"/products"}>
            <Button size="lg" variant="outline">
              Browser Products
            </Button>
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-neutral-600 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to={"/products"} className="text-neutral-900 hover:underline">
              Products
            </Link>
            <Link to={"/orders"} className="text-neutral-900 hover:underline">
              Orders
            </Link>
            <Link to={"/profile"} className="text-neutral-900 hover:underline">
              Profile
            </Link>
            <Link to={"#"} className="text-neutral-900 hover:underline">
              Help Center
            </Link>
          </div>
        </div>
        <Button
          onClick={() => window.history.back()}
          className={
            "mt-8 inline-flex place-items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          }
        >
          <ArrowLeft className="w-4 h-4" />
          Go back to previous page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

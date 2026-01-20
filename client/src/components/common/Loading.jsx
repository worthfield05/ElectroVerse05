import { LoaderIcon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className={"size-4 animate-spin"}
      />
    </div>
  );
};

export default Loading;

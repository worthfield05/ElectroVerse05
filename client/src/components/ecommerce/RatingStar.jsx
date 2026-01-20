import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";

const RatingStar = ({
  rating,
  size = "default",
  interactive = false,
  showNumber,
  onChange,
}) => {
  const ratingSize = {
    default: "w-4 h-4",
    sm: "w-3 h-3",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };
  const starSize = ratingSize[size] || rating.default;
  const renderStar = (index) => {
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
    return (
      <div className="relative inline-block" key={index}>
        <Star className={cn(starSize, "text-n")} />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star className={cn(starSize, "text-yellow-400 fill-yellow-400")} />
        </div>
      </div>
    );
  };
  const stars = Array.from({ length: 5 }, (_, i) => renderStar(i));
  if (interactive) {
    return (
      <div className="inline-flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(i + 1)}
            className="hover:scale-110 transition-transform"
          >
            <Star
              className={cn(
                starSize,
                i < rating
                  ? "text-yellow-400 fill-yellow-500"
                  : "text-neutral-300 hover:text-yellow-200"
              )}
            />
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1">
      {stars}
      {showNumber && (
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default RatingStar;

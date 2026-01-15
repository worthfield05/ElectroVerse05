import React from "react";
import RatingStar from "./RatingStar";
import { ThumbsUp } from "lucide-react";

const ReviewList = () => {
  return (
    <div className="">
      <div className="text-2xl font-bold mb-6">Ratings & Reviews</div>
      <div className="bg-neutral-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">4.5</div>
            <RatingStar rating={4.5} size="lg" />
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-12">{rating} stars</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className=" h-full bg-yellow-400"
                    style={{ width: `${rating * 15}%` }}
                  />
                </div>
                <span className="text-sm text-neutral-600 w-12 text-right">
                  {rating * 10}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div className="bg-white rounded-lg border p-6" key={i}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-medium mb-1">Anish karki</div>
                <div className="flex items-center gap-2">
                  <RatingStar rating={5} size="sm" />
                  <span className="text-sm text-neutral-500">2 days ago</span>
                </div>
              </div>
            </div>
            <h4 className="font-semibold mb-2">Amazing quality</h4>
            <p className="text-neutral-700 mb-4">
              These headphones exceeded my expectations. The sound quality is
              incredible and they're super comfortable for long listening
              sessions.
            </p>
            <button className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg hover:bg-neutral-100">
              <ThumbsUp className="w-4 h-4" />
              Helpful (24)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;

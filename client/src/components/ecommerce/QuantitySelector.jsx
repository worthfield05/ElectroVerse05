import { Minus, Plus } from "lucide-react";
import React from "react";

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="inline-flex items-center gap-2 border rounded-lg p-1">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-2 hover:bg-neutral-100 rounded disabled:opacity-50"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <button onClick={onIncrease} className="p-2 hover:bg-neutral-100 rounded">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;

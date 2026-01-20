import React from "react";
import QuantitySelector from "./QuantitySelector";
import { Trash2 } from "lucide-react";

const CartItem = ({ item, quantity, onUpdate, onRemove }) => {
  return (
    <div className="flex gap-4 py-4 border-b last:border-0">
      <div className="w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden flex shrink-0">
        <img
          src={item?.image[0]?.url || ""}
          alt={item?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium mb-1 line-clamp-2">{item?.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => onUpdate(item?._id, quantity + 1)}
            onDecrease={() => onUpdate(item?._id, quantity - 1)}
          />
        </div>
      </div>
      <div className="text-right flex flex-col justify-between">
        <div className="font-semibold">Rs. {item?.price * quantity}</div>
        <button
          onClick={() => onRemove(item?._id)}
          className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

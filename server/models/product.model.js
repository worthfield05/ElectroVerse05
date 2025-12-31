import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter product price"],
      maxLength: [7, "Price cannot exceed 7 digits"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: [true, "Please Enter product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter product stock"],
      maxLength: 5,
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);

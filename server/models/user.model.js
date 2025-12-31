import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      validator: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password should not be less than 6 character"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = bcrypt.hashSync(this.password, 10);
  return;
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (plaintext) {
  return await bcrypt.compare(plaintext, this.password);
};
export default mongoose.model("User", userSchema);

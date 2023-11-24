import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 40,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    employeeId: {
      type: Number,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);

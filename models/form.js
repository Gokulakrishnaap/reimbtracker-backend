import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    employeeId: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bankacc: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Form = mongoose.model("Form", FormSchema);

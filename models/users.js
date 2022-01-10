import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      min: 8,
      max: 64,
    },
    secret: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    about: {},
    image: {
      url: String,
      public_id: String,
    },
    role: {
      type: String,
      enum: ["Candidate", "Recruiter"],
      default: "Candidate",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

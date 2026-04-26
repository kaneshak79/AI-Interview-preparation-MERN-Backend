import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question" }
    ],

    status: {
      type: String,
      enum: ["ongoing", "completed", "cancelled"],
      default: "ongoing"
    },

    score: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ["DSA", "HR", "System Design"]
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"]
    },
    keywords: {
      type: [String],
      required: true
    },
    idealAnswer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);

// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema(
//   {
//     question: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     // ✅ HIGH LEVEL
//     category: {
//       type: String,
//       required: true,
//       enum: ["DSA", "HR", "System Design"]
//     },

//     // ✅ SUB LEVEL
//     topic: {
//       type: String,
//       required: true,
//       enum: ["Technical", "HR","Behavioural","Managerial"]
//     },

//     difficulty: {
//       type: String,
//       required: true,
//       enum: ["easy", "medium", "hard"]
//     },

//     keywords: {
//       type: [String],
//       required: true
//     },

//     idealAnswer: {
//       type: String,
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Question", questionSchema);
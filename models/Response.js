// import mongoose from "mongoose";

// const responseSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },
//     interview: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Interview",
//       required: true
//     },
//     // question: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "Question",
//     //   required: true
//     // },
//     question: {
//   type: String,
//   required: true
// }
//     answer: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     score: {
//       type: Number,
//       default: 0
//     },
//     feedback: {
//       strengths: [String],
//       weaknesses: [String]
//     }
//   },
//   { timestamps: true }
// );

// // prevent duplicate answers
// responseSchema.index(
//   { user: 1, interview: 1, question: 1 },
//   { unique: true }
// );

// export default mongoose.model("Response", responseSchema);


import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true
    },

    // ✅ FIXED: now string-based question
    question: {
      type: String,
      required: true
    },

    answer: {
      type: String,
      required: true,
      trim: true
    },

    score: {
      type: Number,
      default: 0
    },

    feedback: {
      strengths: [String],
      weaknesses: [String]
    },
    idealAnswer: {
  type: String,
  default: ""
}
  },
  { timestamps: true }
);

// prevent duplicate answers
responseSchema.index(
  { user: 1, interview: 1, question: 1 },
  // { unique: true }
);

export default mongoose.model("Response", responseSchema);
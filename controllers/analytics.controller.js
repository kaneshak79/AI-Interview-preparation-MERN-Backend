import Response from "../models/Response.js";
import Interview from "../models/Interview.js";
import Question from "../models/Question.js";
import mongoose from "mongoose";

// 26) OVERALL PERFORMANCE
export const overall = async (req, res) => {
//   const data = await Response.aggregate([
//     { $match: { user: req.user._id } },
//     {
//       $group: {
//         _id: null,
//         avgScore: { $avg: "$score" },
//         totalAnswers: { $sum: 1 }
//       }
//     }
//   ]);
const data = await Response.aggregate([
  {
    $match: {
      user: new mongoose.Types.ObjectId(req.user.id)
    }
  },
  {
    $group: {
      _id: null,
      avgScore: { $avg: "$score" },
      totalAnswers: { $sum: 1 }
    }
  }
]);

  res.json(data[0] || { avgScore: 0, totalAnswers: 0 });
};


// 27) CATEGORY-WISE PERFORMANCE

// export const categoryWise = async (req, res) => {
//   const data = await Response.aggregate([
//     // { $match: { user: req.user._id } },
// {$match: {
//   user: new mongoose.Types.ObjectId(req.user.id)
// } },
//     {
//       $lookup: {
//         from: "questions",
//         localField: "question",
//         foreignField: "_id",
//         as: "q"
//       }
//     },
//     { $unwind: "$q" },

//     {
//       $group: {
//         _id: "$q.category",
//         avgScore: { $avg: "$score" }
//       }
//     }
//   ]);

//   res.json(data);
// };


// // 28) WEAK TOPICS
// export const weakTopics = async (req, res) => {
//   const data = await Response.aggregate([
//     // { $match: { user: req.user._id } },
// {$match: {
//   user: new mongoose.Types.ObjectId(req.user.id)
// } },
//     {
//       $lookup: {
//         from: "questions",
//         localField: "question",
//         foreignField: "_id",
//         as: "q"
//       }
//     },
//     { $unwind: "$q" },

//     {
//       $group: {
//         _id: "$q.category",
//         avgScore: { $avg: "$score" }
//       }
//     },

//     { $sort: { avgScore: 1 } } // lowest = weakest
//   ]);

//   res.json(data);
// };


// 29) PROGRESS OVER TIME
export const progress = async (req, res) => {
  const data = await Response.aggregate([
    // { $match: { user: req.user._id } },
{$match: {
  user: new mongoose.Types.ObjectId(req.user.id)
} },

    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        avgScore: { $avg: "$score" }
      }
    },

    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  res.json(data);
};


// 30) LATEST INTERVIEW SCORE

// export const latestScore = async (req, res) => {
//   const interview = await Interview.findOne({ user: req.user.id })
//     .sort({ createdAt: -1 });

//   if (!interview)
//     return res.json({ score: 0 });

//   res.json({
//     score: interview.score,
//     status: interview.status
//   });
// };

export const latestScore = async (req, res) => {
  const interview = await Interview.findOne({
    user: req.user.id,
    status: "completed"   // 🔥 FIX
  }).sort({ createdAt: -1 });

  if (!interview)
    return res.json({ score: 0 });

  res.json({
    score: interview.score,
    status: interview.status
  });
};


// export const categoryWise = async (req, res) => {
//   const data = await Response.aggregate([
//     {
//       $match: {
//         user: new mongoose.Types.ObjectId(req.user.id)
//       }
//     },
//     {
//       $lookup: {
//         from: "questions",
//         localField: "question",
//         foreignField: "_id",
//         as: "q"
//       }
//     },
//     { $unwind: "$q" },

//     {
//       $group: {
//         _id: "$q.category",   // ✅ Technical / HR
//         avgScore: { $avg: "$score" },
//         count: { $sum: 1 }    // ✅ add attempts
//       }
//     },

//     {
//       $match: { count: { $gte: 2 } } // ✅ avoid fake 100%
//     },

//     {
//       $sort: { avgScore: -1 }
//     }
//   ]);

//   res.json(data);
// };

// export const weakTopics = async (req, res) => {
//   const data = await Response.aggregate([
//     {
//       $match: {
//         user: new mongoose.Types.ObjectId(req.user.id)
//       }
//     },
//     {
//       $lookup: {
//         from: "questions",
//         localField: "question",
//         foreignField: "_id",
//         as: "q"
//       }
//     },
//     { $unwind: "$q" },

//     {
//       $group: {
//         _id: "$q.category", // ✅ FIXED
//         avgScore: { $avg: "$score" }
//       }
//     },

//     { $sort: { avgScore: 1 } },
//     { $limit: 3 }
//   ]);

//   res.json(data);
// };

export const categoryWise = async (req, res) => {
  const data = await Response.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user.id)
      }
    },
    {
      $lookup: {
        from: "questions",
        localField: "question",
        foreignField: "_id",
        as: "q"
      }
    },
    { $unwind: "$q" },

    {
      $group: {
        _id: "$q.category",
        avgScore: { $avg: "$score" }
      }
    },

    { $sort: { avgScore: -1 } }
  ]);

  res.json(data);
};

export const weakTopics = async (req, res) => {
  const data = await Response.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user.id)
      }
    },
    {
      $lookup: {
        from: "questions",
        localField: "question",
        foreignField: "_id",
        as: "q"
      }
    },
    { $unwind: "$q" },

    {
      $group: {
        _id: "$q.category"
,
        avgScore: { $avg: "$score" }
      }
    },

    { $sort: { avgScore: 1 } },
    { $limit: 3 }
  ]);

  res.json(data);
};
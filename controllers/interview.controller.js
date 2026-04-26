import Interview from "../models/Interview.js";
import Question from "../models/Question.js";
import Response from "../models/Response.js";


// 15) START INTERVIEW
// export const start = async (req, res) => {
//   const { category, difficulty } = req.body;

//   const filter = {};
//   if (category) filter.category = category;
//   if (difficulty) filter.difficulty = difficulty;

//   const questions = await Question.aggregate([
//     { $match: filter },
//     { $sample: { size: 5 } }
//   ]);

//   if (questions.length === 0)
//     return res.status(400).json({ msg: "No questions found" });

//   const interview = await Interview.create({
//     user: req.user.id,
//     questions: questions.map(q => q._id)
//   });

//   res.json({ interview, questions });
// };

// export const start = async (req, res) => {
//   const { category, difficulty } = req.body;

//   const filter = {};

//   if (category) {
//     filter.category = { $regex: new RegExp(`^${category}$`, "i") };
//   }

//   if (difficulty) {
//     filter.difficulty = { $regex: new RegExp(`^${difficulty}$`, "i") };
//   }

//   const questions = await Question.aggregate([
//     { $match: filter },
//     { $sample: { size: 5 } }
//   ]);

//   if (questions.length === 0)
//     return res.status(400).json({ msg: "No questions found" });

//   const interview = await Interview.create({
//     user: req.user.id,
//     questions: questions.map(q => q._id)
//   });

//   res.json({ interview, questions });
// };

//before code crt

// export const start = async (req, res) => {
//   try {
//     console.log("START API HIT");

//     const { role, difficulty, jobDesc } = req.body;

//     if (!role || !difficulty) {
//       return res.status(400).json({ msg: "Role & difficulty required" });
//     }

//     const response = await fetch(
//       "http://localhost:5000/api/ai/generate",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           role,
//           jobDesc,
//           difficulty,
//         }),
//       }
//     );

//     const data = await response.json();

//     console.log("AI RESPONSE:", data);

//     if (!Array.isArray(data.questions)) {
//       return res.status(500).json({ msg: "AI failed to generate questions" });
//     }

//     return res.json({
//       interview: {
//         user: req.user.id,
//         role,
//         difficulty,
//       },
//       questions: data.questions,
//     });
//   } catch (err) {
//     console.log("START ERROR:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };


export const start = async (req, res) => {
  try {
    const { role, difficulty, jobDesc } = req.body;

    const response = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, jobDesc, difficulty }),
    });

    const data = await response.json();

    if (!Array.isArray(data.questions)) {
      return res.status(500).json({ msg: "AI failed to generate questions" });
    }

    // ✅ CREATE OUTSIDE ANY BLOCK
    const interview = await Interview.create({
      user: req.user.id,
      role,
      difficulty,
      status: "ongoing",
      score: 0,
    });

    return res.json({
      interview: {
        id: interview._id,   // ✅ SAFE NOW
        role,
        difficulty,
      },
      questions: data.questions,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// 16) GET BY ID (WITH SECURITY)
export const getById = async (req, res) => {
  const interview = await Interview.findById(req.params.id)
    .populate("questions");

  if (!interview)
    return res.status(404).json({ msg: "Interview not found" });

  if (interview.user.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  res.json(interview);
};


// 17) GET ALL (WITH PAGINATION)
export const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const interviews = await Interview.find({ user: req.user.id })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  res.json(interviews);
};


// 19) COMPLETE INTERVIEW (WITH SCORE CALC)
export const complete = async (req, res) => {
  const interview = await Interview.findById(req.params.id);

  if (!interview)
    return res.status(404).json({ msg: "Interview not found" });

  if (interview.user.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  if (interview.status === "completed")
    return res.status(400).json({ msg: "Already completed" });

  const responses = await Response.find({
    interview: interview._id
  });

  const total =
    responses.reduce((acc, r) => acc + r.score, 0) /
    (responses.length || 1);

  interview.status = "completed";
  interview.score = total;

  await interview.save();

  res.json(interview);
};


// 20) CANCEL INTERVIEW
export const cancel = async (req, res) => {
  const interview = await Interview.findById(req.params.id);

  if (!interview)
    return res.status(404).json({ msg: "Interview not found" });

  if (interview.user.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  interview.status = "cancelled";
  await interview.save();

  res.json({ msg: "Interview cancelled" });
};


// export const submitAnswers = async (req, res) => {
//   try {
//     const { interviewId, answers } = req.body;

//     console.log("BODY:", req.body);

//     if (!Array.isArray(answers)) {
//       return res.status(400).json({ msg: "Answers must be array" });
//     }

//     const interview = await Interview.findById(interviewId);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     let totalScore = 0;

//     for (let item of answers) {
//       console.log("Checking:", item);

//       const aiRes = await fetch("http://localhost:5000/api/ai/evaluate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: item.question,
//           answer: item.answer
//         })
//       });

//       const result = await aiRes.json();
//       console.log("AI RESULT:", result);

//       if (!result || result.score == null) {
//         continue; // avoid crash
//       }

//       await Response.create({
//         interview: interviewId,
//         question: item.question,
//         answer: item.answer,
//         score: result.score,
//         feedback: result.feedback
//       });

//       totalScore += result.score;
//     }

//     const finalScore = answers.length ? totalScore / answers.length : 0;

//     interview.score = finalScore;
//     interview.status = "completed";

//     await interview.save();

//     return res.json({
//       msg: "Interview completed",
//       score: finalScore
//     });

//   } catch (err) {
//     console.log("FULL ERROR:", err);

//     return res.status(500).json({
//       msg: "Error submitting answers",
//       error: err.message
//     });
//   }
// };



// import Interview from "../models/Interview.js";
// import Response from "../models/Response.js";

// // ===============================
// // 1️⃣ START INTERVIEW
// // ===============================

// export const start = async (req, res) => {
//   try {
//     const { role, difficulty, jobDesc } = req.body;

//     const response = await fetch("http://localhost:5000/api/ai/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ role, jobDesc, difficulty }),
//     });

//     const data = await response.json();

//     if (!Array.isArray(data.questions)) {
//       return res.status(500).json({ msg: "AI failed to generate questions" });
//     }

//     const interview = await Interview.create({
//       user: req.user.id,
//       role,
//       difficulty,
//       questions: data.questions,   // ✅ now valid
//       status: "ongoing",
//       score: 0,
//     });

//     return res.json({
//       interview: {
//         id: interview._id,
//         role,
//         difficulty,
//       },
//       questions: data.questions,
//     });

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };


// // export const start = async (req, res) => {
// //   try {
// //     const { role, difficulty, jobDesc } = req.body;

// //     if (!role || !difficulty) {
// //       return res.status(400).json({ msg: "Role and difficulty required" });
// //     }

// //     // 🔥 Generate questions from AI service
// //     const response = await fetch("http://localhost:5000/api/ai/generate", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ role, jobDesc, difficulty }),
// //     });

// //     const data = await response.json();

// //     if (!Array.isArray(data.questions)) {
// //       return res.status(500).json({ msg: "AI failed to generate questions" });
// //     }

// //     // 🔥 Create interview in DB
// //     const interview = await Interview.create({
// //       user: req.user.id,
// //       role,
// //       difficulty,
// //       status: "ongoing",
// //       score: 0,
// //       questions: data.questions, // store questions
// //     });

// //     return res.json({
// //       interview: {
// //         id: interview._id,
// //         role: interview.role,
// //         difficulty: interview.difficulty,
// //         status: interview.status,
// //       },
// //       questions: data.questions,
// //     });

// //   } catch (err) {
// //     console.log("START ERROR:", err);
// //     return res.status(500).json({ msg: "Server error" });
// //   }
// // };

// // ===============================
// // 2️⃣ GET INTERVIEW BY ID
// // ===============================
// export const getById = async (req, res) => {
//   try {
//     const interview = await Interview.findById(req.params.id);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     if (interview.user.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }

//     res.json(interview);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ===============================
// // 3️⃣ GET ALL INTERVIEWS
// // ===============================
// export const getAll = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     const interviews = await Interview.find({ user: req.user.id })
//       .skip((page - 1) * limit)
//       .limit(Number(limit))
//       .sort({ createdAt: -1 });

//     res.json(interviews);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ===============================
// // 4️⃣ COMPLETE INTERVIEW (FINAL SCORE)
// // ===============================
// export const complete = async (req, res) => {
//   try {
//     const interview = await Interview.findById(req.params.id);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     if (interview.user.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }

//     if (interview.status === "completed") {
//       return res.status(400).json({ msg: "Already completed" });
//     }

//     // get all responses
//     const responses = await Response.find({
//       interview: interview._id,
//     });

//     // calculate average score
//     const totalScore =
//       responses.reduce((acc, r) => acc + (r.score || 0), 0) /
//       (responses.length || 1);

//     interview.status = "completed";
//     interview.score = totalScore;

//     await interview.save();

//     res.json({
//       msg: "Interview completed",
//       interviewId: interview._id,
//       score: totalScore,
//       totalAnswers: responses.length,
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ===============================
// // 5️⃣ CANCEL INTERVIEW
// // ===============================
// export const cancel = async (req, res) => {
//   try {
//     const interview = await Interview.findById(req.params.id);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     if (interview.user.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }

//     interview.status = "cancelled";
//     await interview.save();

//     res.json({ msg: "Interview cancelled" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };
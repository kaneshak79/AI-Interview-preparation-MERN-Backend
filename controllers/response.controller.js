import Response from "../models/Response.js";
import Question from "../models/Question.js";
import Interview from "../models/Interview.js";
import { evaluate } from "../services/evaluation.service.js";


// SUBMIT ANSWER

// export const submit = async (req, res) => {
//   const { questionId, answer, interviewId } = req.body;

//   if (!answer)
//     return res.status(400).json({ msg: "Answer is required" });

//   const question = await Question.findById(questionId);
//   if (!question)
//     return res.status(404).json({ msg: "Question not found" });

//   const interview = await Interview.findById(interviewId);
//   if (!interview)
//     return res.status(404).json({ msg: "Interview not found" });

//   // 🔐 SECURITY CHECK
//   if (interview.user.toString() !== req.user.id)
//     return res.status(403).json({ msg: "Not authorized" });

//   // ❌ prevent duplicate submission
//   const existing = await Response.findOne({
//     user: req.user.id,
//     interview: interviewId,
//     question: questionId
//   });

//   if (existing)
//     return res.status(400).json({ msg: "Already answered" });

//   // 🧠 evaluation
//   const result = evaluate(answer, question.keywords);

//   const response = await Response.create({
//     user: req.user.id,
//     interview: interviewId,
//     question: questionId,
//     answer,
//     score: result.score,
//     feedback: {
//       strengths: result.strengths,
//       weaknesses: result.weaknesses
//     }
//   });

//   res.json(response);
// };

// export const submitAnswers = async (req, res) => {
//   try {
//     const { interviewId, answers } = req.body;

//     if (!Array.isArray(answers)) {
//       return res.status(400).json({ msg: "Answers must be array" });
//     }

//     const interview = await Interview.findById(interviewId);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     if (interview.user.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }

//     let totalScore = 0;

//     for (let item of answers) {
//       const aiRes = await fetch("http://localhost:5000/api/ai/evaluate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: item.question,
//           answer: item.answer
//         })
//       });

//       const result = await aiRes.json();

//       if (!result || result.score == null) continue;

//       await Response.create({
//         user: req.user.id,          // ✅ FIX 1 (MANDATORY)
//         interview: interviewId,
//         question: item.question,    // ✅ STRING now works
//         answer: item.answer,
//         score: result.score,
//         feedback: result.feedback
//       });

//       totalScore += result.score;
//     }

//     const finalScore = answers.length
//       ? totalScore / answers.length
//       : 0;

//     interview.score = finalScore;
//     interview.status = "completed";

//     await interview.save();

//     return res.json({
//       msg: "Interview completed",
//       score: finalScore
//     });

//   } catch (err) {
//     console.log(err);

//     return res.status(500).json({
//       msg: "Error submitting answers",
//       error: err.message
//     });
//   }
// };

//before cide crt



// final crt code success in postamn above


// export const submitAnswers = async (req, res) => {
//   try {
//     const { interviewId, answers } = req.body;

//     const interview = await Interview.findById(interviewId);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     let totalScore = 0;
//     const responseList = [];

//     for (let item of answers) {
//       const aiRes = await fetch("http://localhost:5000/api/ai/evaluate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: item.question,
//           answer: item.answer,
//         }),
//       });

//       const result = await aiRes.json();

//       const responseData = {
//         user: req.user.id,
//         interview: interviewId,
//         question: item.question,
//         answer: item.answer,
//         score: result.score || 0,
//         feedback: result.feedback || {},
//         idealAnswer: result.idealAnswer || "Not available",
//       };

//       await Response.create(responseData);

//       responseList.push(responseData);
//       totalScore += result.score || 0;
//     }

//     const finalScore = answers.length
//       ? totalScore / answers.length
//       : 0;

//     interview.score = finalScore;
//     interview.status = "completed";
//     await interview.save();

//     return res.json({
//       msg: "Interview completed",
//       score: finalScore,
//       responses: responseList,
//     });

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       msg: "Error submitting answers",
//       error: err.message,
//     });
//   }
// };

// import Response from "../models/Response.js";
// import { evaluateAnswer } from "./aiController.js";


// export const submitAnswers = async (req, res) => {
//   try {

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ msg: "Unauthorized user" });
//     }

//     const { interviewId, answers } = req.body;

//     const interview = await Interview.findById(interviewId);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     let totalScore = 0;
//     const results = [];

//     for (let item of answers) {

//       // 🔥 TEMP TEST (remove AI issue first)
//       const result = {
//         score: 7,
//         feedback: {
//           strengths: "Good structure",
//           weaknesses: "Add more examples"
//         },
//         idealAnswer: "Well structured answer with examples"
//       };

//       const saved = await Response.create({
//         user: req.user.id,
//         interview: interviewId,
//         question: item.question,
//         answer: item.answer,
//         score: result.score,
//         feedback: result.feedback,
//         idealAnswer: result.idealAnswer
//       });

//       results.push(saved);
//       totalScore += result.score;
//     }

//     interview.score = totalScore / answers.length;
//     interview.status = "completed";
//     await interview.save();

//     return res.json({
//       msg: "Interview completed",
//       score: interview.score,
//       responses: results
//     });

//   } catch (err) {
//     console.log("SUBMIT ERROR FULL:", err);

//     return res.status(500).json({
//       msg: "Submit failed",
//       error: err.message
//     });
//   }
// };

// export const submitAnswers = async (req, res) => {
//   try {
//     const { interviewId, answers } = req.body;

//     if (!req.user?.id) {
//       return res.status(401).json({ msg: "Unauthorized user" });
//     }

//     const interview = await Interview.findById(interviewId);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     let totalScore = 0;
//     const results = [];

//     for (let item of answers) {

//       // 🔥 prevent duplicate insert crash
//       const exists = await Response.findOne({
//         user: req.user.id,
//         interview: interviewId,
//         question: item.question
//       });

//       if (exists) continue;

//       const result = {
//         score: 7,
//         feedback: {
//           strengths: "Good structure",
//           weaknesses: "Add more examples"
//         },
//         idealAnswer: "Well structured answer with examples"
//       };

//       // const saved = await Response.create({
//       //   user: req.user.id,
//       //   interview: interviewId,
//       //   question: item.question,
//       //   answer: item.answer,
//       //   score: result.score,
//       //   feedback: result.feedback,
//       //   idealAnswer: result.idealAnswer
//       // });

//       const saved = await Response.create({
//   user: req.user.id,
//   interview: interviewId,
//   question: item.question,
//   answer: item.answer,
//   score: result.score,

//   // ✅ FORCE STRUCTURED FEEDBACK
//   feedback: {
//     strengths: result.feedback?.strengths || "Not provided",
//     weaknesses: result.feedback?.weaknesses || "Not provided"
//   },

//   idealAnswer: result.idealAnswer || "Not available"
// });

//       results.push(saved);
//       totalScore += result.score;
//     }

//     interview.score = totalScore / answers.length;
//     interview.status = "completed";
//     await interview.save();

//     return res.json({
//       msg: "Interview completed",
//       score: interview.score,
//       responses: results
//     });

//   } catch (err) {
//     console.log(err);

//     return res.status(500).json({
//       msg: "Submit failed",
//       error: err.message
//     });
//   }
// };

// export const submitAnswers = async (req, res) => {
//   try {
//     const { interviewId, answers } = req.body;

//     console.log("ANSWERS RECEIVED:", answers); // DEBUG

//     if (!Array.isArray(answers) || answers.length === 0) {
//       return res.status(400).json({
//         msg: "No answers received from frontend",
//       });
//     }

//     const interview = await Interview.findById(interviewId);

//     if (!interview) {
//       return res.status(404).json({ msg: "Interview not found" });
//     }

//     let totalScore = 0;
//     const results = [];

//     for (let item of answers) {

//       const result = {
//         score: 7,
//         feedback: {
//           strengths: "Good attempt",
//           weaknesses: "Add more depth"
//         },
//         idealAnswer: "Structured answer with explanation and examples"
//       };

//       const saved = await Response.create({
//         user: req.user.id,
//         interview: interviewId,
//         question: item.question,
//         answer: item.answer,
//         score: result.score,

//         feedback: {
//           strengths: result.feedback.strengths,
//           weaknesses: result.feedback.weaknesses,
//         },

//         idealAnswer: result.idealAnswer,
//       });

//       results.push(saved);
//       totalScore += result.score;
//     }

//     const finalScore = totalScore / answers.length;

//     interview.score = finalScore;
//     interview.status = "completed";
//     await interview.save();

//     return res.json({
//       msg: "Interview completed",
//       score: finalScore,
//       responses: results,
//     });

//   } catch (err) {
//     console.log("SUBMIT ERROR:", err);

//     return res.status(500).json({
//       msg: "Submit failed",
//       error: err.message,
//     });
//   }
// };

export const submitAnswers = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized user" });
    }

    const { interviewId, answers } = req.body;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ msg: "Interview not found" });
    }

    let totalScore = 0;
    const results = [];

    // for (let item of answers) {

    //   // ✅ REAL AI CALL
    //   const aiRes = await fetch("http://localhost:5000/api/ai/evaluate", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       question: item.question,
    //       answer: item.answer
    //     })
    //   });

    //   const result = await aiRes.json();

    //   console.log("AI RESULT:", result);

    //   // safety check
    //   if (!result || result.score == null) continue;

    //   const saved = await Response.create({
    //     user: req.user.id,
    //     interview: interviewId,
    //     question: item.question,
    //     answer: item.answer,
    //     score: result.score,
    //     feedback: result.feedback,
    //     idealAnswer: result.idealAnswer
    //   });

    //   results.push(saved);
    //   totalScore += result.score;
    // }

    
for (let item of answers) {

  const aiRes = await fetch("http://localhost:5000/api/ai/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: item.question,
      answer: item.answer
    })
  });

  const result = await aiRes.json();

  const saved = await Response.create({
    user: req.user.id,
    interview: interviewId,
    question: item.question,
    answer: item.answer,
    score: result.score || 0,

    feedback: {
      strengths: result.feedback?.strengths || [],
      weaknesses: result.feedback?.weaknesses || []
    },

    idealAnswer: result.idealAnswer || ""
  });

  results.push(saved);
  totalScore += result.score || 0;
}


    const finalScore = answers.length
      ? totalScore / answers.length
      : 0;

    interview.score = finalScore;
    interview.status = "completed";

    await interview.save();

    return res.json({
      msg: "Interview completed",
      score: finalScore,
      responses: results
    });

  } catch (err) {
    console.log("SUBMIT ERROR:", err);

    return res.status(500).json({
      msg: "Submit failed",
      error: err.message
    });
  }
};




// GET RESPONSES BY INTERVIEW (WITH SECURITY)
export const getByInterview = async (req, res) => {
  const responses = await Response.find({
    interview: req.params.id,
    user: req.user.id
  }).populate("question");

  res.json(responses);
};


// ADMIN - GET ALL
export const getAll = async (req, res) => {
  const responses = await Response.find()
    .populate("user")
    .populate("question");

  res.json(responses);
};







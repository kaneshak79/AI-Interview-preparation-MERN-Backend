import Response from "../models/Response.js";
import Question from "../models/Question.js";
import Interview from "../models/Interview.js";
import { evaluate } from "../services/evaluation.service.js";


// SUBMIT ANSWER

//before cide crt

// final crt code success in postamn above

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








// // //     });
// // //   }
// // // };

// // // export const generateAIQuestions = async (req, res) => {
// //     // export const generateQuestions = async (req, res) => {


//     //crt code below


import fetch from "node-fetch";

export const generateQuestions = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    const prompt = `Generate 5 ${difficulty} interview questions for ${role}. Return only questions.`;

    const response = await fetch(
      "https://devtoolbox-api.devtoolbox-api.workers.dev/ai/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt
        })
      }
    );

    const data = await response.json();

    console.log("AI:", data);

    // const text = data.result;
    const text = data.response;

    if (!text) {
      return res.status(500).json({
        error: "No text from AI",
        debug: data
      });
    }

    const questions = text
      .split("\n")
      .filter(q => q.trim());

    res.json({ questions });

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
};




// import fetch from "node-fetch";

import axios from "axios";

//     return res.status(500).json({ msg: "AI error" });
//   }
// };

export const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
You are a strict interview evaluator.

Return ONLY valid JSON.

Question: ${question}
Candidate Answer: ${answer}

Rules:
- Score 0 to 10
- Give REAL evaluation based on answer correctness
- If answer is wrong, explain why
- Provide correct ideal answer

Return format ONLY:

{
  "score": number,
  "feedback": {
    "strengths": ["..."],
    "weaknesses": ["..."]
  },
  "idealAnswer": "correct and complete answer"
}
`;

    const response = await fetch(
      "https://devtoolbox-api.devtoolbox-api.workers.dev/ai/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    const data = await response.json();
    let text = data.response || data.result;

    if (!text) {
      return res.json({
        score: 5,
        feedback: {
          strengths: ["Answer attempted"],
          weaknesses: ["No AI response"]
        },
        idealAnswer: "Not available"
      });
    }

    // clean AI response
    text = text.replace(/```json|```/g, "").trim();

    let result;

    try {
      result = JSON.parse(text);
    } catch (e) {
      result = {
        score: 5,
        feedback: {
          strengths: ["Partial understanding"],
          weaknesses: ["Could not parse AI response"]
        },
        idealAnswer: "Structured correct answer needed"
      };
    }

    return res.json(result);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "AI error" });
  }
};

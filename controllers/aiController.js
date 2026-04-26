// // // // // // import OpenAI from "openai";

// // // // // // const openai = new OpenAI({
// // // // // //   apiKey: process.env.OPENAI_API_KEY,
// // // // // // });

// // // // // // export const generateQuestions = async (req, res) => {
// // // // // //   try {
// // // // // //     const { role, jobDesc, difficulty } = req.body;

// // // // // //     const prompt = `
// // // // // //     Generate 5 ${difficulty} interview questions for a ${role}.
// // // // // //     Job description: ${jobDesc}
// // // // // //     Return as JSON array.
// // // // // //     `;

// // // // // //     const response = await openai.chat.completions.create({
// // // // // //       model: "gpt-4o-mini",
// // // // // //       messages: [{ role: "user", content: prompt }],
// // // // // //     });

// // // // // //     const text = response.choices[0].message.content;

// // // // // //     res.json({ questions: text });

// // // // // //   } catch (err) {
// // // // // //     console.log(err);
// // // // // //     res.status(500).json({ error: "AI failed" });
// // // // // //   }
// // // // // // };

// // // // // import fetch from "node-fetch";

// // // // // export const generateQuestions = async (req, res) => {
// // // // //   try {
// // // // //     const { role, jobDesc, difficulty } = req.body;

// // // // //     const prompt = `
// // // // //     Generate 5 ${difficulty} interview questions for ${role}.
// // // // //     Job description: ${jobDesc}
// // // // //     Return ONLY array format.
// // // // //     `;

// // // // //     const response = await fetch(
// // // // //     //   `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
// // // // //     // `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
// // // // //     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
// // // // //       {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           contents: [{ parts: [{ text: prompt }] }]
// // // // //         })
// // // // //       }
// // // // //     );

// // // // //     // const data = await response.json();
// // // // //     const raw = await response.text();
// // // // // console.log("🔥 GEMINI RAW RESPONSE:", raw);
// // // // // console.log("STATUS:", response.status);

// // // // // let data;
// // // // // try {
// // // // //   data = JSON.parse(raw);
// // // // // } catch (e) {
// // // // //   return res.status(500).json({ error: "Invalid JSON from Gemini" });
// // // // // }

// // // // //     // const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

// // // // //     // res.json({ questions: text });

// // // // //     const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

// // // // // if (!text) {
// // // // //   return res.status(500).json({ error: "No text from AI" });
// // // // // }

// // // // // // 🔥 CLEAN + PARSE
// // // // // const cleaned = text.replace(/```json|```/g, "").trim();

// // // // // let questions;
// // // // // try {
// // // // //   questions = JSON.parse(cleaned);
// // // // // } catch (e) {
// // // // //   console.log("❌ PARSE ERROR TEXT:", cleaned);
// // // // //   return res.status(500).json({ error: "Invalid JSON from AI" });
// // // // // }

// // // // // res.json({ questions });

// // // // //   }
// // // // // //    catch (err) {
// // // // // //     console.log(err);
// // // // // //     res.status(500).json({ error: "AI failed" });
// // // // // //   }

// // // // // catch (err) {
// // // // //   console.log("❌ FULL ERROR:", err);
// // // // //   console.log("❌ RESPONSE:", err.response?.data);

// // // // //   alert(
// // // // //     err.response?.data?.msg ||
// // // // //     err.response?.data?.error ||
// // // // //     "Failed to start interview"
// // // // //   );
// // // // // }

// // // // // };


// // // // // // export const generateQuestions = async (req, res) => {
// // // // // //   try {
// // // // // //     const { role, category, jobDesc, difficulty } = req.body;

// // // // // //    const prompt = `
// // // // // // You are an expert ${category} interviewer.

// // // // // // Generate exactly 5 interview questions.

// // // // // // Rules:
// // // // // // - Focus on ${category} questions
// // // // // // - Role: ${role}
// // // // // // - Difficulty: ${difficulty}
// // // // // // - No explanations
// // // // // // - No numbering

// // // // // // Return ONLY valid JSON array:
// // // // // // ["Q1","Q2","Q3","Q4","Q5"]
// // // // // // `;

// // // // // //     // const response = await fetch(
// // // // // //     //   `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
// // // // // //     //   {
// // // // // //     //     method: "POST",
// // // // // //     //     headers: { "Content-Type": "application/json" },
// // // // // //     //     body: JSON.stringify({
// // // // // //     //       contents: [{ parts: [{ text: prompt }] }],
// // // // // //     //     }),
// // // // // //     //   }
// // // // // //     // );

// // // // // //     const response = await fetch(
// // // // // //   `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
// // // // // //   {
// // // // // //     method: "POST",
// // // // // //     headers: { "Content-Type": "application/json" },
// // // // // //     body: JSON.stringify({
// // // // // //       contents: [
// // // // // //         {
// // // // // //           role: "user",
// // // // // //           parts: [{ text: prompt }]
// // // // // //         }
// // // // // //       ]
// // // // // //     })
// // // // // //   }
// // // // // // );
 
   

// // // // // //     const data = await response.json();

// // // // // //     // if (!response.ok || data.error) {
// // // // // //     //   console.log("GEMINI ERROR:", data);
// // // // // //     //   return res.status(500).json({ error: "Gemini API failed" });
// // // // // //     // }

// // // // // //     if (!response.ok || data.error) {
// // // // // //   console.log("❌ GEMINI FULL ERROR:", JSON.stringify(data, null, 2));
// // // // // //   return res.status(500).json({
// // // // // //     error: "Gemini API failed",
// // // // // //     details: data
// // // // // //   });
// // // // // // }

// // // // // //     const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

// // // // // //     if (!text) {
// // // // // //       return res.status(500).json({ error: "Empty AI response" });
// // // // // //     }

// // // // // //     let questions;

// // // // // //     try {
// // // // // //       const cleaned = text.replace(/```json|```/g, "").trim();

// // // // // //       const match = cleaned.match(/\[[\s\S]*\]/);

// // // // // //       questions = JSON.parse(match ? match[0] : cleaned);
// // // // // //     } catch (e) {
// // // // // //       console.log("PARSE ERROR:", text);
// // // // // //       return res.status(500).json({ error: "Invalid JSON from AI" });
// // // // // //     }

// // // // // //     return res.json({ questions });
// // // // // //   } catch (err) {
// // // // // //     console.log("AI ERROR:", err);
// // // // // //     res.status(500).json({ error: "AI failed" });
// // // // // //   }
// // // // // // };

// // // // import fetch from "node-fetch";
// // // // import dotenv from "dotenv";

// // // // dotenv.config();

// // // // export const generateQuestions = async (req, res) => {
// // // //   try {
// // // //     const { role, jobDesc, difficulty } = req.body;

// // // //     console.log("🔑 GEMINI KEY:", process.env.GEMINI_KEY); // debug

// // // //     // const prompt = `
// // // //     // Generate 5 ${difficulty} interview questions for ${role}.
// // // //     // Job description: ${jobDesc}
// // // //     // Return ONLY array format.
// // // //     // `;

// // // //     const prompt = `
// // // // Generate exactly 5 ${difficulty} interview questions for the role of ${role}.

// // // // Job description:
// // // // ${jobDesc}

// // // // Return response STRICTLY in this JSON format:
// // // // ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]

// // // // Do not add explanation.
// // // // Do not add markdown.
// // // // Do not add extra text.
// // // // `;

// // // //     const response = await fetch(
// // // //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
// // // //       {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         // body: JSON.stringify({
// // // //         //   contents: [
// // // //         //     {
// // // //         //       parts: [{ text: prompt }],
// // // //         //     },
// // // //         //   ],
// // // //         // }),
// // // //         body: JSON.stringify({
// // // //   contents: [
// // // //     {
// // // //       role: "user",
// // // //       parts: [{ text: prompt }],
// // // //     },
// // // //   ],
// // // //   generationConfig: {
// // // //     temperature: 0.7,
// // // //     maxOutputTokens: 500,
// // // //   },
// // // // })
// // // //       }
// // // //     );

// // // //     // 🔥 Get raw response
// // // //     const raw = await response.text();
// // // //     console.log("🔥 GEMINI RAW RESPONSE:", raw);
// // // //     console.log("STATUS:", response.status);

// // // //     // 🔥 Parse JSON safely
// // // //     let data;
// // // //     try {
// // // //       data = JSON.parse(raw);
// // // //     } catch (e) {
// // // //       return res.status(500).json({ error: "Invalid JSON from Gemini" });
// // // //     }

// // // //     // 🔥 Extract text
// // // //     const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

// // // //     if (!text) {
// // // //       return res.status(500).json({ error: "No text from AI" });
// // // //     }

// // // //     // 🔥 Clean markdown if exists
// // // //     const cleaned = text.replace(/```json|```/g, "").trim();

// // // //     // 🔥 Convert string → array
// // // //     let questions;
// // // //     try {
// // // //       questions = JSON.parse(cleaned);
// // // //     } catch (e) {
// // // //       console.log("❌ PARSE ERROR TEXT:", cleaned);
// // // //       return res.status(500).json({ error: "Invalid JSON from AI" });
// // // //     }

// // // //     console.log("✅ FINAL QUESTIONS:", questions);

// // // //     res.json({ questions });

// // // //   } catch (err) {
// // // //     console.log("❌ FULL ERROR:", err);
// // // //     res.status(500).json({
// // // //       error: err.message || "AI failed",
// // // //     });
// // // //   }
// // // // };


// // // import fetch from "node-fetch";
// // // import dotenv from "dotenv";

// // // dotenv.config();
// // // console.log("🔑 GEMINI KEY:", process.env.GEMINI_KEY);
// // // export const generateQuestions = async (req, res) => {
    
// // //   try {
// // //     const { role, jobDesc, difficulty } = req.body;

// // //     if (!role || !difficulty) {
// // //       return res.status(400).json({ error: "Role & difficulty required" });
// // //     }

// // //     console.log("🔑 GEMINI KEY:", process.env.GEMINI_KEY);

// // //     const prompt = `
// // // You are an expert technical interviewer.

// // // Generate exactly 5 ${difficulty} interview questions for the role of ${role}.

// // // Job Description:
// // // ${jobDesc}

// // // Rules:
// // // - Return ONLY valid JSON array
// // // - No explanation
// // // - No markdown
// // // - No extra text

// // // Example:
// // // ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]
// // // `;

// // //     // const response = await fetch(
// // //     //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_KEY}`,
// // //   const response = await fetch(
// // //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
// // //       {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           contents: [
// // //             {
// // //               role: "user",
// // //               parts: [
// // //                 {
// // //                   text: prompt,
// // //                 },
// // //               ],
// // //             },
// // //           ],
// // //           generationConfig: {
// // //             temperature: 0.7,
// // //             maxOutputTokens: 500,
// // //           },
// // //         }),
// // //       }
// // //     );

// // //     const raw = await response.text();
// // //     console.log("🔥 GEMINI RAW RESPONSE:", raw);
// // //     console.log("STATUS:", response.status);

// // //     // ❗ Handle API error properly
// // //     if (!response.ok) {
// // //       return res.status(500).json({ error: "Gemini API failed", details: raw });
// // //     }

// // //     let data;
// // //     try {
// // //       data = JSON.parse(raw);
// // //     } catch (e) {
// // //       return res.status(500).json({ error: "Invalid JSON from Gemini" });
// // //     }

// // //     console.log("👉 FULL GEMINI DATA:", data);

// // //     const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

// // //     if (!text) {
// // //       return res.status(500).json({ error: "No text from AI" });
// // //     }

// // //     // 🔥 Clean markdown if exists
// // //     const cleaned = text.replace(/```json|```/g, "").trim();

// // //     let questions;
// // //     try {
// // //       questions = JSON.parse(cleaned);
// // //     } catch (e) {
// // //       console.log("❌ PARSE ERROR TEXT:", cleaned);
// // //       return res.status(500).json({ error: "Invalid JSON from AI" });
// // //     }

// // //     console.log("✅ FINAL QUESTIONS:", questions);

// // //     return res.json({ questions });

// // //   } catch (err) {
// // //     console.log("❌ FULL ERROR:", err);
// // //     return res.status(500).json({
// // //       error: err.message || "AI failed",
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


// export const evaluateAnswer = async (req, res) => {
//   try {
//     const { question, answer } = req.body;

//     if (!question || !answer) {
//       return res.status(400).json({ msg: "Missing data" });
//     }

//     // 🔥 SIMPLE MOCK SCORING (replace with AI later)
//     let score = 5;

//     const keywords = ["react", "node", "mongodb", "api", "optimization"];

//     keywords.forEach(k => {
//       if (answer.toLowerCase().includes(k)) {
//         score += 1;
//       }
//     });

//     if (score > 10) score = 10;

//     return res.json({
//       score,
//       feedback: score > 7 ? "Good answer" : "Needs improvement"
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "AI error" });
//   }
// };


// import fetch from "node-fetch";

import axios from "axios";

// export const evaluateAnswer = async (req, res) => {
//   try {
//     const { question, answer } = req.body;

//     if (!question || !answer) {
//       return res.status(400).json({ msg: "Missing data" });
//     }

// //     const prompt = `
// // Return ONLY valid JSON.

// // Question: ${question}
// // Answer: ${answer}

// // Format:
// // {
// //   "score": 0-10,
// //   "feedback": {
// //     "strengths": "",
// //     "weaknesses": ""
// //   },
// //   "idealAnswer": ""
// // }
// // `;

// const prompt = `
// You are a strict interview evaluator.

// You MUST return ONLY valid JSON.

// No explanation. No markdown. No text before or after.

// Question: ${question}
// Answer: ${answer}

// Return EXACTLY this format:

// {
//   "score": 0-10 number,
//   "feedback": {
//     "strengths": "short sentence",
//     "weaknesses": "short sentence"
//   },
//   "idealAnswer": "5-6 line perfect answer"
// }
// `;

//     const response = await axios.post(
//       "https://devtoolbox-api.devtoolbox-api.workers.dev/ai/generate",
//       { prompt }
//     );

//     const text = response.data?.response || response.data?.result;

//     if (!text) {
//       return res.json({
//         score: 5,
//         feedback: { strengths: "", weaknesses: "" },
//         idealAnswer: "Not available"
//       });
//     }

//     // let result;

//     // try {
//     //   const clean = text.replace(/```json|```/g, "").trim();
//     //   result = JSON.parse(clean);
//     // } catch (err) {
//     //   console.log("AI parse failed:", text);

//     //   result = {
//     //     score: 5,
//     //     feedback: {
//     //       strengths: "Good attempt",
//     //       weaknesses: "Needs improvement"
//     //     },
//     //     idealAnswer: "Structured answer with example"
//     //   };
//     // }

// //     let result;

// // try {
// //   const cleaned = text
// //     .replace(/```json/g, "")
// //     .replace(/```/g, "")
// //     .trim();

// //   result = JSON.parse(cleaned);
// // } catch (err) {
// //   console.log("AI parse failed:", text);

// //   result = {
// //     score: 6,
// //     feedback: {
// //       strengths: "Good attempt",
// //       weaknesses: "Improve clarity and add examples"
// //     },
// //     idealAnswer: "Structured answer with explanation and examples"
// //   };
// // }

// let result;

// try {
//   const text = data.response || data.result;

//   // extract ONLY JSON part
//   const jsonStart = text.indexOf("{");
//   const jsonEnd = text.lastIndexOf("}");

//   const jsonString = text.slice(jsonStart, jsonEnd + 1);

//   result = JSON.parse(jsonString);

// } catch (err) {
//   console.log("AI PARSE FAILED:", err);

// //   result = {
// //     score: 5,
// //     feedback: {
// //       strengths: "Basic attempt",
// //       weaknesses: "Improve explanation"
// //     },
// //     idealAnswer: "Structured detailed answer expected"
// //   };
// const aiRes = await fetch("http://localhost:5000/api/ai/evaluate", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     question: item.question,
//     answer: item.answer
//   })
// });

// const result = await aiRes.json();
// }
//     return res.json(result);

//   } catch (err) {
//     console.log("AI ERROR:", err.message);
//     return res.status(500).json({ msg: "AI error" });
//   }
// };

// export const evaluateAnswer = async (req, res) => {
//   try {
//     const { question, answer } = req.body;

//     const prompt = `
// You are an expert interview evaluator.

// Return ONLY valid JSON. No explanation. No markdown.

// Question: ${question}
// Answer: ${answer}

// Return EXACT format:

// {
//   "score": 0-10 number,
//   "feedback": {
//     "strengths": "one good point",
//     "weaknesses": "one improvement point"
//   },
//   "idealAnswer": "5-6 lines perfect answer"
// }
// `;

//     const response = await fetch(
//       "https://devtoolbox-api.devtoolbox-api.workers.dev/ai/generate",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       }
//     );

//     const data = await response.json();
//     const text = data.response || data.result;

//     if (!text) {
//       return res.json({
//         score: 5,
//         feedback: {
//           strengths: "Attempt made",
//           weaknesses: "Improve explanation"
//         },
//         idealAnswer: "Not available"
//       });
//     }

//     // ✅ CLEAN JSON EXTRACTION (IMPORTANT FIX)
//     const jsonStart = text.indexOf("{");
//     const jsonEnd = text.lastIndexOf("}");

//     let result;

//     try {
//       const cleanJson = text.slice(jsonStart, jsonEnd + 1);
//       result = JSON.parse(cleanJson);
//     } catch (err) {
//       console.log("AI PARSE FAILED:", text);

//       result = {
//         score: 5,
//         feedback: {
//           strengths: "Good attempt",
//           weaknesses: "Add more clarity"
//         },
//         idealAnswer: "Structured detailed answer expected"
//       };
//     }

//     // ✅ FINAL SAFETY FIX (VERY IMPORTANT)
//     result.feedback = result.feedback || {
//       strengths: "Attempt made",
//       weaknesses: "Improve answer"
//     };

//     result.idealAnswer = result.idealAnswer || "Not available";
//     result.score = result.score ?? 5;

//     return res.json(result);

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ msg: "AI error" });
//   }
// };


// export const evaluateAnswer = async (req, res) => {
//   try {
//     const { question, answer } = req.body;

//     const prompt = `
// You are a strict technical interviewer.

// TASK:
// 1. Evaluate user's answer
// 2. If answer is wrong or incomplete → still provide correct answer
// 3. Compare and score fairly

// QUESTION:
// ${question}

// USER ANSWER:
// ${answer}

// RETURN ONLY VALID JSON:

// {
//   "score": 0-10,
//   "feedback": {
//     "strengths": "what user did right",
//     "weaknesses": "what user missed or got wrong"
//   },
//   "idealAnswer": "Write the PERFECT correct answer for this question in 5-6 lines"
// }
// `;

//     const response = await fetch(
//       "https://devtoolbox-api.devtoolbox-api.workers.dev/ai/generate",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       }
//     );

//     const data = await response.json();
//     const text = data.response || data.result;

//     if (!text) {
//       return res.json({
//         score: 5,
//         feedback: {
//           strengths: "Attempt made",
//           weaknesses: "No proper evaluation generated"
//         },
//         idealAnswer: "Answer depends on concept, explain clearly with example"
//       });
//     }

//     // 🔥 SAFE JSON EXTRACTION
//     const start = text.indexOf("{");
//     const end = text.lastIndexOf("}");

//     let result;

//     try {
//       result = JSON.parse(text.slice(start, end + 1));
//     } catch (err) {
//       console.log("AI PARSE FAILED:", text);

//       result = {
//         score: 5,
//         feedback: {
//           strengths: "Basic attempt",
//           weaknesses: "Improve clarity and concept understanding"
//         },
//         idealAnswer:
//           "Provide definition + explanation + real-world example + use case"
//       };
//     }

//     // 🔥 FORCE CORRECT STRUCTURE ALWAYS
//     result.feedback = result.feedback || {
//       strengths: "Attempt made",
//       weaknesses: "Needs improvement"
//     };

//     result.idealAnswer =
//       result.idealAnswer ||
//       "Write a structured, concept-based correct answer with example.";

//     result.score = result.score ?? 5;

//     return res.json(result);

//   } catch (err) {
//     console.log(err);
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

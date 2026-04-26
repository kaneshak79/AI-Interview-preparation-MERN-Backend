import Question from "../models/Question.js";


// CREATE
export const createQuestion = async (req, res) => {
  const { question, category, difficulty, keywords, idealAnswer } = req.body;

  if (!question || !category || !difficulty || !keywords || !idealAnswer)
    return res.status(400).json({ msg: "All fields required" });

  const newQ = await Question.create({
    question,
    category,
    difficulty,
    keywords,
    idealAnswer
  });

  res.json(newQ);
};


// GET ALL (with filter + search + pagination)
export const getQuestions = async (req, res) => {
  const { category, difficulty, search, page = 1, limit = 10 } = req.query;

  const filter = {};

  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;

  if (search) {
    filter.question = { $regex: search, $options: "i" };
  }

  const questions = await Question.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(questions);
};


// GET ONE
export const getOne = async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question)
    return res.status(404).json({ msg: "Question not found" });

  res.json(question);
};


// UPDATE
export const update = async (req, res) => {
  const question = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!question)
    return res.status(404).json({ msg: "Question not found" });

  res.json(question);
};


// DELETE
export const remove = async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.id);

  if (!question)
    return res.status(404).json({ msg: "Question not found" });

  res.json({ msg: "Deleted successfully" });
};
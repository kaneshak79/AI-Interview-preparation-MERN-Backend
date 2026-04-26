export const evaluate = (answer, keywords) => {
  const text = answer.toLowerCase();

  const matched = keywords.filter(k =>
    text.includes(k.toLowerCase())
  );

  return {
    score: (matched.length / keywords.length) * 100,
    strengths: matched,
    weaknesses: keywords.filter(k => !matched.includes(k))
  };
};
const Quiz = require("../models/quizModel");

exports.createQuiz = async (req, res, next) => {
  const { question_reponse } = req.body;
  try {
    const quiz = await Quiz.create({
      question_reponse: question_reponse,
    });

    res.status(201).json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

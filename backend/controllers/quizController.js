const Quiz = require("../models/quizModel");

exports.createQuiz = async (req, res, next) => {
  const { question_reponse, titre, id_user_auth } = req.body;
  try {
    const quiz = await Quiz.create({
      titre: titre,
      createdBy: id_user_auth,
      question_reponse: question_reponse,
    });

    res.status(200).json({
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

exports.getQuizById = async (req, res, next) => {
  const { id_quiz } = req.body;
  console.log(id_quiz);
  try {
    const quiz = await Quiz.findById(id_quiz);

    res.status(200).json({
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

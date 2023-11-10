const Quiz = require("../models/quizModel");

exports.createQuiz = async (req, res, next) => {
  const reponsetexte = "reponse texte";
  try {
    const quiz = await Quiz.create({
      question_reponse: [
        {
          question: "question",
          reponse: [{ reponse_texte: reponsetexte, etat_reponse: true }],
        },
      ],
      note: [
        {
          score_pourcentage: 80,
        },
      ],
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

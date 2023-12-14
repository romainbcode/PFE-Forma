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

exports.getAllTrueReponseQuizById = async (req, res, next) => {
  const { id_quiz } = req.body;
  try {
    const quiz = await Quiz.findById(id_quiz);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz non trouvé",
      });
    }

    //map : renvoit : Array(2) : 0:["ijij"], 1:["okoko"] : sur plusieurs tableaux
    //FlatMap renvoit : Array(2) : 0:"ijij", 1:"okoko" : applait le résultat en un seul tableau
    const trueReponses = quiz.question_reponse.flatMap((qr) =>
      qr.reponse.filter((rep) => rep.etat_reponse).map((rep) => rep._id)
    );

    res.status(200).json({
      success: true,
      trueReponses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

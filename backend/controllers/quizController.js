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

exports.getQuizsRecent = async (req, res, next) => {
  try {
    const quizs = await Quiz.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      quizs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.supprimeQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Quiz supprimé avec succès !",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du quiz !",
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
  console.log("id_quiz", id_quiz);
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

exports.addNoteQuiz = async (req, res, next) => {
  const { id_quiz, id_user_auth, id_chapitre, score_pourcentage } = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(
      id_quiz,
      {
        $push: {
          note: {
            id_user_auth: id_user_auth,
            id_chapitre: id_chapitre,
            score_pourcentage: score_pourcentage,
          },
        },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const { quiz_id, titre, question_reponse } = req.body;
    const data = {
      titre: titre,
      question_reponse: question_reponse,
    };

    const quizUpdate = await Quiz.findByIdAndUpdate(quiz_id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      quizUpdate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

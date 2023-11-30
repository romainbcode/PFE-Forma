const UserQuestionReponse = require("../models/user_question_reponseModel");
const Quiz = require("../models/quizModel");

exports.createUserQuestionReponse = async (req, res, next) => {
  const { id_user_auth, quiz_id, reponses } = req.body;
  try {
    const userQuestionReponses = Object.keys(reponses).map((key) => {
      const item = reponses[key];
      return {
        id_question: item.question_id,
        id_reponse: item.reponse_id,
        etat_reponse_user: true,
      };
    });

    const newUser_question_reponse = await UserQuestionReponse.create({
      id_user: id_user_auth,
      user_question_reponse: [
        {
          id_quiz: quiz_id,
          question_reponse: userQuestionReponses,
        },
      ],
    });

    res.status(201).json({
      success: true,
      newUser_question_reponse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

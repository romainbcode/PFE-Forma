const UserQuestionReponse = require("../models/user_question_reponseModel");

exports.createUserQuestionReponse = async (req, res, next) => {
  try {
    const user_question_reponse = await UserQuestionReponse.create({});

    res.status(201).json({
      success: true,
      user_question_reponse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

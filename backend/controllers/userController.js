const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  const iduserauth = "1234567890123";
  try {
    const user = await User.create({
      id_user_auth: iduserauth,
      scores: [
        {
          //id_quiz: ,
          scores_pourcentage: 80,
        },
      ],
      niveau: 1,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

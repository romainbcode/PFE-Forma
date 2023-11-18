const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  const { id_user_auth } = req.body;
  try {
    const userExistant = await User.findOne({
      id_user_auth: id_user_auth,
    });
    if (!userExistant) {
      const user = await User.create({
        id_user_auth: id_user_auth,
        niveau: 1,
      });

      res.status(201).json({
        success: true,
        user,
        message: "Utilisateur ajouté à la BDD.",
      });
    } else {
      res.status(200).json({
        success: true,
        userExistant,
        message: "Utilisateur déjà enregistré dans la BDD.",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.getUserByIdUserAuth = async (req, res, next) => {
  const { iduserauth } = req.params;
  try {
    const userExistant = await User.findOne({
      id_user_auth: iduserauth,
    });
    console.log(userExistant);
    if (userExistant) {
      res.status(200).json({
        success: true,
        userExistant,
        message: "Utilisateur déjà enregistré dans la BDD.",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Utilisateur non enregistré dans la BDD.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

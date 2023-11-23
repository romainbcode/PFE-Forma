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

      res.status(200).json({
        success: true,
        user,
        message: "Utilisateur ajouté à la BDD.",
      });
    } else {
      res.status(201).json({
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

exports.addInscriptionFormationUser = async (req, res, next) => {
  const { id_user_auth, id_formation } = req.body;

  try {
    const formationsUser = await User.findOne({
      id_user_auth: id_user_auth,
    });
    const idFormationDejaPresente = formationsUser.formationInscrite.some(
      (element) => element.id_formation.equals(id_formation)
    );
    if (!idFormationDejaPresente) {
      const user = await User.findOneAndUpdate(
        {
          id_user_auth: id_user_auth,
        },
        {
          $push: {
            formationInscrite: {
              id_formation: id_formation,
            },
          },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Utilisateur déjà inscrit à cette formation !",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

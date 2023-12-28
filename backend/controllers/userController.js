const User = require("../models/userModel");
const Formation = require("../models/formationModel");
const Quiz = require("../models/quizModel");

exports.createUser = async (req, res, next) => {
  const { id_user_auth, role } = req.body;
  try {
    const userExistant = await User.findOne({
      id_user_auth: id_user_auth,
    });
    if (!userExistant) {
      const user = await User.create({
        id_user_auth: id_user_auth,
        niveau: 1,
        role: role,
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
    const user_ = await User.findOne({
      id_user_auth: id_user_auth,
    });
    const formationDejaPresente = user_.formationInscrite.some((element) =>
      element.id_formation.equals(id_formation)
    );
    if (!formationDejaPresente) {
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

      res.status(201).json({
        success: true,
        user,
      });
    } else {
      res.status(200).json({
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

exports.getAllFormationsInscrites = async (req, res, next) => {
  const { id_user_auth } = req.body;

  try {
    const user = await User.findOne({
      id_user_auth: id_user_auth,
    });

    const formations = user.formationInscrite;

    //Set pour garantir l'unicité des ids
    const uniqueFormationIds = new Set();

    formations.forEach((item) => {
      uniqueFormationIds.add(item.id_formation.toString());
    });

    // Convertissez l'ensemble en tableau pour le résultat final
    const formationIdsArray = Array.from(uniqueFormationIds);

    const formationsInscrit = await Formation.find({
      _id: { $in: formationIdsArray },
    });

    res.status(200).json({
      success: true,
      formationsInscrit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

exports.getAllQuizsUser = async (req, res, next) => {
  const { id_user_auth } = req.body;
  try {
    const quizs = await Quiz.find({
      createdBy: id_user_auth,
    });

    res.status(200).json({
      success: true,
      quizs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

exports.addScoreFormationUser = async (req, res, next) => {
  const { id_user_auth, id_quiz, id_chapitre, scores_pourcentage } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      {
        id_user_auth: id_user_auth,
      },
      {
        $push: {
          scores: {
            id_quiz: id_quiz,
            id_chapitre: id_chapitre,
            scores_pourcentage: scores_pourcentage,
          },
        },
      },
      { new: true }
    );

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

exports.addIdGoogleAgenda = async (req, res, next) => {
  const { id_user_auth, id_user_google_agenda } = req.body;
  console.log(id_user_auth, id_user_google_agenda);
  try {
    const user = await User.findOneAndUpdate(
      {
        id_user_auth: id_user_auth,
      },
      {
        $set: {
          id_user_agenda: id_user_google_agenda,
        },
      },
      { new: true }
    );

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

exports.getIdGoogleAgenda = async (req, res, next) => {
  const { id_user_auth } = req.body;

  try {
    const user = await User.findOne(
      {
        id_user_auth: id_user_auth,
      },
      "id_user_agenda"
    );

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

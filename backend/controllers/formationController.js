const Formation = require("../models/formationModel");
const { ObjectId } = require("mongodb");

exports.createFormation = async (req, res, next) => {
  const { titre, description, chapitre, id_user_auth } = req.body;
  try {
    const formation = await Formation.create({
      titre: titre,
      description: description,
      chapitre: chapitre,
      createdBy: id_user_auth,
    });

    res.status(201).json({
      success: true,
      formation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.getFormationsRecente = async (req, res, next) => {
  try {
    const formations = await Formation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      formations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.getFormationsById = async (req, res, next) => {
  try {
    const formationById = await Formation.findById(req.params.idformation);
    res.status(200).json({
      success: true,
      formationById,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.getFormationsByProfesseur = async (req, res, next) => {
  const { id_user_auth } = req.body;
  try {
    const formationByProfesseur = await Formation.find({
      createdBy: id_user_auth,
    });
    res.status(200).json({
      success: true,
      formationByProfesseur,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.getChapitreById = async (req, res, next) => {
  try {
    const formationById = await Formation.findById(req.params.idformation);
    const chapitreById = await formationById.chapitre.find((chap) =>
      chap._id.equals(req.params.idchapitre)
    );
    res.status(200).json({
      success: true,
      formationById,
      chapitreById,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.supprimeFormation = async (req, res, next) => {
  const { _id } = req.body;
  console.log("icicicicicii");
  console.log(_id);
  try {
    const formation = await Formation.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Formation supprimé correctement !",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur au momement de supprimé la formation !",
    });
  }
};

exports.addQuizInFormation = async (req, res, next) => {
  const { id_formation, id_quiz, id_chapitre } = req.body;
  console.log(id_formation, id_quiz, id_chapitre);
  try {
    const formation = await Formation.findById(id_formation);

    const chapitre = formation.chapitre.find(
      (chap) => chap._id.toString() === id_chapitre
    );

    chapitre["Quiz"] = id_quiz;

    await formation.save();

    res.status(201).json({
      success: true,
      chapitre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

exports.updateFormation = async (req, res, next) => {
  try {
    const { formation_id, titre, description, chapitre } = req.body;
    const data = {
      titre: titre,
      description: description,
      chapitre: chapitre,
    };

    const formationUpdate = await Formation.findByIdAndUpdate(
      formation_id,
      data,
      { new: true }
    );

    res.status(200).json({
      success: true,
      formationUpdate,
    });
  } catch (error) {
    next(error);
  }
};

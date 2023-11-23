const Formation = require("../models/formationModel");
const { ObjectId } = require("mongodb");

exports.createFormation = async (req, res, next) => {
  const { titre } = req.body;
  const { description } = req.body;
  const { chapitre } = req.body;

  try {
    const formation = await Formation.create({
      titre: titre,
      description: description,
      chapitre: chapitre,
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

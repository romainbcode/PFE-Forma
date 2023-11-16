const Formation = require("../models/formationModel");

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
    const formationById = await Formation.findById(req.params._id);
    res.status(200).json({
      success: true,
      formationById,
    });
  } catch (error) {
    res.satus(400).json({
      success: false,
    });
  }
};

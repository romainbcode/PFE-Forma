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

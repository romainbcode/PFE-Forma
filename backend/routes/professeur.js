const express = require("express");
const router = express.Router();
const { createQuiz } = require("../controllers/quizController");
const {
  createFormation,
  getFormationsByProfesseur,
  addQuizInFormation,
} = require("../controllers/formationController");

router.post("/addFormation", createFormation);
router.post("/addQuiz", createQuiz);
router.post("/professeur/formations", getFormationsByProfesseur);
router.post("/professeur/addQuiz/formation", addQuizInFormation);

module.exports = router;

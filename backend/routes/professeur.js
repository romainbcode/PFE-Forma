const express = require("express");
const router = express.Router();
const { createQuiz } = require("../controllers/quizController");
const {
  createFormation,
  getFormationsByProfesseur,
  addQuizInFormation,
  updateFormation,
} = require("../controllers/formationController");
const { isTeacher } = require("../middleware/auth");

router.post("/addFormation", isTeacher, createFormation);
router.post("/addQuiz", isTeacher, createQuiz);
router.post("/professeur/formations", isTeacher, getFormationsByProfesseur);
router.post("/professeur/addQuiz/formation", isTeacher, addQuizInFormation);
router.post("/professeur/update/quiz", isTeacher, updateFormation);
module.exports = router;

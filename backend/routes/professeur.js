const express = require("express");
const router = express.Router();
const { createQuiz, updateQuiz } = require("../controllers/quizController");
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
router.post("/professeur/update/formation", isTeacher, updateFormation);
router.post("/professeur/update/quiz", isTeacher, updateQuiz);
module.exports = router;

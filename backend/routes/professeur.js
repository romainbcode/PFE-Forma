const express = require("express");
const router = express.Router();
const { createQuiz, updateQuiz } = require("../controllers/quizController");
const {
  createFormation,
  getFormationsByProfesseur,
  addQuizInFormation,
  updateFormation,
} = require("../controllers/formationController");
const { createCoursWithTeacherId } = require("../controllers/coursController");
const { isTeacher } = require("../middleware/auth");

router.post("/addFormation", isTeacher, createFormation);
router.post("/addQuiz", isTeacher, createQuiz);
router.post("/professeur/formations", isTeacher, getFormationsByProfesseur);
router.post("/professeur/addQuiz/formation", isTeacher, addQuizInFormation);
router.post("/professeur/update/formation", isTeacher, updateFormation);
router.post("/professeur/update/quiz", isTeacher, updateQuiz);
router.post("/professeur/create/cours", isTeacher, createCoursWithTeacherId);
module.exports = router;

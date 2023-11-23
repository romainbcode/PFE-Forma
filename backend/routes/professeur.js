const express = require("express");
const router = express.Router();
const { createQuiz } = require("../controllers/quizController");
const { createFormation } = require("../controllers/formationController");

router.post("/addFormation", createFormation);
router.post("/addQuiz", createQuiz);

module.exports = router;

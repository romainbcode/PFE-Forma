const express = require("express");
const router = express.Router();
const { getAllTrueReponseQuizById } = require("../controllers/quizController");
const { addScoreFormationUser } = require("../controllers/userController");
const { isUser } = require("../middleware/auth");

router.post("/getTrueReponse", isUser, getAllTrueReponseQuizById);
router.post("/user/addScoreQuiz", isUser, addScoreFormationUser);
module.exports = router;

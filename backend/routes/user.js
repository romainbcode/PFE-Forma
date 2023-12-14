const express = require("express");
const router = express.Router();
const {
  getAllTrueReponseQuizById,
  addNoteQuiz,
} = require("../controllers/quizController");
const { addScoreFormationUser } = require("../controllers/userController");
const { isUser } = require("../middleware/auth");

router.post("/getTrueReponse", isUser, getAllTrueReponseQuizById);
router.post("/user/addScoreQuiz", isUser, addScoreFormationUser);
router.post("/quiz/addNote", isUser, addNoteQuiz);
module.exports = router;

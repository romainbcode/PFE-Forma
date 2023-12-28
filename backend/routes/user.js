const express = require("express");
const router = express.Router();
const {
  getAllTrueReponseQuizById,
  addNoteQuiz,
} = require("../controllers/quizController");
const {
  addScoreFormationUser,
  addIdGoogleAgenda,
  getIdGoogleAgenda,
} = require("../controllers/userController");
const {
  getAllCours,
  addUserInscritCours,
} = require("../controllers/coursController");
const { isUser } = require("../middleware/auth");

router.post("/getTrueReponse", isUser, getAllTrueReponseQuizById);
router.post("/user/addScoreQuiz", isUser, addScoreFormationUser);
router.post("/quiz/addNote", isUser, addNoteQuiz);
router.get("/getAllCours", isUser, getAllCours);
router.post("/cours/userSubscription", isUser, addUserInscritCours);
router.post("/user/addIdGoogleAgenda", isUser, addIdGoogleAgenda);
router.post("/user/getIdGoogleAgenda", isUser, getIdGoogleAgenda);

module.exports = router;

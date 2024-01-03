const express = require("express");
const router = express.Router();
const {
  getFormationsRecente,
  getChapitreById,
  getFormationsById,
} = require("../controllers/formationController");
const {
  createUser,
  getAllQuizsUser,
  getAllFormationsInscrites,
  addInscriptionFormationUser,
} = require("../controllers/userController");
const {
  createUserQuestionReponse,
} = require("../controllers/user_question_reponseController");
const {
  getQuizById,
  getQuizsRecent,
} = require("../controllers/quizController");

const { isUser } = require("../middleware/auth");

router.get("/formations/recente", isUser, getFormationsRecente);
router.get("/formation/:idformation", isUser, getFormationsById);
router.get("/formation/:idformation/:idchapitre", isUser, getChapitreById);
router.post("/addUser", isUser, createUser);
router.post(
  "/user/addFormationInscription",
  isUser,
  addInscriptionFormationUser
);
router.post("/user/getFormations", isUser, getAllFormationsInscrites);
router.post("/user/quizs", isUser, getAllQuizsUser);
router.post("/quiz", isUser, getQuizById);
router.post(
  "/user/questionReponse/sendReponses",
  isUser,
  createUserQuestionReponse
);
router.get("/quizs/recente", isUser, getQuizsRecent);

module.exports = router;

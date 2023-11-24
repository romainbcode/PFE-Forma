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

const { getQuizById } = require("../controllers/quizController");

router.get("/formations/recente", getFormationsRecente);
router.get("/formation/:idformation", getFormationsById);
router.get("/formation/:idformation/:idchapitre", getChapitreById);
router.post("/addUser", createUser);
router.post("/user/addFormationInscription", addInscriptionFormationUser);
router.post("/user/getFormations", getAllFormationsInscrites);
router.post("/user/quizs", getAllQuizsUser);
router.post("/quiz", getQuizById);

module.exports = router;

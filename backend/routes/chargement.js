const express = require("express");
const router = express.Router();
const { getFormationsRecente } = require("../controllers/formationController");
const { getFormationsById } = require("../controllers/formationController");
const { getChapitreById } = require("../controllers/formationController");
const { createUser } = require("../controllers/userController");

router.get("/formations/recente", getFormationsRecente);
router.get("/formation/:idformation", getFormationsById);
router.get("/formation/:idformation/:idchapitre", getChapitreById);
router.post("/addUser", createUser);

module.exports = router;

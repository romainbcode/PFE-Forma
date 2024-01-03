const express = require("express");
const router = express.Router();
const { supprimeFormation } = require("../controllers/formationController");
const { supprimeQuiz } = require("../controllers/quizController");
const { isAdmin } = require("../middleware/auth");

router.delete("/admin/supprime/formation/:id", isAdmin, supprimeFormation);
router.delete("/admin/supprime/quiz/:id", isAdmin, supprimeQuiz);

module.exports = router;

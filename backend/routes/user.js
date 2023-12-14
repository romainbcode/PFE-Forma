const express = require("express");
const router = express.Router();
const { getAllTrueReponseQuizById } = require("../controllers/quizController");
const { isUser } = require("../middleware/auth");

router.post("/getTrueReponse", isUser, getAllTrueReponseQuizById);

module.exports = router;

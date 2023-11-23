const express = require("express");
const router = express.Router();
const { supprimeFormation } = require("../controllers/formationController");

router.delete("/admin/supprime/formation/:id", supprimeFormation);

module.exports = router;

const express = require("express");
const router = express.Router();
const { supprimeFormation } = require("../controllers/formationController");
const { isAdmin } = require("../middleware/auth");

router.delete("/admin/supprime/formation/:id", isAdmin, supprimeFormation);

module.exports = router;

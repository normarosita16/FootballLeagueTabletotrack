const dotEnv = require("dotenv");
const { Router } = require("express");

const teamController = require("../controllers/team_controller");

const router = Router();
dotEnv.config();

router.post("", teamController.create);
router.get("", teamController.list);
router.get("/:id", teamController.view);
router.delete("/:id", teamController.delete);

module.exports = router;

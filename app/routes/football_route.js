const dotEnv = require("dotenv");
const { Router } = require("express");

const footballController = require("../controllers/football_controller");

const router = Router();
dotEnv.config();

router.post("", footballController.create);
router.get("/leaguestanding", footballController.listleaguestanding);

module.exports = router;

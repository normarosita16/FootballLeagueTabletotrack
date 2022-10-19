const dotEnv = require("dotenv");
const { Router } = require("express");

const iscontainletterController = require("../controllers/iscontain_letter_controller");

const router = Router();
dotEnv.config();

router.post("", iscontainletterController.create);

module.exports = router;

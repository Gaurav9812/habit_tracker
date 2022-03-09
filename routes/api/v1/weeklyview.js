const express = require("express");
const router = express.Router();
const weeklyController = require("../../../controller/api/v1/weeklyController");

router.get("/", weeklyController.home);

router.get("/update", weeklyController.update);
module.exports = router;

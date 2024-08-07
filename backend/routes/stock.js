const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockcontroller");
const authtoken = require("../middlewares/authmiddleware");

router.get("/get-stocks", authtoken, stockController.getstocks);
router.post("/buy-stock", authtoken, stockController.buystock);

module.exports = router;

const express = require("express");
const router = express.Router();
const authtoken = require("../middlewares/authmiddleware");
const balancecontroller = require("../controllers/checkbalancecontroller");
const { createpayment } = require("../controllers/paymentcontroller");
const { buytoken } = require("../controllers/buytoken");

router.get("/balance/diam", authtoken, balancecontroller.getdiamtoken);
router.get("/balance/bric", authtoken, balancecontroller.getbrictoken);
router.post("/transactions", authtoken, createpayment);
router.post("/buy-token", authtoken, buytoken);

module.exports = router;

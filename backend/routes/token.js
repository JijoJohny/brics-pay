const express = require("express");
const router = express.Router();
const authtoken = require("../middlewares/authmiddleware");
const balancecontroller = require("../controllers/checkbalancecontroller");

router.get("/balance/diam", authtoken, balancecontroller.getdiamtoken);

module.exports = router;

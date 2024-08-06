const express = require("express");
const router = express.Router();
const authtoken = require("../middlewares/authmiddleware");
const balancecontroller = require("../controllers/checkbalancecontroller");

router.get("/balance/diam", authtoken, balancecontroller.getdiamtoken);
router.get("/balance/bric", authtoken, balancecontroller.getbrictoken);

module.exports = router;

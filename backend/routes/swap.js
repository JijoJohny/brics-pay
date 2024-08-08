const express = require("express")
const router = express.Router()
const authtoken = require("../middlewares/authmiddleware")
const {swapcontrol } = require("../controllers/swapcontroller")

router.post("/usdc", authtoken, swapcontrol);

module.exports = router;
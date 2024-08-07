const express = require("express");
const router = express.Router();
const { signup, login, getemail } = require("../controllers/authcontroller");
const authtoken = require("../middlewares/authmiddleware");

router.post("/register", signup);
router.post("/login", login);
router.get("/get-email", authtoken, getemail);

module.exports = router;

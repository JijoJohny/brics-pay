const prisma = require("../libs/prisma");
const { payment } = require("../services/tokenservices");
require("dotenv").config();
const ISSUER_SECRET = process.env.ISSUER_SECRET;

exports.buytoken = async (req, res) => {
  const { amount } = req.body;
  const email = req.user.email;

  try {
    const userpublic = req.user.public;
    await payment(ISSUER_SECRET, userpublic, amount);
    return res.status(200).json({ message: "Transaction successful" });
  } catch (err) {
    console.error("Error purchasing token:", err);
    res.status(500).json({ error: "Failed to purchase token" });
  }
};

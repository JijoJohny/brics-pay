const jwt = require("jsonwebtoken");
const prisma = require("../libs/prisma");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticatetoken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized : missing token" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
      where: {
        email: userId,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized : User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Authentication erro: ", err);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticatetoken;

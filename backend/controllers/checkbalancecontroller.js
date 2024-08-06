const DiamSdk = require("diamante-sdk-js");
const prisma = require("../libs/prisma");
const { getbalance } = require("../services/tokenservices");

exports.getdiamtoken = async (req, res) => {
  // console.log(req.user);
  const email = req.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const publickey = user.public;
    const diambal = await getbalance(publickey, "native");
    res.status(200).json({ diambal });
  } catch (err) {
    console.error("Error retrievig diam token\n", err);
    res
      .status(500)
      .json({ error: "Failed to load diam token balance", message: err });
  }
};

exports.getbrictoken = async (req, res) => {
  // console.log(req.user);
  const email = req.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const publickey = user.public;
    const bricbal = await getbalance(publickey, "BRIC");
    res.status(200).json({ bricbal });
  } catch (err) {
    console.error("Error retrievig bric token\n", err);
    res
      .status(500)
      .json({ error: "Failed to load bric token balance", message: err });
  }
};

const prisma = require("../libs/prisma");
const { payment } = require("../services/tokenservices");

exports.createpayment = async (req, res) => {
  const { email, amount } = req.body;
  const senderEmail = req.user.email;

  try {
    if (!senderEmail || !email || !amount) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid amount. Must be a positive number." });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Reciever user not found" });
    }

    const recieverpublic = user.public;
    const senderuser = prisma.user.findUnique({
      where: { email: senderEmail },
    });
    if (!senderuser) {
      return res.status(404).json({ error: "Sender user not found" });
    }
    const sendersecret = senderuser.secret;
    try {
      // console.log(sendersecret);
      // console.log(recieverpublic);
      await payment(req.user.secret, recieverpublic, amount);
      return res.status(200).json({ message: "Transaction successful" });
    } catch (err) {
      console.error("Error in performPayment:", err.message);
      res
        .status(500)
        .json({ error: "Transaction failed", message: err.message });
    }
  } catch (err) {
    console.error("", err);
  }
};

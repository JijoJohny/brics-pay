const prisma = require("../libs/prisma");
const { payment } = require("../services/tokenservices");

exports.getstocks = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        stocks: true,
      },
    });
    console.log(companies);
    let stocks = [];
    companies.forEach((company) => {
      company.stocks.forEach((stock) => {
        stocks.push({
          companyId: company.id,
          companyName: company.name,
          stockName: stock.name,
          stockPriceInBrics: stock.priceInbrics,
          companyPublicKey: company.public,
        });
      });
    });
    res.status(200).json(stocks);
  } catch (err) {
    console.error("Error fetching stocks: ", err);
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};

exports.buystock = async (req, res) => {
  const { companyId, stockName, quantity } = req.body;
  const email = req.user.email;
  try {
    if (!email || !companyId || !stockName || !quantity) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    if (isNaN(quantity) || parseInt(quantity) <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid quantity. Must be a positive integer." });
    }

    if (email != req.user.email) {
      return res.status(404).json({ error: "User invalid" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    console.log(" user : ", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        stocks: true,
      },
    });
    console.log(company);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    const stock = company.stocks.find((stock) => stock.name === stockName);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    const totalcost = stock.priceInbrics * quantity;
    const receiverpublic = company.public;
    const usersecret = user.secret;

    try {
      //payment
      await payment(usersecret, receiverpublic, totalcost);
      const purchase = await prisma.purchase.create({
        data: {
          userEmail: user.email,
          quantity,
          stockId: stock.id,
        },
      });

      res.status(200).json({ message: "Stock purchase successful" });
    } catch (err) {
      console.error("Error in performPayment:", err.message);
      res
        .status(500)
        .json({ error: "Transaction failed", message: err.message });
    }
  } catch (err) {
    console.error("error is stock purchase : ", err);
    res.status(500).json({ error: "Transaction failed", message: err.message });
  }
};

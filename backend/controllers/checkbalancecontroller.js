const DiamSdk = require("diamante-sdk-js");
const prisma = require("../libs/prisma");

async function getbalance(public, token) {
  const server = new DiamSdk.Horizon.Server(
    "https://diamtestnet.diamcircle.io/",
  );

  const account = await server.loadAccount(public);
  // console.log("Balances for account : " + public);

  // account.balances.forEach(function (balance) {
  //   console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
  // });
  function checkfn(x) {
    if (token == "native") return token == x.asset_type;
    return token == x.asset_code;
  }
  console.log(account.balances);
  const balance = account.balances.find(checkfn).balance;
  return balance;
}

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

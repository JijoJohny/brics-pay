const DiamSdk = require("diamante-sdk-js");
const prisma = require("../libs/prisma");

async function getdiambalance(public) {
  const server = new DiamSdk.Horizon.Server(
    "https://diamtestnet.diamcircle.io/",
  );

  const account = await server.loadAccount(public);
  console.log("Balances for account : " + public);

  // account.balances.forEach(function (balance) {
  //   console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
  // });
  function nativebal(x) {
    return "native" == x.asset_type;
  }
  const balance = account.balances.find(nativebal).balance;
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
    const diambal = await getdiambalance(publickey);
    res.status(200).json({ diambal });
  } catch (err) {
    console.error("Error retrievig diam token\n", err);
    res
      .status(500)
      .json({ error: "Failed to load diam token balance", message: err });
  }
};

const DiamSdk = require("diamante-sdk-js");
const prisma = require("../libs/prisma");
require("dotenv").config();
const ISSUER_PUBLIC = process.env.ISSUER_PUBLIC;

exports.swapcontrol = async (req, res) => {
  const email = req.user.email;
  const { coin, amount } = req.body;
  try {
    if (!coin || !amount) {
      return res
        .status(404)
        .json({ error: "insufficient details should have coin and amount" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Reciever user not found" });
    }

    const server = new DiamSdk.Horizon.Server(
      "https://diamtestnet.diamcircle.io/"
    );
    const quesstAccount = await server.loadAccount(user.public);
    const usdcAsset = new DiamSdk.Asset(
      "USDC",
      "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"
    );

    var bric = new DiamSdk.Asset("BRIC", ISSUER_PUBLIC);
     server
      .loadAccount(user.public)
      .then(function (receiver) {
        var transaction = new DiamSdk.TransactionBuilder(receiver, {
          fee: 100,
          networkPassphrase: DiamSdk.Networks.TESTNET,
        })
          .addOperation(
            DiamSdk.Operation.changeTrust({
              asset: usdcAsset,
            })
          )
          .setTimeout(100)
          .build();
        transaction.sign(DiamSdk.Keypair.fromSecret(user.secret));
        return server.submitTransaction(transaction);
      }).then(console.log("trust line "))

      const transaction = new DiamSdk.TransactionBuilder(DiamSdk.Keypair.fromPublicKey(user.public),{
        fee: 100,
        networkPassphrase: DiamSdk.Networks.TESTNET,
      }).addOperation(
        DiamSdk.Operation.manageBuyOffer({
            selling: bric,
            buying : usdcAsset,
            buyAmount: amount.toString(),
            price : "0.5"
        })
      ).setTimeout(30).build()
      transaction.sign(DiamSdk.Keypair.fromPublicKey(user.public))

      let res = await server.submitTransaction(transaction)
      
    return res.status(200).json({ message: "USDC swap successful" });
  } catch (error) {
    console.error("error while swaping : ", error);
    return res
      .status(400)
      .json({ message: "Swaping failed ", error: error.message });
  }
};

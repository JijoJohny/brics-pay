const DiamSdk = require("diamante-sdk-js");
require("dotenv").config();
const ISSUER_SECRET = process.env.ISSUER_SECRET;

async function createaccount() {
  var server = new DiamSdk.Horizon.Server("https://diamtestnet.diamcircle.io/");
  var issuingKeys = DiamSdk.Keypair.fromSecret(ISSUER_SECRET);
  const receivingKeys = await DiamSdk.Keypair.random();
  const keys = {
    public: receivingKeys.publicKey(),
    secret: receivingKeys.secret(),
  };

  const response = await fetch(
    `https://friendbot.diamcircle.io?addr=${encodeURIComponent(
      receivingKeys.publicKey(),
    )}`,
  );

  const responseJSON = await response.json();

  var bric = new DiamSdk.Asset("BRIC", issuingKeys.publicKey());
  server
    .loadAccount(receivingKeys.publicKey())
    .then(function (receiver) {
      var transaction = new DiamSdk.TransactionBuilder(receiver, {
        fee: 100,
        networkPassphrase: DiamSdk.Networks.TESTNET,
      })
        // The `changeTrust` operation creates (or alters) a trustline
        // The `limit` parameter below is optional
        .addOperation(
          DiamSdk.Operation.changeTrust({
            asset: bric,
            limit: "1000",
          }),
        )
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
      transaction.sign(receivingKeys);
      return server.submitTransaction(transaction);
    })
    .then(console.log);

  return keys;
}

module.exports = { createaccount };

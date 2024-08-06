const DiamSdk = require("diamante-sdk-js");
var server = new DiamSdk.Horizon.Server("https://diamtestnet.diamcircle.io");
require("dotenv").config();
const ISSUER_SECRET = process.env.ISSUER_SECRET;

async function payment(sourcekey, destkey, value) {
  var sourceKeys = DiamSdk.Keypair.fromSecret(sourcekey);
  var destinationId = "destkey";

  var transaction;

  var issuingKeys = DiamSdk.Keypair.fromSecret(ISSUER_SECRET);
  const bric = new DiamSdk.Asset("BRIC", issuingKeys.publicKey());
  server
    .loadAccount(destinationId)
    // If the account is not found, surface a nicer error message for logging.
    .catch(function (error) {
      if (error instanceof DiamSdk.NotFoundError) {
        throw new Error("The destination account does not exist!");
      } else return error;
    })
    // If there was no error, load up-to-date information on your account.
    .then(function () {
      return server.loadAccount(sourceKeys.publicKey());
    })
    .then(function (sourceAccount) {
      // Start building the transaction.
      transaction = new DiamSdk.TransactionBuilder(sourceAccount, {
        fee: DiamSdk.BASE_FEE,
        networkPassphrase: DiamSdk.Networks.TESTNET,
      })
        .addOperation(
          DiamSdk.Operation.payment({
            destination: destinationId,
            // Because Diamante allows transaction in many currencies, you must
            // specify the asset type. The special "native" asset represents Lumens.
            asset: bric,
            amount: value,
          }),
        )
        // A memo allows you to add your own metadata to a transaction. It's
        // optional and does not affect how Diamante treats the transaction.
        .addMemo(DiamSdk.Memo.text("Test Transaction"))
        // Wait a maximum of three minutes for the transaction
        .setTimeout(180)
        .build();
      // Sign the transaction to prove you are actually the person sending it.
      transaction.sign(sourceKeys);
      // And finally, send it off to Diamante!
      return server.submitTransaction(transaction);
    })
    .then(function (result) {
      console.log("Success! Results:", result);
    })
    .catch(function (error) {
      console.error("Something went wrong!", error);
      // If the result is unknown (no response body, timeout etc.) we simply resubmit
      // already built transaction:
      // server.submitTransaction(transaction);
    });
}

module.exports = { payment };

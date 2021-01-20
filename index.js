var express = require("express");
var port = process.env.PORT || 3000;
var app = express();

var Client = require("coinbase").Client;

var client = new Client({
  apiKey: "aAQKlFBGH36NqP2R", // You can get this from your Coinbase account
  apiSecret: "Eza8jtzauO1ta6qGUdR8hi4K88Kmz5Q9", // You can get this from your Coinbase account
  version: "2018-04-28", // You can get this from your Coinbase account
});

//This is what you have to complete to get this project, if you qualify this, you are elegiblefor the project
//Send Funds api using coinbase email addres
// we can use any  email associated to coinbase account to send any coin supported in coinbase

// Use Those links as a reference
//https://developers.coinbase.com/api/v2#introduction
//https://developers.coinbase.com/docs/wallet/guides/send-receive

app.post("/paycrypto/:email/:amount/:currency", function (req, res) {
    client.getAccount("primary", function (err, account) {
      account.sendMoney(
        {
          to: req.params.email,
          amount: req.params.amount,
          currency: req.params.currency,
        },
        function (err, tx) {
          console.log(tx);
          if(err){
            res.status(400).json({"status":"error", "err":err});
            return;
          }
          res.json({"status":"success","tx":tx});
          return
        }
      );
  });
});
app.listen(port, function () {
  console.log(`Example app listening on port 3000`);
});

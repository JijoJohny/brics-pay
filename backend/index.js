const express = require("express");
const bodyparser = require("body-parser");
const authroute = require("./routes/auth");
const tokenroute = require("./routes/token");
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.get("/", (req, res) => {
  res.send("Brics API");
});

app.use("/api/user", authroute);
app.use("/api/token", tokenroute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

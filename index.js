const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const api = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", api);
app.listen(3000, () => console.log("Webhook server is listening, port 3000"));

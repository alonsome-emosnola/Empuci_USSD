const express = require("express");
const ussdRoute = require("./index");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`running on localhost:${PORT}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", ussdRoute);
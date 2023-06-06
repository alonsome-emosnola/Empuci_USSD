require("dotenv").config();

const credentials = {
    apiKey: process.env.API_KEY,
    username: "sandbox"
}

const Africastalking = require("africastalking")(credentials);

module.exports = Africastalking.USSD;
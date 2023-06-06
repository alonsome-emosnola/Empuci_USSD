const express = require("express");
const json = require("./data/SERIAL_NUMBER_CHECK_400L.json");

const router = express.Router();

router.post("/", (req, res) => {
  // Read variables sent via POST from our SDK
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = "";

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON What would you like to check
        1. My Name
        2. My Serial Number`;
  } else if (text == "1") {
    // Business logic for first level response
    response = `CON Please enter your serial number below`;
  } else if (text == `1*${text.slice(2)}`) {
    const student_Name = json[Number(text.slice(2)) - 1].NAMES;
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    response = `END Your name is ${student_Name}`;
  } else if (text === "2") {
    response = `CON Please enter your name below (Surname)`;
    // This is a second level response where the user selected 1 in the first instance
    // const accountNumber = "ACC100101";
    // This is a terminal request. Note how we start the response with END
  } else if (text === `2*${text.slice(2)}`) {
    // This is a second level response where the user selected 1 in the first instance
    const student_Serial_Number = json.find(item => item.NAMES === text.slice(2));
    response = `END Your serial number is ${student_Serial_Number["SERIAL NUMBERS"]}`;
    // const balance = "KES 10,000";
    // This is a terminal request. Note how we start the response with END
    // response = `END Your balance is ${balance}`;
  }

  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type: text/plain");
  res.send(response);
  // DONE!!!
});

module.exports = router;
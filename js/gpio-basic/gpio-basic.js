const gpiod = require('node-libgpiod');
//const fetch = require('node-fetch');
//const jwt = require('jsonwebtoken');
const { ArduinoIoTCloud } = require('arduino-iot-js');

const LED = 14; // GPIO14, Pin 8
const BUTTON = 15; // GPIO15, Pin 10

const DEVICE_ID = "09d3a634-e1ad-4927-9da0-dde663f8e5c6";
const SECRET_KEY = "IXD3U1S37QPJOJXLZMP5";

// Make sure these variables are global. Otherwise, they will not 
// work properly inside the timers
chip = new gpiod.Chip('gpiochip4');
ledLine = chip.getLine(LED);
buttonLine = chip.getLine(BUTTON);

ledLine.requestOutputMode();
buttonLine.requestInputMode();

let client;

// This function is executed every 1.0 seconds, polls the value 
// of the button and sends the data to Arduino Cloud
function readButton(client) {
   button = buttonLine.getValue() ? true : false;
   if (client)
      client.sendProperty("button", button);
   console.log("pollButton:", button);
}

// This function is executed every 10.0 seconds, gets a random
// number between 0 and 100 and sends the data to Arduino Cloud
function readValue(client) {
   let value = Math.floor(Math.random() * 101);
   if (client)
      client.sendProperty("test_value", value);
   console.log("pollValue", value);
}

// This function is executed each time the "led" variable changes
function onLedChanged(led) {
   ledLine.setValue(led ? 1 : 0);
   console.log("LED change! Status is: ", led);
}

// Create Arduino Cloud connection
(async () => {
   try {
      client = await ArduinoIoTCloud.connect({
         deviceId: DEVICE_ID,
         secretKey: SECRET_KEY,
         onDisconnect: (message) => console.error(message),
      });
      client.onPropertyValue("led", (led) => onLedChanged(led));
   }
   catch(e) {
      console.error("ArduinoIoTCloud connect ERROR", e);
   }
})();

// Poll Value every 10 seconds
const pollValue = setInterval(() => {
   readValue(client);
}, 10000);

// Poll Button every 1 seconds
const pollButton = setInterval(() => {
   readButton();
}, 1000);

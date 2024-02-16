#! /usr/bin/python3

import random
import gpiod
from gpiod.line import Direction, Value, Bias

from arduino_iot_cloud import ArduinoCloudClient

from credentials import DEVICE_ID, SECRET_KEY
#DEVICE_ID = b"YOUR_DEVICE_ID"
#SECRET_KEY = b"YOUR_SECRET_KEY"

LED=14      # GPIO14, Pin 8
BUTTON=15   # GPIO15, Pin 10 
# For Raspberry PI 5, the chip is gpiochip4. Check for other RPI flavours.
chip = gpiod.Chip('/dev/gpiochip4') 
req=chip.request_lines(consumer="rpi-acloud-gpio-basic",
      config= {
         LED    : gpiod.LineSettings(direction=Direction.OUTPUT),
         BUTTON : gpiod.LineSettings(direction=Direction.INPUT, bias=Bias.PULL_UP),
      })

# This function is executed every 1.0 seconds (as defined in the registration) and 
# returns a random integer value between 0 and 100
def read_button(client):
   button = req.get_value(BUTTON)
   if button == Value.INACTIVE:
      return False
   else:
      return True

# This function is executed every 10.0 seconds (as defined in the registration) and 
# returns a random integer value between 0 and 100
def read_value(client):
   return random.randint(0, 100)

# This function is executed each time the "led" variable changes
def on_led_changed(client, value):
   if value:
       req.set_value(LED, Value.ACTIVE)
   else:
       req.set_value(LED, Value.INACTIVE)
   print("LED change! Status is: ", value)


if __name__ == "__main__":
   # Create Arduino Cloud connection
   client = ArduinoCloudClient(device_id=DEVICE_ID, username=DEVICE_ID, password=SECRET_KEY)

   # Register the Arduino Cloud variables with the callback functions
   client.register("test_value", on_read=read_value, interval=10.0) 
   client.register("button", on_read=read_button, interval=1.0)
   client.register("led", value=None, on_write=on_led_changed)
  
   # Start the client
   client.start()


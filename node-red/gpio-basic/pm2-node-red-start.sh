#! /bin/sh
#
# This is script must be used to launch Node-RED if you need to pre-configure
# any of the GPIOs
#

GPIOCHIP=4
GPIOLINE=15

# Set the GPIO as pull-up
/usr/bin/gpioget -B pull-up gpiochip${GPIOCHIP} ${GPIOLINE}

# Launch Node-RED
SCRIPT_PATH="$(realpath $0)"
NODE_RED_FOLDER="$(dirname $SCRIPT_PATH)"
/usr/bin/node-red -v --userDir ${NODE_RED_FOLDER} --max-old-space-size=128


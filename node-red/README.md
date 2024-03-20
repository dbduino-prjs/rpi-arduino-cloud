## The setup


## GPIOD nodes
In all the projects in this repository, we are using `libgpiod` and the different wrappers and bindings for the variuos programming languages to interact with the RPI GPIOs. There are many other projects and libraries that can be used, but this is the most portable one across all the Raspberry Pi flavours and it can also be extrapolated to any Linux-based machine.

In this project, we are going to use `node-red-contrib-libgpiod` which is the 

Go to the menu "Manage Palette" --> "Install". Search the following nodes and install them. 

@arduino/node-red-contrib-arduino-iot-cloud
node-red-contrib-libgpiod

## Configure the access to Arduino Cloud

## How to install Node-RED
There are many ways to install Node-RED in a Raspberry Pi or any other machine. Typically, you can use: docker, snap, apt, native node.js installation.
The tricky point is that we want our Node-RED instance to have access to the GPIOs and host system. This can be achieved with all the installation methods but for most of them it is quite difficult to achieve and many conflicts and issues need to be solved. So, the easiest and recommended way would be to do a native installation using NPM.

These are the instructions
1. Installation
```
sudo npm install -g --unsafe-perm node-red
```
2. Manage the service
I recommend using pm2 to manage the service and make it start on boot 
```
sudo npm install -g pm2
pm2 start /usr/bin/node-red -- -v
pm2 save
sudo env PATH=$PATH:/usr/bin $(which pm2) startup systemd
```



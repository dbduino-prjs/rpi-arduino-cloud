# Raspberry PI GPIO Basic control with Python using Arduino Cloud

This project shows how to interact with the Raspberry Pi GPIOs from a dashboard created using Arduino Cloud with an application programmed in Python. It can serve as an example to create your own applications that require access to RPI GPIOs and that can be ultimately controlled using a dashboard. 

## The setup

In this project I have used a Raspberry Pi 5 connected to an LED and a push button, both inserted in a breadboard. This is the diagram

<TBD: Diagram>

> Note: This project should work with any Raspberry Pi version and actually with any Linux-based machine that supports libgpiod. Please, drop your comments in **Issues** if it does not work with your board in order to review it.

## How to create your project

The process to use this project is very straighforward:
1. Create the Device and Thing in the Arduino Cloud and get the Arduino Cloud API Key
2. Create your python environment
3. Develop the python application
4. Create the Arduino Cloud dashboard
5. Test everything

## 1. Create the Device and Thing in the Arduino Cloud

> Note: Before getting started, make sure that you have an [Arduino Cloud account](https://cloud.arduino.cc/home/?get-started=true)

### Create the Device 
Go to the [Devices](https://app.arduino.cc/devices) section of the Arduino IoT Cloud and click on **+ DEVICE**. 

Select **Any Device** and follow the instructions on the wizard.

> Note: Save your `Device ID` and `Secret Key` as they will be used in your python code.

### Create the Thing 
In you recently created device page, go to the Associated Thing section, click on **Create Thing** and rename it.

> Note: You can also create the Thing from the [Things list](https://app.arduino.cc/things) and associate it later.

### Create the Variables 
Add the variables by clicking on the ADD button. At the end of the process, your list of variables should look like this.

| Name                | Type       | Description |
|---------------------|------------|-------------|
| button              | Boolean    | It will hold the status of the physical button |
| led                 | Boolean    | The variable that we will use to act over the physical LED |
| test_value          | Integer    | This is a value that will change periodically in the application |

> Note: All the variables have to be READ-WRITE. You can define the periodicity you wish or set them with the policy ON-CHANGE.*

This is a screenshot for reference.

![Arduino Cloud variables](assets/Tuya-Energy_Meter-variables.png)

<TBD: Dashboard>

## 2. Create your python environment

Now it is time to install the python dependencies in order to use Arduino Cloud. You have a [full tutorial](https://docs.arduino.cc/arduino-cloud/guides/python/) that describes the process in detail.

It can be summarized as follows:
1. Install GPIOD library in the system
2. Install the Python GPIOD package
3. Install the Python Arduino Cloud packages

### Install GPIOD library in the system

First, you have to install library in the system. If you are using Ubuntu or any other Debian-based machine, you can follow these instructions

```
sudo apt install gpiod libgpiod-dev libgpiod2 python3-libgpiod
```

### Install the GPIOD Python package using PIP
Next, you have to install the PIP package. For that, my recommendation is that you install it in an isolated virtual environment. So you have to install the following packages

```
sudo apt install python3-pip python3-virtualenv
```

To create and activate the virtual environment, use the following code

```
cd <YOUR_PROJECT_FOLDER>
virtualenv venv
source venv/bin/activate
```

Install the package
```
pip install xxxxx
```

### Install Arduino Cloud python packages

To install the Arduino IoT Cloud client library, you only have to do the following:

```
pip install arduino-iot-cloud swig
```

## 3. Develop the python application

Use your favourite programming environment and edit the `gpio-basic.py` file.

Create a file called `credentials.py` inside the `gpio-basic` folder with the following content
```
DEVICE_ID = b"YOUR_DEVICE_ID"
SECRET_KEY = b"YOUR_SECRET_KEY"
```

If you are using a different Raspberry Pi flavour or any other machine, you should check which is the right chipset and which are the lines that you want to use. Then, modify the following lines accordingly:

```
LED=14      # GPIO14, Pin 8
BUTTON=15   # GPIO15, Pin 10 
chip = gpiod.Chip('/dev/gpiochip4') 
```

If you want to learn more, check the [Annex](https://github.com/dbduino-prjs/rpi-arduino-cloud/blob/develop/python/gpio-basic/README.md#notes) at the end of this doc.

## 4. Create the Arduino Cloud dashboard

<TBD: Dashboard>

## 5. Test everything

Run your code

```
(venv)sxxx$ python ./gpio-basic.py
```

You should see the following:
* Every time push the button, the button widget should be updated
* Every time you change the LED widget in the dashboard, the physical LED should switch to ON or OFF
* The value of `test_value` should change randomly every 10s and the value updated in the dashboard

Enjoy!

## Additional information
### Arduino Cloud
[Arduino Cloud](https://cloud.arduino.cc/) is a platform that simplifies the process of developing, deploying, and managing IoT devices. It supports various hardware, including Arduino boards, ESP boards and any device programmed with Python or Javascript. It makes it easy for makers, IoT enthusiasts, and professionals to build connected projects without high programming skills.

The platform allows for easy management and monitoring of connected devices through customizable dashboards, which provide real-time visualisations of the device's data. The dashboards can be accessed remotely through the mobile app Arduino IoT Cloud Remote, which is available for both Android and iOS devices, allowing users to manage their devices from anywhere.

#### Clone the dashboard using Cloud CLI

As described in the tutorial, you can create the dashboard on your own, but here I will show you a very handy trick so that you can just make a copy of a template that I have created. For that, you need to use [Arduino Cloud CLI](https://docs.arduino.cc/arduino-cloud/arduino-cloud-cli/getting-started/).

The steps are the following:
1. Download and extract the latest release.
Download it from [here](https://github.com/arduino/arduino-cloud-cli/releases)
Make sure it is in your machine's PATH, so that it can be used globally.
After installation, check that it is working by opening a terminal, and type:

2. Set your credentials
To authenticate with the Arduino Cloud, we will need to first set our credentials, using our clientId and clientSecret which are obtained from the Arduino Cloud [API keys section](https://app.arduino.cc/api-keys). Run the following command and introduce the credentials:
```
arduino-cloud-cli credentials init
```

3. Create the dashboard

```
arduino-cloud-cli dashboard create \
		--name <Your-Dashboard_Name> \ 
		--template rpi-gpio-basic-dashboard.yaml \ 
		--override Raspberry-Basic-GPIO=<Your-Thing-ID>
```
Replace *\<Your-Dashboard-Name\>* and *\<Your-Thing-ID\>* with your actual data.

### GPIOs and Raspberry Pi
There are many GPIO libraries that can be used with Raspberry Pis. Among some of the most popular, we can find: gpiozero, gpiod, RPi.GPIO. One of the issues that I found is that some of the libraries only work for certain versions of RPI. For instance, the new RPI 5, has a brand new chipset for managing GPIOs, and not all the libraries work for it.

After a lot of googling and searching, I ended up using *gpiod* as it is the one supported by the Linux kernel team directly and it can be used across all the RPI flavours.

#### **GPIOD** library

##### Installation
First, you have to install library in the system.
If you are using Ubuntu or any other Debian-based machine, you can follow these instructions

```
sudo apt install gpiod libgpiod-dev libgpiod2 python3-libgpiod
```

Next, you have to install the PIP package, for that, my recommendation is that you install it in an isolated virtual environment. So, you have to install the following packages

```
sudo apt install python3-pip python3-virtualenv
```

To create and activate the virtual environment, use the following code

```
cd <YOUR_PROJECT_FOLDER>
virtualenv venv
source venv/bin/activate
```

##### Notes
The GPIOD library has evolved quite a lot in time. The versions before 2.0.0 have a different API than the newer ones. This project is based on the API and syntax of version v2.1.3. 

These are the official pages of the Python package:
* https://pypi.org/project/gpiod/
* https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/tree/bindings/python 
* https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/about/

If you want to check what is the gpiochip and line that you have to use in the code, you can use the following command line commands.

This is an example of the output in a Raspberry PI 5
```
$ sudo gpiodetect 
gpiochip0 [gpio-brcmstb@107d508500] (32 lines)
gpiochip1 [gpio-brcmstb@107d508520] (4 lines)
gpiochip2 [gpio-brcmstb@107d517c00] (17 lines)
gpiochip3 [gpio-brcmstb@107d517c20] (6 lines)
gpiochip4 [pinctrl-rp1] (54 lines)
$
$ sudo gpioinfo gpiochip4
gpiochip4 - 54 lines:
	line   0:      "ID_SD"       unused   input  active-high 
	line   1:      "ID_SC"       unused   input  active-high 
	line   2:       "PIN3"       unused   input  active-high 
	line   3:       "PIN5"       unused   input  active-high 
	line   4:       "PIN7"       unused   input  active-high 
	line   5:      "PIN29"       unused   input  active-high 
	line   6:      "PIN31"       unused   input  active-high 
	line   7:      "PIN26"   "spi0 CS1"  output   active-low [used]
	line   8:      "PIN24"   "spi0 CS0"  output   active-low [used]
	line   9:      "PIN21"       unused   input  active-high 
	line  10:      "PIN19"       unused   input  active-high 
	line  11:      "PIN23"       unused   input  active-high 
	line  12:      "PIN32"       unused   input  active-high 
	line  13:      "PIN33"       unused   input  active-high 
	line  14:       "PIN8" "rpi-acloud-gpio-basic" output active-high [used]
	line  15:      "PIN10"       unused   input  active-high 
	line  16:      "PIN36"       unused   input  active-high 
	line  17:      "PIN11"       unused   input  active-high 
	line  18:      "PIN12"       unused   input  active-high 
	line  19:      "PIN35"       unused   input  active-high 
	line  20:      "PIN38"       unused   input  active-high 
	line  21:      "PIN40"       unused   input  active-high 
	line  22:      "PIN15"       unused   input  active-high 
	line  23:      "PIN16"       unused   input  active-high 
	line  24:      "PIN18"       unused   input  active-high 
	line  25:      "PIN22"       unused   input  active-high 
	line  26:      "PIN37"       unused   input  active-high 
	line  27:      "PIN13"       unused   input  active-high 
	line  28: "PCIE_RP1_WAKE" unused input active-high 
	line  29:   "FAN_TACH"       unused   input  active-high 
	line  30:   "HOST_SDA"       unused   input  active-high 
	line  31:   "HOST_SCL"       unused   input  active-high 
	line  32:  "ETH_RST_N"  "phy-reset"  output   active-low [used]
	line  33:          "-"       unused   input  active-high 
	line  34: "CD0_IO0_MICCLK" "cam0_reg" output active-high [used]
	line  35: "CD0_IO0_MICDAT0" unused input active-high 
	line  36: "RP1_PCIE_CLKREQ_N" unused input active-high 
	line  37:          "-"       unused   input  active-high 
	line  38:    "CD0_SDA"       unused   input  active-high 
	line  39:    "CD0_SCL"       unused   input  active-high 
	line  40:    "CD1_SDA"       unused   input  active-high 
	line  41:    "CD1_SCL"       unused   input  active-high 
	line  42: "USB_VBUS_EN" unused output active-high 
	line  43:   "USB_OC_N"       unused   input  active-high 
	line  44: "RP1_STAT_LED" "PWR" output active-low [used]
	line  45:    "FAN_PWM"       unused  output  active-high 
	line  46: "CD1_IO0_MICCLK" "cam1_reg" output active-high [used]
	line  47:  "2712_WAKE"       unused   input  active-high 
	line  48: "CD1_IO1_MICDAT1" unused input active-high 
	line  49: "EN_MAX_USB_CUR" unused output active-high 
	line  50:          "-"       unused   input  active-high 
	line  51:          "-"       unused   input  active-high 
	line  52:          "-"       unused   input  active-high 
	line  53:          "-"       unused   input  active-high 

```

Check the full documentation of libgpiod and the command line tools [here](https://github.com/brgl/libgpiod).

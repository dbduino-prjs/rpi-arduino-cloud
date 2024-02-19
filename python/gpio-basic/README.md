# rpi-arduino-cloud


## GPIOs and Raspberry Pi
There are many GPIO libraries that can be used with Raspberry Pis. Among some of the most popular, we can find: gpiozero, gpiod, RPi.GPIO. One of the issues that I found is that some of the libraries only work for certain versions of RPI. For instance, the new RPI 5, has a brand new chipset for managing GPIOs, and not all the libraries work for it.

After a lot of googling and searching, I ended up using *gpiod* as it is the one supported by the Linux kernel team directly and it can be used across all the RPI flavours.

### **GPIOD** library

#### Installation
First, you have to install library in the system.
If you are using Ubuntu or any other Debian-based machine, you can follow these instructions

```
sudo apt install gpiod libgpiod-dev libgpiod2 python3-libgpiod
```

Next, you have to install the PIP package, for that my recommendation is that you install it in an isolated virtual environment. So, you have to install the following packages

```
sudo apt install python3-pip python3-virtualenv
```

To create and activate the virtual environment, use the following code

```
cd <YOUR_PROJECT_FOLDER>
virtualenv venv
source venv/bin/activate
```

#### Notes
The GPIOD library has evolved quite a lot in time. The versions before 2.0.0 have a different API than the newer ones. This project is based on the API and syntax of version v2.1.3. 

These are the official pages of the Python package:
* https://pypi.org/project/gpiod/
* https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/tree/bindings/python 
* https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/about/

If you want to check what is the gpiochip and line that you have to use in the code, you can use the following command line commands.

This is the output in a Raspberry PI 5
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
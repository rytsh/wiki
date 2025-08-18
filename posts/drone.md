# Drone

Notes about drone/plane components.

## ExpressLRS (ELRS)

Power receiver with 5V and after 60 seconds it will open wifi network so we can go there and set bind value.

Usually in there connect to home network so not need to switching networks.  
For receiver module not need to update firm, just leave it.

In transmitter, connect to radio controller with USB and select Serial Port connection (VCP).  
Probably fail to find driver in windows and install it here.

> https://www.rcgroups.com/forums/attachment.php?s=f3cb7a8b731f0ca22703e04cd34846e7&attachmentid=12652055

Than open the ExpressLRS Configurator (https://github.com/ExpressLRS/ExpressLRS-Configurator/releases) and select your model of the transmittter after that write bind value as same with receiver.

Than flash it to transmitter. After that download LUA script and put it into SD card in the controller.

Run that LUA script and you will see it is `C` status in the top right (radiomaster).

## INAV & Betaflight

When formatting to flight controller we need switch in boot mode but we see there could be some problem and working than install ImpulseRC Driver Fixer and run it.

> https://impulserc.com/pages/downloads

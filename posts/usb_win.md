# USB device to WSL

> https://learn.microsoft.com/en-us/windows/wsl/connect-usb

Basically we need to install a program and that program attaching to WSL.

> https://github.com/dorssel/usbipd-win/releases

After install open in admin mode and run the following command:

```sh
usbipd.exe list

Connected:
BUSID  VID:PID    DEVICE                                                        STATE
1-1    303a:1001  USB Serial Device (COM4), USB JTAG/serial debug unit          Attached
1-2    0b05:1ace  USB Input Device                                              Not shared
1-5    8087:0029  Intel(R) Wireless Bluetooth(R)                                Not shared
1-6    0b05:18f3  AURA LED Controller, USB Input Device                         Not shared
2-3    1532:054a  Razer Leviathan V2 X                                          Not shared
2-6    047f:c058  Plantronics Blackwire 3225 Series, USB Input Device           Not shared
3-1    046d:08e5  HD Pro Webcam C920                                            Not shared
3-3    19f5:fe70  USB Input Device                                              Not shared

Persisted:
GUID                                  DEVICE
```

Than bind and attach with BUSID in here I used `1-1`

```sh
usbipd.exe bind -b <BUSID>
usbipd.exe attach -b <BUSID>

# for detach
usbipd.exe detach --busid <BUSID>
```

This way you can flash the microcontroller over USB from within WSL.

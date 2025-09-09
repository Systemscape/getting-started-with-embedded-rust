# RP2350 MCU Flashing Methods

There are three main ways to flash firmware onto an RP2350 microcontroller, each with different prerequisites and use cases. 
You can either flash it using the RP2350-built-in bootloader by dragging & dropping the `.uf2` file to the mounted drive, by using the [picotool](https://github.com/raspberrypi/picotool/) tool to talk to the bootloader directly, or by using a hardware debugger or second Pico for programming and debugging over an Serial-Wire-Debug (SWD) connection. The methods are detailed below.

Depending on your preference, you will then learn how to install the tools for these methods in the next chapter. We recommend trying Method 1 first, as it is the easiest to use and doesn't require any installation and setup the other methods later if you need to.

## Method 1: Online Conversion

This method requires no software installation and works entirely through a web browser and your system's file manager.

**Prerequisites:** None

**Steps:**
1. Take your `.elf` file
2. Go to [elf2uf2.yrust.de](https://elf2uf2.yrust.de/)[^1]
3. Upload and convert to `.uf2`
4. Put RP2350 into boot mode:
   - Hold **BOOTSEL** button
   - Power on
   - Release **BOOTSEL**
5. Drag & drop the `.uf2` file to the mounted drive
6. Device will automatically reset and run

## Method 2: Bootloader and picotool

This method uses the official Raspberry Pi tool for direct flashing.

**Prerequisites:** [picotool](https://github.com/raspberrypi/picotool/) installed

**Steps:**
1. Put RP2350 into boot mode:
   - Hold **BOOTSEL** button
   - Power on
   - Release **BOOTSEL**
2. Flash directly with picotool:
   ```bash
   picotool load -u -v -x -t elf your_file.elf
   ```
3. Device will automatically reset and run

## Method 3: Debug Probe

This method uses a hardware debugger or second Pico for programming and debugging.

**Prerequisites:** Debugger or second Pico + [probe-rs](https://probe.rs/) installed

**Steps:**
1. Connect debugger or second Pico to target RP2350
2. Flash and run with probe-rs:
   ```bash
   probe-rs run --chip RP235x --protocol swd your_file.elf
   ```
3. Device will be programmed and start running automatically

## Additional Notes

To erase the flash, you can use `picotool erase` or drag & drop the flash nuke utility: [flash_nuke.uf2](https://datasheets.raspberrypi.com/soft/flash_nuke.uf2) (direct download, 96 kB)

[^1]: Our online tool [elf2uf2.yrust.de](https://elf2uf2.yrust.de/) simply executes `picotool uf2 convert your_file.elf your_file.uf2` - it's equivalent to having picotool installed locally but runs in the browser.
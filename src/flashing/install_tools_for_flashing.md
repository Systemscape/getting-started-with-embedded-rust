# Install tools for flashing

## Method 1: RP2350-built-in bootloader via drag & drop

As described in the previous chapter, you don't need to install any tools to flash the RP2350 using the RP2350-built-in bootloader if you use our online conversion method at <a href="https://elf2uf2.yrust.de/" target="_blank">elf2uf2.yrust.de</a>. If you prefer to convert it locally though, you will need to install `picotool`, as described in the next paragraph.

## Method 2: RP2350-built-in bootloader with picotool

The RP2040 and RP2350 have a built-in bootloader that presents the device as a USB drive when you plug it in with the BOOTSEL button pressed. You can copy a `.uf2` file to that drive to flash new firmware . For this, it’s helpful to install [picotool](https://github.com/raspberrypi/picotool/), a utility from Raspberry Pi that can convert binaries to UF2 and upload them. You can download a pre-built picotool binary from the [releases page](https://github.com/raspberrypi/picotool/releases) for your OS or build it from source.
Their docs state that _You cannot just copy the binary into your PATH, else the Pico SDK will not be able to locate it._, however, if you only want to use the RP2350 with Rust code and don't plan on using the SDK, you absolutely can just copy the picotool binary to your PATH.

With picotool installed, you can now flash the RP2350 (given that the bootsel button is pressed when plugging it in) using:
```bash
picotool load -u -v -x -t elf your_file.elf
```
you can also convert `.elf` files to `.uf2` files using:
```bash
picotool uf2 convert your_file.elf your_file.uf2
```

## Method 3: Probe-based flashing (SWD)
Using an external debug probe or a second Pico as a probe, you can flash and debug the chip directly via the SWD interface. For this, we use **probe-rs**, a Rust project that replaces OpenOCD/GDB. We recommend installing using the [recommended install scripts](https://probe.rs/docs/getting-started/installation/), which provides the probe-rs CLI and associated tools:
```bash
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/probe-rs/probe-rs/releases/latest/download/probe-rs-tools-installer.sh | sh
```
This gives you commands like probe-rs flash and also includes probe-run (for running programs with semi-hosted debugging). _(If you’re curious: probe-rs is a pure-Rust implementation of the ARM debugging protocol and works with CMSIS-DAP, J-Link, etc. It makes flashing and even debuggingfirmware straightforward.)_

## (optional) Install cargo-generate
We will use cargo-generate to quickly bootstrap projects from templates. Install it with:
```bash
cargo install cargo-generate
```
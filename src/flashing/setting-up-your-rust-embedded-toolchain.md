# Setting Up Your Rust Embedded Toolchain

Before writing any code, we need to configure our development environment for cross-compiling to the RP2350 microcontroller. The RP2350 is a **dual-core ARM Cortex-M33** microcontroller (with some special features we’ll discuss later). Rust, via `rustup`, can target this architecture easily.

1. **Install Rust (stable)** if you haven’t already, via [rustup](https://rustup.rs/). Ensure you also have Cargo, which comes with Rust.
2. **Update Rust** to the latest stable version and self-update rustup (to avoid any surprises):
    ```bash
    rustup self update  
    rustup update stable
    ```
3. **Add the target for RP2350:** The Cortex-M33 core uses the ARMv8-M architecture with hardware floating-point. The correct Rust target triple is `thumbv8m.main-none-eabihf`. We’ll add that, and for completeness also add the ARMv6-M target used by older Pico (RP2040) and the RISC-V target (the RP2350 has a RISC-V mode, as we’ll mention). Run:
    ```bash
    rustup target add thumbv6m-none-eabi # (for RP2040, if needed)
    rustup target add thumbv8m.main-none-eabihf # RP2350 Arm Cortex-M33
    rustup target add riscv32imac-unknown-none-elf # (RP2350 RISC-V mode)
    ```
    > **Note:** The RP2350 is unique in that each core can actually run as either an ARM Cortex-M33 or a RISC-V core (Hazard3) – a novel feature where the core type can be swapped at runtime . In this guide we’ll focus on the standard Cortex-M (ARM) mode. The RISC-V target is added just in case and for future exploration.

With these tools you will already be able to turn valid Rust code into a `.elf` file, which you can then flash onto the RP2350 using the methods described in the next chapter.
---
layout: post
title: Acoustic Event Detection for Illegal Logging Prevention using Spectral Analysis and LoRa Technology
description: >-
  Undergraduate thesis. A battery-powered Raspberry Pi Pico (RP2040) sensor node listens for 2-stroke
  chainsaws, classifies the sound on the device with a TinyML model, and sends an alert over LoRa
  without cellular or internet service. Working prototype.
skills:
  - RP2040
  - C++
  - Edge Impulse / TinyML
  - DSP (FFT, MFE)
  - LoRa (SX1276, SPI)
  - Li-ion battery power
main-image: /nodes-side-by-side.jpg
---

**Team:** Paco, Cabatino, Dador  
**My role:** Hardware and firmware development  
**Status:** Working prototype. PCB, antenna upgrades, enclosures and field testing are ahead.

## Problem
Remote forests often lack cellular coverage, and satellite monitoring detects forest loss only after
it happens.

## Solution
A sensor node listens for 2-stroke chainsaws, classifies the sound on the device, and sends an alert
over LoRa without cellular or internet service.

## How it works
{% include image-gallery.html images="node-diagram.svg" height="300" %}

1. A GY-MAX4466 microphone captures ambient sound.
2. A Raspberry Pi Pico (RP2040) samples the audio using DMA.
3. FFT-based Mel-filterbank energy (MFE) features are extracted.
4. A quantized int8 CNN, built in Edge Impulse, classifies three classes: chainsaw, noise, and unknown.
5. An SX1276 LoRa module sends the alert peer-to-peer at 923 MHz.
6. A Pico and LoRa receiver connects to a laptop over USB.

## Hardware
{% include image-gallery.html images="schematic-transmitter.png, schematic-receiver.png" height="300" %}
<span style="font-size: 12px">Transmitter (left) and receiver (right) schematics, drawn in EasyEDA.</span>

- **Power:** each node runs from an 18650 Li-ion cell charged through a TP4056 USB-C module. The TP4056
  output feeds the Pico's VSYS input through a 1N4007 diode, and the Pico's 3.3 V output powers the
  microphone and LoRa modules.
- **Audio:** the MAX4466 output feeds the RP2040's ADC (GP26 / ADC0).
- **Radio:** the SX1276 connects over SPI (GP16 to GP19), with DIO0 and RST on GP20 and GP21.

{% include image-gallery.html images="transmitter-node.jpg, receiver-node.jpg" height="420" %}
<span style="font-size: 12px">Transmitter node (left) and receiver node (right) on breadboard.</span>

## Design targets
These are design targets, not measured results yet:

- Detection radius of 80–150 m per node
- LoRa link of up to 1 km

## Engineering challenge
The transmitter gave false alerts in rain. The planned fix is to record rain audio through the
transmitter itself and add it to the classifier's training data.

## Next steps
- PCB design
- Better antennas
- Enclosures
- Field testing
- Receiver dashboard: live status, alert log, signal strength, node location, and alarm

## Build log
{% include image-gallery.html images="transmitter-breadboard.jpg, lora-module-soldered.jpg" height="380" %}
{% include image-gallery.html images="bench-testing.jpg" height="420" %}
<span style="font-size: 12px">Early transmitter breadboard, soldered LoRa module leads, and bench testing both nodes.</span>

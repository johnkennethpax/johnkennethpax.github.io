---
layout: post
title: Acoustic Event Detection for Illegal Logging Prevention
description: >-
  Undergraduate thesis (in progress). A pair of battery-powered Raspberry Pi Pico (RP2040) nodes:
  a transmitter that listens for chainsaw sounds using on-device FFT, and a receiver that gets
  alerts over a LoRa point-to-point link, designed for a 1 km off-grid range in Barangay Mandulog.
skills:
  - Raspberry Pi Pico (RP2040)
  - C++ / Arduino
  - FFT (arduinoFFT)
  - LoRa (SX1276) over SPI
  - Sensor interfacing
  - Battery power design
main-image: /nodes-side-by-side.jpg
---

**Status:** In progress, undergraduate thesis, BS Electrical Engineering, St. Peter's College.
The nodes are currently breadboard prototypes; field-test results will be added once available.

{% include image-gallery.html images="nodes-side-by-side.jpg" height="420" %}

## Problem
Illegal logging in remote forest areas is hard to catch in time because there is no grid power
or cellular coverage where it happens. The goal is a low-cost sensor node that can hear a
chainsaw and raise an alert from off-grid.

## My role
I led the hardware design, firmware development, and system integration of the sensor nodes.

## System overview
{% include image-gallery.html images="node-diagram.svg" height="260" %}

The system has two nodes built on the same power and radio core:

- **Transmitter node:** Raspberry Pi Pico + GY-MAX4466 microphone module + SX1276 LoRa module.
  It samples audio, runs the detection, and sends an alert.
- **Receiver node:** Raspberry Pi Pico + SX1276 LoRa module. It receives and reports alerts.

## Hardware
{% include image-gallery.html images="schematic-transmitter.png, schematic-receiver.png" height="300" %}
<span style="font-size: 12px">Transmitter (left) and receiver (right) schematics, drawn in EasyEDA.</span>

### Power
Each node runs from an 18650 Li-ion cell charged through a TP4056 USB-C charging module. The
TP4056 output feeds the Pico's VSYS input through a 1N4007 diode, and the Pico's onboard
3.3 V output (3V3_OUT) powers the microphone module and the LoRa module.

### Audio acquisition
The MAX4466 microphone amplifier output feeds the RP2040's ADC (GP26 / ADC0).

### Radio
The SX1276 LoRa module connects to the Pico over SPI (MISO, CS, SCK, MOSI on GP16 to GP19),
with DIO0 and RST on GP20 and GP21.

{% include image-gallery.html images="transmitter-node.jpg, receiver-node.jpg" height="420" %}
<span style="font-size: 12px">Transmitter node (left) and receiver node (right) on breadboard.</span>

## Firmware
- **Detection:** a Fast Fourier Transform using `arduinoFFT.h` isolates chainsaw frequencies,
  kept within the microcontroller's memory limits.
- **Alerting:** a LoRa point-to-point (P2P) link sends real-time telemetry alerts to the
  receiver, designed for a 1 km off-grid range in Barangay Mandulog.

## Build log
{% include image-gallery.html images="transmitter-breadboard.jpg, lora-module-soldered.jpg" height="380" %}
{% include image-gallery.html images="bench-testing.jpg" height="420" %}
<span style="font-size: 12px">Early transmitter breadboard, soldered LoRa module leads, and bench testing both nodes.</span>

## Next steps
- Field testing for detection accuracy and LoRa range
- Moving from breadboard to a soldered or PCB build with an outdoor enclosure

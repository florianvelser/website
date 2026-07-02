---
title: "Automotive IoT: Reverse-Engineering & Telemetry Integration"
image: "projects/automotive_iot.png"
description: "Extracted real-time vehicle telemetry by reverse-engineering a proprietary CAN-Bus network through a 100% reversible hardware harness. Developed a secure WireGuard VPN and MQTT pipeline to stream live diagnostics into a Home Assistant smart dashboard, leveraging LLMs for automated payload analysis."
order: 2
---

<p><strong>Short description:</strong></p>
<div class="modal-desc">Developed an end-to-end hardware-to-cloud IoT pipeline to extract, securely transmit, and visualize real-time vehicle diagnostics from a legacy CAN-Bus network. By combining custom hardware isolation, LLM-driven differential data analysis, and encrypted WAN routing, I achieved a fully automated telemetry stream into a centralized smart dashboard.</div>
<br>
<p><strong>More Details:</strong></p>
<p>
<h4>Physical Layer & Hardware Integration</h4>
Designed and implemented a 100% non-destructive, reversible hardware installation using a custom Quadlock passthrough adapter behind the vehicle's head unit. This allowed safe, isolated access to the 12V, GND, CAN High, and CAN Low communication lines without altering factory wiring. The signals were routed to a secondary OBD-II port acting as a physical-to-digital bridge via a WiCAN Pro hardware transceiver.
</p>
<p>
<h4>Smart Reverse Engineering & Differential Analysis</h4>
Replaced traditional, time-consuming manual byte monitoring with an advanced AI-assisted engineering workflow. Baseline CAN frame dumps were captured under varying operational states and processed using a Large Language Model (LLM) for pattern recognition. This successfully isolated proprietary CAN IDs, endianness (Little Endian), byte configurations, and scaling factors. Hardware-level acceptance masks and filters were then deployed to block bus noise at the edge.
</p>
<p>
<h4>Secure WAN Telemetry & Network Automation</h4>
Established a robust edge-to-cloud wide-area network path to ensure continuous data transmission outside local Wi-Fi range. An automated script triggers a smartphone hotspot instantly upon Apple CarPlay connection. The WiCAN Pro automatically connects to this link, routing lightweight MQTT telemetry payloads through an encrypted WireGuard VPN tunnel on a public VPS directly to the local home automation instance.
</p>
<p>
<h4>Full-Stack IoT Dashboard & Parsing</h4>
Configured custom YAML parsing at the ingestion layer to convert raw, filtered CAN-Bus payloads into accurate entity states and functional variables. The resulting telemetry metrics (such as fuel level and odometer readings) are displayed in real-time on a localized Home Assistant dashboard, enabling seamless system automation and historical data tracking.
</p>
<h4>Tech Stack</h4>
<ul>
    <li>Hardware & Protocols: CAN-Bus, OBD-II, WiCAN Pro, Custom Quadlock Passthrough</li>
    <li>Networking & Security: WireGuard VPN, VPS, MQTT, Edge-Filtering / Masking</li>
    <li>Automation & Analysis: Home Assistant, LLM Pattern Recognition, Apple CarPlay / iOS Shortcuts</li>
</ul>
<br>
<h4>Key Achievements</h4>
<ul>
    <li><b>Innovation:</b> Accelerated proprietary protocol decoding by combining differential data harvesting with LLM pattern recognition.</li>
    <li><b>Security & Protection:</b> Ensured complete vehicle asset protection with a 100% reversible physical installation and strict WireGuard network encapsulation.</li>
    <li><b>Full-Stack Fluency:</b> Successfully bridged the gap between low-level automotive physical layers, secure cloud networking, and high-level home automation ecosystems.</li>
</ul>
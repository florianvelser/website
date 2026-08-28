---
title: "Desk Display for Environmental Monitoring"
image: "projects/images/desk-display.jpg"
description: "Designed and built a compact ESP8266-based desk display that provides real-time visibility of environmental data from a separate Home Assistant monitoring station. The project combines embedded development, custom UI design, iterative CAD prototyping in FreeCAD, and 3D printing to transform a breadboard prototype into a polished everyday device."
order: 2
---

<p><strong>Short description:</strong></p>
<div class="modal-desc">Designed and built a compact environmental monitoring display for my desk, providing real-time visibility of temperature, humidity, CO₂, and particulate matter data from a separate monitoring station. The project combines ESPHome and Home Assistant integration with custom embedded UI design, iterative CAD development in FreeCAD, and rapid 3D-print prototyping.</div>
<br>
<p><strong>More Details:</strong></p>

<p>
<h4>Embedded Display & Home Assistant Integration</h4>
Developed a compact desk display based on an <b>ESP8266 Wemos D1 Mini</b>, chosen for its strong price-to-performance ratio and compact form factor. The device retrieves environmental sensor data provided as entities through Home Assistant and displays temperature, humidity, CO₂ concentration, and particulate matter on a <b>128×128 monochrome OLED display</b>. All relevant information is presented simultaneously on a single screen using a custom-designed layout, allowing the current room conditions to be checked at a glance.
</p>

<p>
<h4>Purpose-Built Visual CO₂ Indicator</h4>
Implemented an RGB LED as an ambient air-quality indicator based on the current CO₂ level. Instead of using a continuous color gradient, the system deliberately uses three discrete states: <b>green, yellow, and red.</b> This design decision makes state changes immediately noticeable in peripheral vision. A sudden transition between colors is significantly easier to recognize than a gradual color change, providing an intuitive reminder when it is time to ventilate the room.
</p>

<p>
<h4>Custom CAD Design & Iterative Prototyping</h4>
Designed the complete enclosure specifically for this project using <b>FreeCAD</b>, making it my first full CAD project. The design went through multiple iterations to optimize component placement, fit, and overall appearance. Rather than repeatedly printing the complete enclosure, individual components were prototyped separately to reduce material usage and iteration time.
</p>

<p>
For example, individual prototypes were created for the enclosure frame, the mounting system for the Wemos D1 Mini, and the RGB LED holder. A dedicated test piece containing multiple hole diameters was designed and printed to determine the optimal LED fit, ensuring that it remained securely mounted without being compressed or slipping.
</p>

<p>
<h4>Manufacturing Tolerances & Physical Iteration</h4>
One of the main practical challenges was compensating for differences between CAD dimensions and the actual dimensions produced by the 3D printer. Components designed with exact measurements could differ by several tenths of a millimeter after printing, requiring additional iterations and dimensional adjustments. This introduced practical experience with manufacturing tolerances and demonstrated the importance of validating digital designs against real-world physical results.
</p>

<p>
<h4>From Breadboard Prototype to Finished Product</h4>
The project originated from a functional display prototype that had already been running for several months on a breadboard. The goal was to transform this temporary setup into a compact and visually integrated device suitable for permanent use on a desk. The final enclosure hides the internal wiring and soldered connections while providing a significantly cleaner and more polished appearance than the original prototype.
</p>

<h4>Tech Stack</h4>
<ul>
    <li>Embedded / IoT: ESP8266, Wemos D1 Mini, ESPHome</li>
    <li>Integration: Home Assistant</li>
    <li>Display: 128×128 OLED, SSD1306 over I²C</li>
    <li>Hardware: RGB LED, soldered and wired component integration</li>
    <li>CAD & Prototyping: FreeCAD, 3D Printing</li>
</ul>

<br>

<h4>Key Achievements</h4>
<ul>
    <li><b>Usability:</b> Transformed environmental data from a hidden monitoring station into an always-visible, compact desk display.</li>
    <li><b>UX Design:</b> Designed a discrete RGB state system that makes CO₂ threshold changes immediately noticeable through peripheral vision.</li>
    <li><b>Rapid Prototyping:</b> Reduced material waste and iteration time by testing individual enclosure components instead of repeatedly printing the complete design.</li>
    <li><b>Engineering:</b> Successfully compensated for real-world 3D-print manufacturing tolerances through iterative measurement and design adjustments.</li>
    <li><b>Product Development:</b> Converted a long-running breadboard prototype into a purpose-built, permanently deployed device with a custom-designed enclosure.</li>
</ul>
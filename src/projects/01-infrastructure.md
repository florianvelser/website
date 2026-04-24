---
title: "CI/CD Pipeline and Infrastructure as Code"
image: "projects/infrastructure.png"
description: "Automated a full CI/CD pipeline using GitHub Actions and Watchtower for containerized deployments. I modularized the infrastructure by migrating to a version-controlled 'Service Include' architecture, significantly reducing manual overhead and improving system maintainability."
order: 1
---

<p><strong>Short description:</strong></p>
<div class="modal-desc">Developed a robust, automated deployment pipeline and container
    orchestration system to eliminate manual intervention and enforce security best
    practices. By leveraging GitHub Actions, Docker, and Security-Scanning tools, I
    achieved a fully hands-off "Commit-to-Production" workflow with integrated
    vulnerability management.</div>
<br>
<p><strong>More Details:</strong></p>
<p>
<h4>CI/CD Pipeline & Container Orchestration</h4>
Implemented a streamlined pipeline using GitHub Actions. Upon merging to the main
branch, the system triggers an automated build process, containerizes the
application, and publishes the image to the <b>GitHub Container Registry (GHCR).</b>
</p>
<p>
<h4>Security-First Development (DevSecOps):</h4>
Integrated Trivy into the CI workflow to perform automated vulnerability scans on
container images and dependencies. The pipeline employs a fail-fast methodology: if
a high-risk vulnerability or CVE is detected, the deployment is automatically
aborted, ensuring that only hardened, secure code reaches the production
environment.
</p>
<p>
<h4>Automated Deployment & Zero-Downtime Strategy</h4>
Utilized Watchtower for automated image polling and lifecycle management on the
remote VPS. Combined with Traefik as a dynamic Reverse Proxy, the architecture
allows for seamless updates and the deployment of new microservices via subdomains
without interrupting existing traffic.
</p>
<p>
<h4>Infrastructure as Code (IaC) & Versioning</h4>
The entire server infrastructure is managed as code within a dedicated repository.
By using a centralized Docker Compose structure with modular includes, the
environment remains highly maintainable and version-controlled, allowing for instant
rollbacks and reproducible environments.
</p>
<p>
<h4>Real-time Monitoring & Incident Response</h4>
Configured automated alerting to provide instant mobile notifications for pipeline
failures, ensuring high availability and rapid MTTR (Mean Time To Recovery).
</p>
<h4>Tech Stack</h4>
<ul>
    <li>CI/CD / DevOps: GitHub Actions, GHCR, Watchtower</li>
    <li>Security: Trivy (Vulnerability Scanning)</li>
    <li>Infrastructure: Docker, Docker Compose, Traefik (Reverse Proxy)</li>
</ul>
<br>
<h4>Key Achievements</h4>
<ul>
    <li><b>Efficiency:</b> Reduced deployment time from minutes of manual CLI work to
        zero-touch automation.</li>
    <li><b>Security:</b> Blocked 100% of known vulnerable dependencies from reaching
        production through automated gating.</li>
    <li><b>Scalability:</b> Modular configuration allows adding new services with a
        single line of code in the global compose file.</li>
</ul>

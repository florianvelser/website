# website
this is the source code for my website

## Architektur und Setup

Dieses Projekt verwendet eine moderne, auf Docker und Container-Technologien basierende Multi-Tier-Architektur. Das Deployment und die Erstellung der Artefakte sind streng voneinander getrennt, um hohe Performance, Caching und Sicherheit zu gewährleisten.

Dabei kommen folgende Komponenten zum Einsatz:

### 1. Frontend / Webserver (Nginx)
Das Frontend wird mittels eines Multi-Stage Docker Builds (`Dockerfile` im Root) paketiert:
- **Build Stage (Node.js):** Hier werden im Vorfeld Skripte zur Konvertierung ausgeführt (z.B. Bilder nach AVIF umwandeln oder CSS minifizieren). Dieses Setup nutzt Docker Caching intensiv, sodass Abhängigkeitsinstallationen nur bei Änderungen neu durchgeführt werden.
- **Runtime Stage (Nginx unprivileged):** Die resultierenden statischen Artefakte werden in einem sehr leichtgewichtigen und sicheren Nginx aus dem offiziellen `nginxinc/nginx-unprivileged` Image geliefert. Der Server läuft nicht als `root`, sondern out-of-the-box als unprivilegierter Nutzer auf Port 8080. 
- **Nginx Config (`nginx.conf`):** Der Nginx dient als Reverse Proxy und liefert statische Dateien. Er wurde mit **Gzip-Kompression** aufgewertet und fügt wichtige **Security Headers** (`X-Frame-Options`, `X-XSS-Protection`, etc.) sowie **Caching-Header** für Bilder und konvertierte Assets hinzu. Aufrufe an das Kontaktformular (`/contact-form`) leitet er transparent und mit den wichtigen Forwarded-Headern an das Backend weiter.

### 2. Backend (Node.js)
Das Backend (`backend/Dockerfile`) ist ein eigenständiger Service, der API-Anfragen entgegennimmt. 
- Es läuft ebenfalls im Docker Container als dedizierter, unprivilegierter `node`-Nutzer.
- Der Prozess ist mithilfe von `dumb-init` als Hauptprozess (PID 1) gekapselt. Dies ermöglicht das fehlerfreie Verarbeiten von Kill- und Terminate-Signalen.
- In der `docker-compose.yml` läuft das Backend auf seinem internen Port `3000` und ist dadurch direkt vom Nginx-Proxy erreichbar.

### 3. CI/CD (GitHub Actions)
Eine voll automatisierte Build-Pipeline (`.github/workflows/docker-publish.yml`) wird bei jedem Merge auf den `main`-Branch getriggert:
- Die Action baut sowohl das Base Image für den Nginx (inklusive Ausführung der Build-Scripte) als auch das für das Backend neu auf. 
- Hierbei ist ein **GitHub Actions System-Cache** aktiviert, sodass aufeinander folgende Builds erheblich beschleunigt werden.
- Zum Abschluss werden die leichtgewichtigen fertigen Images versioniert (`latest` sowie ein Commit-Hash-Tag) in die **GitHub Container Registry (`ghcr.io`)** gepusht.

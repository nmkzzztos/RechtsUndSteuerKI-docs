---
id: installation
title: Installation
sidebar_position: 1
---

### Systemvoraussetzungen

**Minimale Anforderungen:**

- **Betriebssystem:** Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **Node.js:** 16.x oder höher (18.x+ empfohlen)
- **NPM:** 8.x oder höher (automatisch mit Node.js)
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

**Empfohlen für Entwicklung:**

- **Node.js:** 18.x LTS für beste Performance

### Voraussetzungen Installation

**Node.js 16+ Installation:**

```bash
# Windows (über nodejs.org oder Chocolatey)
# Download von: https://nodejs.org/

# macOS (über Homebrew)
brew install node

# Ubuntu/Debian (über NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installation überprüfen
node --version
npm --version
```

**Alternative: Node Version Manager (NVM):**

```bash
# Linux/macOS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Windows (nvm-windows)
# Download von: https://github.com/coreybutler/nvm-windows
nvm install 18.0.0
nvm use 18.0.0
```

### Frontend Einrichtung und Start

**Methode 1: Automatisiertes Setup (Empfohlen)**

**Windows:**

```cmd
# Doppelklick auf run.cmd oder Ausführung in Eingabeaufforderung
run.cmd
```

**macOS/Linux:**

```bash
# Skript ausführbar machen und starten
chmod +x run.bash
./run.bash
```

**Methode 2: Manuelle Einrichtung**

**1. Dependencies installieren:**

```bash
# NPM Dependencies installieren
npm install

# Installation überprüfen
npm list --depth=0
```

**2. Entwicklungsserver starten:**

```bash
# Entwicklungsserver mit Hot Module Replacement starten
npm run dev

# Alternativ mit spezifischem Port
npm run dev -- --port 3000
```

**3. Produktions-Build erstellen:**

```bash
# Produktions-Build erstellen
npm run build

# Build-Vorschau lokal testen
npm run preview
```

### Konfiguration

**Umgebungsvariablen (.env Datei im frontend/ Verzeichnis):**

```bash
# API-Konfiguration
VITE_API_BASE_URL=http://localhost:5000

# Entwicklungs-Konfiguration
VITE_DEV_TOOLS=true
VITE_HOT_RELOAD=true

# Produktions-Konfiguration
VITE_PROD_OPTIMIZE=true
VITE_SOURCE_MAPS=false

# Logging-Konfiguration
VITE_LOG_LEVEL=info
```

**Vite Konfiguration (vite.config.ts):**

```typescript
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    target: "es2020",
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
    sourcemap: false,
  },
});
```

### Vuetify Theme Konfiguration

**Theme Anpassung:**

```typescript
// src/plugins/vuetify.ts
const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          brown: "#94754a", // Primäre Markenfarbe
          darkBlue: "#0d1627", // Sekundäre Markenfarbe
          surface: "#ffffff",
          background: "#fafafa",
          "on-surface": "#1d1b20",
        },
      },
      dark: {
        colors: {
          brown: "#b8956e",
          darkBlue: "#2a3441",
          surface: "#121212",
          background: "#0f0f0f",
        },
      },
    },
  },
});
```

### Zugriffspunkte

Nach erfolgreichem Start ist das Frontend erreichbar unter:

- **Frontend-Anwendung:** http://localhost:5173
- **Entwicklungsserver:** http://localhost:5173 (Vite Dev Server)
- **Produktions-Preview:** http://localhost:4173 (nach `npm run preview`)
- **Build-Ausgabe:** `dist/` Verzeichnis für statisches Hosting

### Browser-Unterstützung

**Unterstützte Browser:**

- **Chrome:** 90+ (empfohlen)
- **Firefox:** 88+
- **Safari:** 14+
- **Edge:** 90+
- **Opera:** 76+

**Browser-Features erforderlich:**

- ES2020 Support
- CSS Grid und Flexbox
- Fetch API
- WebSockets (für Hot Reload)
- LocalStorage/SessionStorage

### Verifikation und Tests

**Frontend-Gesundheitscheck:**

```bash
# Entwicklungsserver überprüfen
curl http://localhost:5173
# Sollte HTML-Seite zurückgeben
```

**Build-Verifikation:**

```bash
# Build erstellen und testen
npm run build
npm run preview

# Build-Größe überprüfen
du -sh dist/
```

**Linting und Code-Qualität:**

```bash
# TypeScript-Typprüfung
npm run type-check

# ESLint ausführen
npm run lint

# Code formatieren
npm run format

# Alle Checks ausführen
npm run lint && npm run type-check
```

### Fehlerbehebung

**Häufige Probleme:**

**Port bereits in Verwendung:**

```bash
# Port 5173 freigeben
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Alternativen Port verwenden
npm run dev -- --port 3000
```

**Node.js/NPM Probleme:**

```bash
# NPM Cache leeren
npm cache clean --force

# node_modules neu installieren
rm -rf node_modules package-lock.json
npm install

# Node.js Version überprüfen
node --version  # Sollte 16+ sein
```

**Build-Probleme:**

```bash
# TypeScript-Fehler beheben
npm run type-check

# Memory-Limit für Node.js erhöhen
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**Vite Development Server Probleme:**

```bash
# Vite Cache leeren
rm -rf node_modules/.vite

# Dependencies neu installieren
npm ci

# Entwicklungsserver mit Debug-Informationen
npm run dev -- --debug
```

**API-Verbindungsprobleme:**

```bash
# Backend-Status überprüfen
curl http://localhost:5000/api/health

# Proxy-Konfiguration in vite.config.ts überprüfen
# CORS-Einstellungen im Backend überprüfen
```

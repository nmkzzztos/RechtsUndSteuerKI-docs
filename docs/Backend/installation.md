---
id: installation
title: Installation
sidebar_position: 1
---

### Systemvoraussetzungen

**Minimale Anforderungen:**

- **Betriebssystem:** Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **Python:** 3.8+ (3.9+ empfohlen)
- **RAM:** 4GB minimum (8GB+ empfohlen für KI-Features)
- **Speicher:** 2GB für Anwendung + 5-50GB für KI-Modelle (optional)

**Empfohlen für KI-Features:**

- **RAM:** 16GB+ für mittlere Performance, 32GB+ für hohe Performance
- **Speicher:** 25GB+ für mehrere KI-Modelle
- **GPU:** NVIDIA GPU mit CUDA-Unterstützung (optional, verbessert KI-Performance)

### Voraussetzungen Installation

**Python 3.8+ Installation:**

```bash
# Windows (über Microsoft Store oder python.org)
# Download von: https://www.python.org/downloads/

# macOS (über Homebrew)
brew install python@3.9

# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Installation überprüfen
python --version
pip --version
```

## Backend Einrichtung und Start

### Methode 1: Automatisiertes Setup (Empfohlen)

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

### Methode 2: Manuelle Einrichtung

**1. Repository klonen:**

```bash
git clone <repository-url>
cd RechtsUndSteuerKI/backend
```

**2. Virtuelle Umgebung erstellen:**

```bash
# Virtuelle Umgebung erstellen
python -m venv .venv

# Virtuelle Umgebung aktivieren
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
```

**3. Abhängigkeiten installieren:**

```bash
# Backend-Abhängigkeiten installieren
pip install -r requirements.txt

# Installation überprüfen
pip list
```

**4. Datenbank initialisieren:**

```bash
# Datenbank-Schema erstellen
flask init-db

# Testdaten einfügen (optional)
flask seed-db

# Datenbank-Status überprüfen
flask db-status
```

**5. Backend-Server starten:**

```bash
# Entwicklungsserver starten
python main.py

# Oder mit Flask-Kommando
flask run
```

### Konfiguration

**Umgebungsvariablen (.env Datei im backend/ Verzeichnis):**

```bash
# Flask-Konfiguration
FLASK_APP=main.py
FLASK_ENV=development  # oder production
SECRET_KEY=ihr-geheimer-schluessel-aendern-in-produktion

# Datenbank-Konfiguration
DATABASE_URI=sqlite:///instance/app.db
# Für PostgreSQL: postgresql://benutzername:passwort@localhost/datenbankname

# KI/Ollama-Konfiguration
OLLAMA_API_BASE=http://localhost:11434
DEFAULT_LLM_MODEL=llama3
DEFAULT_VISION_MODEL=llava

# Upload-Konfiguration
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216  # 16MB

# Logging-Konfiguration
LOG_LEVEL=INFO
LOG_FILE=logs/app.log
```

### Datenbank-Konfiguration

**SQLite (Standard - Entwicklung):**

```python
# Automatisches Setup, keine zusätzliche Konfiguration nötig
DATABASE_URI = 'sqlite:///instance/app.db'
```

**PostgreSQL (Produktion):**

```bash
# PostgreSQL installieren
sudo apt install postgresql postgresql-contrib  # Ubuntu
brew install postgresql  # macOS

# Datenbank und Benutzer erstellen
sudo -u postgres psql
CREATE DATABASE rechtsundsteuerki;
CREATE USER appuser WITH PASSWORD 'ihr_passwort';
GRANT ALL PRIVILEGES ON DATABASE rechtsundsteuerki TO appuser;
\q

# Umgebungsvariable aktualisieren
DATABASE_URI=postgresql://appuser:ihr_passwort@localhost/rechtsundsteuerki
```

### Ollama KI-Integration Einrichtung

**Ollama Installation:**

```bash
# Ollama von https://ollama.com/download herunterladen und installieren

# Ollama-Service starten
ollama serve

# Empfohlene Modelle herunterladen (in neuem Terminal)
ollama pull qwen3:4b           # Textverarbeitung
ollama pull qwen2.5vl:3b       # Bildanalyse
```

### Zugriffspunkte

Nach erfolgreichem Start ist das Backend erreichbar unter:

- **Backend-API:** http://localhost:5000
- **API-Dokumentation:** http://localhost:5000/api/docs (falls aktiviert)
- **Gesundheitscheck:** http://localhost:5000/api/health
- **Ollama-API:** http://localhost:11434 (falls gestartet)

### Verifikation und Tests

**Backend-Gesundheitscheck:**

```bash
curl http://localhost:5000/api/health
# Erwartet: {"status": "ok", "timestamp": "..."}
```

**API-Endpunkte testen:**

```bash
# Benutzereinstellungen abrufen
curl http://localhost:5000/api/users/settings/1

# Verfügbare Modelle abrufen
curl http://localhost:5000/api/users/models

# Dokumentvorlagen auflisten
curl http://localhost:5000/api/documents/templates
```

**Ollama-Integration testen:**

```bash
# Verfügbare Modelle auflisten
curl http://localhost:11434/api/tags

# Testanfrage an LLM
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Erkläre das deutsche Steuerrecht in einem Satz.",
  "stream": false
}'
```

### Fehlerbehebung

**Häufige Probleme:**

**Port bereits in Verwendung:**

```bash
# Prozess auf Port 5000 finden und beenden
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

**Virtuelle Umgebung Probleme:**

```bash
# Virtuelle Umgebung neu erstellen
rm -rf .venv  # oder rmdir /s .venv unter Windows
python -m venv .venv
source .venv/bin/activate  # oder .venv\Scripts\activate unter Windows
pip install -r requirements.txt
```

**Datenbank-Probleme:**

```bash
# Datenbank zurücksetzen
flask reset-db
flask init-db
flask seed-db
```

**Ollama-Verbindungsprobleme:**

```bash
# Ollama-Status überprüfen
ollama list

# Ollama-Service starten
ollama serve

# Modelle erneut herunterladen
ollama pull llama3
```

### Performance-Optimierung

**KI-Performance:**

```bash
# Leichtere Modelle für bessere Performance verwenden
ollama pull gemma:2b      # Leichtgewichtiges Modell
ollama pull mistral:7b    # Ausgewogene Performance
```

### Log-Dateien

**Backend-Logs anzeigen:**

```bash
# Logs in Echtzeit anzeigen
tail -f backend/logs/app.log

# Log-Level konfigurieren in backend/.env: LOG_LEVEL=INFO
```

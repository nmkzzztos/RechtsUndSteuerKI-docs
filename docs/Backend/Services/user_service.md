# User Service

Die `UserService` Klasse implementiert ein komplettes Identity Management System mit User Preferences und LLM Model Configuration Management. Sie nutzt statische Factory Methods und integriert mit SQLAlchemy User Models für persistente Datenhaltung.

## Service Architecture

Die Klasse folgt dem Static Factory Pattern mit reinen Static Methods für stateless operations. Sie implementiert das Repository Pattern für User Data Access und nutzt Dependency Injection für LLM Service Integration über `ollama_service` singleton.

## Benutzerverwaltung

### Grundlegende Benutzerfunktionen

Der Service bietet alle standardmäßigen CRUD-Operationen für Benutzerkonten. Jeder Benutzer hat grundlegende Informationen wie E-Mail-Adresse, Name und Rolle. Das System unterstützt verschiedene Benutzerrollen, was eine flexible Rechtevergabe in Kanzleistrukturen ermöglicht.

### Mehrsprachigkeit

Ein wichtiges Feature ist die integrierte Unterstützung für mehrere Sprachen. Benutzer können ihre bevorzugte Sprache auswählen, und das System passt die Benutzeroberfläche entsprechend an. Standardmäßig ist das System auf Deutsch konfiguriert, kann aber problemlos erweitert werden.

## Einstellungsmanagement

### Personalisierte Konfiguration

Der Service ermöglicht es Benutzern, umfassende persönliche Einstellungen zu verwalten. Diese Einstellungen werden persistent gespeichert und beeinflussen das Verhalten des gesamten Systems für den jeweiligen Benutzer.

### LLM Model Preference Management

```python
@staticmethod
def get_available_models() -> Dict[str, Any]:
    """Get available Ollama models and system status with categorization"""
```

**Model Categorization Algorithm**:

- **Text Models**: Filtered durch keyword matching gegen model name patterns
- **Vision Models**: Detection via model name keywords (`llava`, `vision`, `clip`, `bakllava`, `moondream`)
- **Performance Profiling**: Hardware-based model recommendations mit RAM/VRAM requirements
- **Real-time Availability Check**: Live Ollama API status polling für accurate model listings

## KI-Integration und Modell-Management

### Ollama-Integration

Der Service fungiert als Brücke zwischen Benutzerpräferenzen und dem Ollama-System. Er kann automatisch erkennen, welche KI-Modelle verfügbar sind, kategorisiert sie nach Funktionalität und stellt diese Informationen strukturiert für die Benutzeroberfläche bereit.

### Leistungsprofile

Das System bietet verschiedene Leistungsprofile (niedrig, mittel, hoch), die auf unterschiedliche Hardware-Konfigurationen zugeschnitten sind. Jedes Profil empfiehlt spezifische Modelle und gibt Auskunft über Mindestanforderungen an RAM und Speicherplatz.

### Modell-Validierung

Ein wichtiger Aspekt ist die Validierung der Benutzerauswahl von KI-Modellen. Der Service überprüft, ob die gewählten Modelle tatsächlich verfügbar sind, und warnt Benutzer vor möglichen Problemen. Dies verhindert Konfigurationsfehler und verbessert die Benutzererfahrung.

## Installation und Setup

### Ollama-Installation

Der Service bietet detaillierte Informationen und Anleitungen für die Installation von Ollama. Er stellt strukturierte Installationsschritte bereit und gibt Empfehlungen für verschiedene Leistungsanforderungen.

### System-Monitoring

Fortlaufend überwacht der Service den Status des KI-Systems und informiert Benutzer über Verfügbarkeit, installierte Modelle und mögliche Probleme. Dies ermöglicht proaktive Wartung und minimiert Ausfallzeiten.

## Sicherheit und Datenschutz

### Lokale Datenspeicherung

Alle Benutzerdaten und -einstellungen werden lokal gespeichert. Es findet keine Übertragung persönlicher Informationen an externe Services statt, was höchste Datenschutzstandards gewährleistet.

## Integration mit anderen Services

### Nahtlose Service-Kommunikation

Der User Service arbeitet eng mit anderen Systemkomponenten zusammen:

- **LLM Service**: Für KI-Modell-Management und Verfügbarkeitsprüfung
- **Database Service**: Für persistente Speicherung von Benutzerdaten
- **Document Service**: Für benutzerspezifische Dokumentverarbeitungseinstellungen

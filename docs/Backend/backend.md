---
id: backend
title: Backend
sidebar_position: 2
---

# Backend Architecture

Das RechtsUndSteuerKI Backend implementiert eine moderne Microservices-orientierte Architektur mit Python 3.9+ als Runtime Environment. Die Anwendung nutzt Flask als WSGI Application Framework mit SQLAlchemy ORM für Object-Relational Mapping und Alembic für Database Schema Migrations.

## Project Struktur

```
backend/
├── app/
│   ├── routes/     # API endpoints
│   ├── db/         # Database initialization helpers
│   ├── models/     # ORM models
│   ├── services/   # Business logic and integrations
│   └── __init__.py # Application factory
├── config.py       # Configuration classes
├── main.py         # Application entry point and CLI commands
├── requirements.txt
└── tests/          # Pytest test suite
```

### File Overview

| Path                               | Purpose                                                 |
| ---------------------------------- | ------------------------------------------------------- |
| `app/__init__.py`                  | Creates the Flask application and registers blueprints. |
| `app/config/`                      | Logging configuration and helpers.                      |
| `app/db/__init__.py`               | Initializes the SQLAlchemy database instance.           |
| `app/models/client.py`             | Client data model with legal forms and salutations.     |
| `app/models/document.py`           | Document template model with placeholder support.       |
| `app/models/user.py`               | User model with Ollama model preferences.               |
| `app/models/tax_advisor.py`        | Tax advisor information model.                          |
| `app/models/work_order.py`         | Work order/workflow management model.                   |
| `app/models/placeholder.py`        | Document placeholder definition model.                  |
| `app/routes/routes.py`             | REST API endpoints including user settings.             |
| `app/services/database_service.py` | CRUD helper around the models.                          |
| `app/services/document_service.py` | Document upload, preview, and processing utilities.     |
| `app/services/llm_service.py`      | Ollama API wrapper with status checking.                |
| `app/services/user_service.py`     | User management and model configuration service.        |
| `config.py`                        | Environment specific configuration classes.             |
| `main.py`                          | Entry point with CLI commands and logging setup.        |
| `migrations/`                      | Alembic migration environment files.                    |
| `tests/`                           | Pytest suite validating the database service.           |

## Core Technology Stack

### Flask Application Framework

```python
from flask import Flask
from app import create_app

app = create_app()  # Application Factory Pattern
```

**Technical Configuration**:

- **WSGI Compliance**: Production-ready WSGI application für deployment mit Gunicorn/uWSGI
- **Blueprint Architecture**: Modular route organization mit Flask Blueprints für API versioning
- **Dependency Injection**: Flask's application context für service dependency resolution
- **Configuration Management**: Environment-based configuration mit Flask-Config

### SQLAlchemy ORM & Database Layer

```python
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()  # ORM instance
migrate = Migrate()  # Alembic migration manager
```

**Database Architecture**:

- **Connection Pooling**: SQLAlchemy Engine mit optimized connection pool management
- **Transaction Management**: Session-based transactions mit automatic rollback on exceptions
- **Lazy Loading**: Configured relationship loading strategies für N+1 query problem avoidance
- **Migration System**: Alembic-based schema versioning mit automatic migration generation
- **Multi-Database Support**: Configurable database binds für read/write splitting capability

### Local LLM Integration Architecture

```python
import requests
from app.services.llm_service import ollama_service

# RESTful HTTP client für Ollama API integration
response = requests.post(f"{base_url}/api/generate", json=payload)
```

**LLM Integration Stack**:

- **Ollama Runtime**: Local LLM inference server mit REST API interface
- **HTTP Client Layer**: Connection pooling und retry logic für LLM API calls
- **Model Management**: Dynamic model loading/unloading für memory optimization
- **Inference Pipeline**: Asynchronous request processing für non-blocking operations
- **Privacy-by-Design**: Zero external data transmission für GDPR compliance

## Systemarchitektur

### Service-orientierte Architektur

Das Backend folgt einer service-orientierten Architektur, bei der verschiedene Geschäftsbereiche in separaten Services gekapselt sind. Diese Struktur fördert die Wartbarkeit, Testbarkeit und ermöglicht unabhängige Entwicklung verschiedener Systemkomponenten.

**AI Agent Service**: Das Herzstück der intelligenten Dokumentenverarbeitung, das verschiedene KI-Technologien zu automatisierten Workflows kombiniert.

**Document Service**: Verantwortlich für alle Aspekte der Dokumentenverwaltung, von der sicheren Speicherung bis zur dynamischen Generierung.

**LLM Service**: Die Schnittstelle zu lokalen Sprachmodellen, die eine einheitliche API für verschiedene KI-Aufgaben bereitstellt.

**User Service**: Verwaltet Benutzerkonten, Präferenzen und die Integration mit KI-Funktionen.

**Database Service**: Abstrahiert Datenbankoperationen und gewährleistet Datenintegrität und -konsistenz.

### Modulare Komponentenstruktur

Die Anwendung ist in klar definierte Module unterteilt:

**Models**: Datenmodelle, die die Geschäftsentitäten repräsentieren
**Routes**: API-Endpunkte, die die REST-Schnittstelle bereitstellen
**Services**: Geschäftslogik-Services, die komplexe Operationen kapseln
**Utils**: Hilfsfunktionen und gemeinsam genutzte Utilities

## Geschäftslogik und Anwendungsfälle

### Intelligente Dokumentenverarbeitung

Das System automatisiert den gesamten Dokumentenworkflow - von der Analyse hochgeladener Dateien über die Extraktion relevanter Informationen bis zur Generierung finaler Dokumente. Diese Automatisierung reduziert manuellen Aufwand erheblich und minimiert Fehlerquellen.

Der Workflow beginnt mit der Textextraktion aus verschiedenen Dateiformaten, gefolgt von einer KI-gestützten Analyse zur Identifikation von Dokumenttypen und relevanten Informationen. Das System kann automatisch passende Mandanten identifizieren oder neue Mandantenprofile vorschlagen.

### Mandanten- und Projektmanagement

Die Anwendung bietet umfassende Funktionen für die Verwaltung von Mandanten, sowohl natürlichen Personen als auch Unternehmen. Das System berücksichtigt die spezifischen Anforderungen deutscher Steuer- und Rechtspraxis, einschließlich korrekter Behandlung von Steuernummern, Finanzamt-Zuordnungen und Rechtsformen.

Arbeitsaufträge verknüpfen Mandanten mit Steuerberatern und ermöglichen eine strukturierte Projektverfolgung. Das System unterstützt verschiedene Prioritätsstufen, Status-Tracking und Fälligkeitsverwaltung.

### Vorlagensystem

Ein flexibles Vorlagensystem ermöglicht die Standardisierung häufig verwendeter Dokumente. Platzhalter können dynamisch durch Mandanten- oder projektspezifische Daten ersetzt werden, was die Konsistenz und Effizienz der Dokumentenerstellung erheblich verbessert.

## Sicherheit und Compliance

### Datenschutz-by-Design

Das System wurde von Grund auf mit Datenschutz im Fokus entwickelt. Alle sensiblen Daten werden lokal verarbeitet, und die KI-Integration erfolgt über lokale Modelle, wodurch keine Mandantendaten an externe Services übertragen werden.

### DSGVO-Konformität

Die Datenstrukturen und -verarbeitungsprozesse sind darauf ausgelegt, DSGVO-konform zu arbeiten. Dies umfasst angemessene Datenminimierung, Zweckbindung und die technische Möglichkeit zur Datenlöschung.

### Audit-Trails

Umfassende Protokollierung aller Systemaktivitäten ermöglicht vollständige Audit-Trails und Compliance-Reporting. Jede Datenänderung wird mit Zeitstempel und Benutzerinformation erfasst.

## Performance und Skalierung

### Effiziente Datenverarbeitung

Das System nutzt asynchrone Verarbeitungspatterns für zeitaufwändige Operationen. Datenbankabfragen sind optimiert.

### Ressourcenmanagement

Die KI-Integration ist so gestaltet, dass sie Systemressourcen effizient nutzt. Das System kann verschiedene Modellgrößen je nach verfügbarer Hardware verwenden und degradiert graceful bei Ressourcenmangel.

### Horizontale Skalierung

Die service-orientierte Architektur ermöglicht horizontale Skalierung einzelner Komponenten je nach Bedarf. Load Balancing und Session-Management unterstützen Mehrbenutzerbetrieb.

## Entwicklung und Wartung

### Command-Line Interface

Das System bietet ein umfassendes CLI für administrative Aufgaben, einschließlich Datenbankinitialisierung, Testdaten-Seeding und Wartungsoperationen. Dies vereinfacht Deployment und Systemwartung erheblich.

### Logging und Monitoring

Strukturierte Protokollierung auf verschiedenen Ebenen (DEBUG, INFO, WARNING, ERROR) ermöglicht effektive Problemdiagnose und Systemmonitoring. Log-Rotation und -Archivierung gewährleisten langfristige Nachverfolgbarkeit.

## Integration und Erweiterbarkeit

### API-First-Design

Das System folgt einem API-first-Ansatz, der maximale Flexibilität bei der Frontend-Entwicklung ermöglicht und zukünftige Integrationen mit Drittsystemen unterstützt.

### Externe Systemintegration

RESTful APIs und standardisierte Datenformate ermöglichen die Integration mit externen Systemen wie Buchhaltungssoftware, CRM-Systemen oder Behörden-Schnittstellen.

## Zukunftsfähigkeit

### Technologie-Trends

Das System ist darauf ausgelegt, mit sich entwickelnden Technologien zu wachsen. Die KI-Integration kann neue Modelle und Fähigkeiten nutzen, sobald sie verfügbar werden.

### Regulatorische Anpassungen

Die flexible Architektur ermöglicht es, auf Änderungen in rechtlichen und steuerlichen Anforderungen zu reagieren, ohne größere Systemumgestaltungen zu erfordern.

### Cloud-Readiness

Obwohl für lokale Bereitstellung optimiert, ist das System cloud-ready und kann bei Bedarf in verschiedene Cloud-Umgebungen migriert werden.

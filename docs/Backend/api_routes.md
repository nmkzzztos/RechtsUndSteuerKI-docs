---
id: api_routes
title: API Routes
sidebar_position: 3
---

# API Routes

Die Flask Blueprint-basierte API implementiert RESTful HTTP Services mit JSON über HTTP Communication Protocol. Alle Endpoints nutzen Flask's request/response cycle mit comprehensive error handling, input validation und standardized HTTP status codes.

## Technical API Architecture

**Flask Blueprint Organization**:

```python
from app.routes import api_bp  # Centralized blueprint registration
```

- **Blueprint Modularization**: Logische API Gruppierung in separate blueprints für scalability
- **Content Negotiation**: JSON content-type handling mit automatic serialization/deserialization
- **HTTP Method Mapping**: Standard REST verbs (GET, POST, PUT, DELETE) mit proper semantic mapping
- **Error Handling**: Global exception handling mit standardized error responses und HTTP status codes

## Dokumentenverwaltung - Kern der Digitalisierung

### Document Upload & Multipart Processing

```python
@api_bp.route('/documents/upload', methods=['POST'])
def upload_document():
    """Multipart/form-data document upload with metadata processing"""
```

**Technical Implementation**:

- **Multipart Form Handling**: Flask's `request.files` interface für binary file streams
- **MIME Type Validation**: `werkzeug.utils.secure_filename()` für path traversal prevention
- **Stream Processing**: Memory-efficient file handling über `BinaryIO` streams
- **Metadata Extraction**: JSON parsing von form-data fields für placeholder definitions
- **Transactional Upload**: Atomic file operations mit rollback capability bei failures

Der Upload-Prozess ist darauf ausgelegt, sowohl einfache Dokumentenspeicherung als auch komplexe Vorlagenerstellung zu unterstützen. Benutzer können beim Upload direkt Platzhalter-Konfigurationen als JSON-Daten mitliefern, was die Erstellung dynamischer Dokumentvorlagen ermöglicht.

### Template Processing & Real-time Preview

```python
@api_bp.route('/documents/preview/<int:document_id>', methods=['POST'])
def preview_document(document_id):
    """Real-time template processing with placeholder substitution"""
```

**Technical Pipeline**:

- **Template Engine**: Custom placeholder substitution engine mit regex-based pattern matching
- **In-Memory Processing**: Temporary document generation ohne persistent storage
- **Base64 Encoding**: Binary PDF data encoding für JSON response transfer
- **Resource Management**: Automatic cleanup von temporary files via context managers
- **Streaming Response**: Large file streaming für memory-efficient downloads

Diese Vorschau-Funktionen unterstützen komplexe Platzhalter-Systeme und können DOCX-Dateien in PDF-Format konvertieren. Das ermöglicht es Benutzern, ihre Dokumente in dem Format zu bearbeiten, das ihnen vertraut ist, während das System automatisch professionelle PDF-Ausgaben generiert.

### Download und Finale Dokumentengenerierung

Der `/documents/download/<document_id>` Endpunkt generiert finale Dokumente mit allen ausgefüllten Platzhaltern und stellt sie für den Download bereit. Dieser Prozess beinhaltet die automatische Bereinigung temporärer Dateien und gewährleistet eine saubere Systemumgebung.

### Platzhalter-Management

Das System bietet fortgeschrittene Funktionen für die Verwaltung von Platzhaltern. Der `/documents/placeholders/rename-temp` Endpunkt ermöglicht es, Platzhalter-Namen dynamisch zu ändern, auch in temporären Dateien. Dies ist besonders wertvoll für Benutzer, die ihre Vorlagen anpassen und standardisieren möchten.

## Mandantenverwaltung - Strukturierte Kundenbetreuung

### Umfassende CRUD-Operationen

Die Mandantenverwaltung erfolgt über eine vollständige REST-Schnittstelle, die sowohl einzelne Mandanten (`/clients/<client_id>`) als auch Listen (`/clients`) verwaltet. Das System unterscheidet zwischen natürlichen Personen und Unternehmen und behandelt beide Typen mit ihren spezifischen Datenanforderungen.

Die Mandantenerstellung über `/clients` (POST) validiert Eingabedaten und gewährleistet Datenintegrität. Besondere Aufmerksamkeit wird der korrekten Behandlung deutscher Steuer- und Rechtsdaten gewidmet, einschließlich Steuernummern, Finanzamt-Zuordnungen und Rechtsformen.

### Integration mit Arbeitsabläufen

Mandantendaten sind eng mit Arbeitsaufträgen und Dokumenten verknüpft. Die API ermöglicht es, diese Beziehungen effizient zu verwalten und stellt sicher, dass Änderungen an Mandantendaten sich konsistent durch das gesamte System propagieren.

## Arbeitsauftrag-Management - Projektorganisation

### Grundlegende Arbeitsauftragsverwaltung

Arbeitsaufträge werden über `/work-orders` verwaltet und umfassen alle Aspekte der Projektorganisation. Von der Erstellung über Statusupdates bis hin zur Löschung bietet die API vollständige Kontrolle über Arbeitspakete.

Ein besonderes Feature ist die Möglichkeit, Arbeitsaufträge direkt mit Dokumenten zu erstellen (`/work-orders/with-documents`). Dies ermöglicht es, komplette Projekte in einem einzigen API-Aufruf zu initialisieren.

### Dokumentenzuordnung

Arbeitsaufträge können mit beliebig vielen Dokumenten verknüpft werden. Die Endpunkte `/work-orders/<order_id>/documents` ermöglichen sowohl die Auflistung zugehöriger Dokumente als auch das Hinzufügen neuer Dateien zu bestehenden Projekten.

### Intelligente Feldextraktion

Der `/work-orders/<order_id>/extract-fields` Endpunkt nutzt KI-Funktionen, um automatisch relevante Informationen aus Arbeitsauftrag-Dokumenten zu extrahieren. Dies reduziert manuellen Aufwand und verbessert die Datenqualität.

## Steuerberater-Verwaltung - Ressourcenmanagement

Die Steuerberater-Verwaltung über `/tax-advisors` ermöglicht die vollständige Verwaltung von Beratern, deren Spezialisierungen und Kontaktdaten. Dies unterstützt eine kompetenzbasierte Zuordnung von Mandanten und Projekten.

## Vorlagensystem - Standardisierung und Effizienz

### Template-Verwaltung

Der `/documents/templates` Endpunkt bietet Zugriff auf alle verfügbaren Dokumentvorlagen. Diese können nach Kategorien gefiltert und durchsucht werden, was die Auswahl der passenden Vorlage für spezifische Anwendungsfälle erleichtert.

### Template-basierte Dokumenterstellung

Über `/documents/create-from-template/<template_id>` können neue Dokumente basierend auf bestehenden Vorlagen erstellt werden. Dieser Prozess kombiniert die Vorlagenstruktur mit mandanten- oder projektspezifischen Daten.

## Benutzerverwaltung und Einstellungen

### Benutzerkonten

Die Benutzerverwaltung über `/users` ermöglicht die Erstellung und Verwaltung von Benutzerkonten mit rollenbasierter Zugriffskontrolle.

### Personalisierte Einstellungen

Benutzer können ihre Einstellungen über `/users/settings/<user_id>` verwalten. Dies umfasst Sprach-, Interface- und KI-Modell-Präferenzen, die eine personalisierte Benutzererfahrung ermöglichen.

### KI-Modell-Integration

Der `/users/models` Endpunkt bietet Informationen über verfügbare KI-Modelle und deren Status. Dies ermöglicht es Benutzern, ihre KI-Präferenzen basierend auf tatsächlich verfügbaren Ressourcen zu konfigurieren.

### Ollama-Installation

Für Benutzer, die lokale KI-Funktionen nutzen möchten, bietet `/users/ollama-installer` detaillierte Installationsinformationen und Anleitungen.

## KI-Agent-Integration - Automatisierte Intelligenz

### Intelligente Dokumentverarbeitung

Der `/ai-agent/process-documents` Endpunkt ist das Herzstück der KI-Integration. Er ermöglicht die vollautomatische Verarbeitung hochgeladener Dokumente, einschließlich Textextraktion, Kundenabgleich, Vorlagenauswahl und Feldextraktion.

Dieser Endpunkt kombiniert mehrere KI-Technologien zu einem nahtlosen Workflow, der die manuelle Arbeit bei der Dokumentenerstellung erheblich reduziert.

### Workflow-Automatisierung

Über `/ai-agent/create-workflow` können komplette Arbeitsabläufe automatisch erstellt werden. Dies umfasst die Analyse hochgeladener Dokumente, die Extraktion relevanter Informationen und die Erstellung strukturierter Arbeitsaufträge.

### Spezialisierte KI-Funktionen

Zusätzliche Endpunkte bieten spezialisierte KI-Funktionen:

- `/ai-agent/analyze-client-match`: Automatischer Abgleich von Dokumentinhalten mit bestehenden Mandanten
- `/ai-agent/suggest-template`: Intelligente Vorlagenauswahl basierend auf Dokumentinhalt
- `/ai-agent/extract-all-fields`: Umfassende Feldextraktion für komplexe Dokumente

## Sicherheit und Fehlerbehandlung

### Umfassende Validierung

Alle Endpunkte implementieren umfassende Eingabevalidierung und Fehlerbehandlung. Dies umfasst Typprüfung, Bereichsvalidierung und Geschäftsregelüberprüfung.

### Protokollierung und Monitoring

Jeder API-Aufruf wird ausführlich protokolliert, was sowohl für Debugging als auch für Compliance-Zwecke wichtig ist.

## Performance und Skalierung

### Effiziente Datenübertragung

Die API nutzt JSON für strukturierte Daten und multipart/form-data für Datei-Uploads. Große Dateien werden effizient gestreamt, um Speicherverbrauch zu minimieren.

### Asynchrone Verarbeitung

Zeitaufwändige Operationen wie KI-Verarbeitung werden so implementiert, dass sie die API-Responsivität nicht beeinträchtigen.

## Integration und Erweiterbarkeit

Die API ist darauf ausgelegt, einfach erweitert zu werden. Neue Endpunkte können hinzugefügt werden, ohne bestehende Funktionalität zu beeinträchtigen. Das System unterstützt auch externe Integrationen über seine RESTful-Schnittstelle.

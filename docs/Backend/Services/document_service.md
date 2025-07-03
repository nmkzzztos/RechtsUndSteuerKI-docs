# Document Service

Die `DocumentService` Klasse implementiert ein vollständiges Document Management System (DMS) mit umfassendem File Processing, Template Engine und PDF Generation Pipeline. Sie nutzt Python's `tempfile`, `subprocess` und `shutil` Module für systemnahe Dateioperat ionen.

## Technische Architektur

Die Klasse implementiert das Strategy Pattern für verschiedene Dateiformate und nutzt Factory Methods für Document Creation. Sie kapselt komplexe File I/O Operations und implementiert Thread-safe File Handling mit automatischem Resource Cleanup über Context Managers.

## Unterstützte Dateiformate

Das System arbeitet primär mit den in Kanzleien üblichen Dokumentformaten:

- **PDF-Dateien**: Für finale Dokumente und offizielle Unterlagen
- **DOCX-Dateien**: Für bearbeitbare Vorlagen und Entwürfe
- **DOC-Dateien**: Für Legacy-Dokumente (begrenzte Unterstützung)

Die Validierung der Dateiformate erfolgt sowohl über Dateiendungen als auch über MIME-Types, um maximale Sicherheit zu gewährleisten.

## Kernfunktionalitäten

### Secure File Upload Implementation

```python
def save_document(self, file: BinaryIO, filename: str, content_type: str = None) -> str
```

Die Methode implementiert mehrstufige Security Validierung:

- **MIME Type Validation**: Whitelist-basierte Content-Type Überprüfung gegen `self.allowed_mime_types`
- **File Extension Filtering**: Regex-basierte Extension Validation mit `secure_filename()` von Werkzeug
- **Path Traversal Protection**: Absolute Path Resolving und Directory Traversal Prevention
- **Binary Stream Handling**: Memory-effizientes Streaming für große Files mit `BinaryIO` Interface

### Template Processing & Preview Generation

```python
def create_document_preview(self, document_id: int, placeholder_values: Dict[str, Any]) -> Dict[str, Any]
```

**DOCX Template Processing**:
Die `_process_docx_preview()` Methode implementiert XML DOM Manipulation:

- Nutzt `python-docx` Library für OOXML Document Object Model Zugriff
- Implementiert Custom Placeholder Regex Pattern Matching: `{{placeholder_name}}`
- In-Memory XML Tree Transformation für Performance-optimierte Placeholder Substitution
- Document Object Model Walking mit recursive Element traversal

**PDF Conversion Pipeline**:

```python
def _try_convert_docx_to_pdf(self, docx_path: str) -> Tuple[bool, str, str]
```

Multi-Strategy Conversion mit Fallback Chain:

1. **Primary**: `docx2pdf` Library (Windows LibreOffice COM Interface)
2. **Fallback**: Custom subprocess calls zu system-installierten Convertern

### Platzhalter-Management

Der Service bietet umfassende Funktionen für die Verwaltung von Platzhaltern in Dokumentvorlagen. Platzhalter können dynamisch umbenannt werden, sowohl in gespeicherten Dokumenten als auch in temporären Dateien. Dies ermöglicht es Benutzern, ihre Vorlagen flexibel anzupassen und zu standardisieren.

### Text-Extraktion

Für die Arbeit mit dem AI Agent Service kann der Document Service Text aus verschiedenen Dokumentformaten extrahieren. Bei DOCX-Dateien wird der Text direkt aus der XML-Struktur gelesen, während bei PDF-Dateien spezialisierte Bibliotheken zur Textextraktion verwendet werden. Diese Funktionalität ist essentiell für die intelligente Dokumentenanalyse.

## Dateikonvertierung

Ein besonderer Schwerpunkt liegt auf der zuverlässigen Konvertierung von DOCX-Dateien zu PDF. Der Service implementiert mehrere Fallback-Mechanismen:

**Primärer Konvertierungspfad**: Verwendung der docx2pdf-Bibliothek für direkte Konvertierung unter Windows
**Fallback-Mechanismus**: Alternative Konvertierungsmethoden für verschiedene Betriebssysteme
**Fehlerbehandlung**: Detaillierte Protokollierung bei Konvertierungsproblemen

Diese Redundanz stellt sicher, dass die Dokumentenverarbeitung auch bei Systemupdates oder Umgebungsänderungen zuverlässig funktioniert.

## Temporäre Dateiverwaltung

Für Benutzer-Workflows, die eine sofortige Vorschau ohne permanente Speicherung erfordern, verwaltet der Service temporäre Dateien. Diese werden in sicheren temporären Verzeichnissen gespeichert, verarbeitet und nach Abschluss automatisch gelöscht. Dies ist besonders wichtig für die Benutzerfreundlichkeit, da Benutzer verschiedene Optionen ausprobieren können, ohne das System mit temporären Daten zu belasten.

## Integration mit anderen Services

Der Document Service arbeitet nahtlos mit anderen Systemkomponenten zusammen:

- **AI Agent Service**: Bereitstellung von Dokumentinhalten für intelligente Analyse
- **Database Models**: Persistierung von Dokumentmetadaten
- **LLM Service**: Unterstützung bei der Textanalyse

## Monitoring und Troubleshooting

Jede Operation des Document Service wird ausführlich protokolliert. Dies umfasst Informationen über Dateigrößen, Verarbeitungszeiten, auftretende Fehler und Benutzeraktionen. Diese Protokolle sind essentiell für die Systemwartung und Fehlerdiagnose in Produktionsumgebungen.

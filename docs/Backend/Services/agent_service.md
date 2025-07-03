# AI Agent Service

Die `AIAgentService` Klasse implementiert ein komplexes Machine Learning Pipeline-System für die automatisierte Dokumentenverarbeitung in der RechtsUndSteuerKI-Anwendung. Sie orchestriert mehrere spezialisierte Services und nutzt lokale LLM-Modelle über Ollama für NLP-Tasks.

## Technische Architektur

Der AI Agent Service implementiert ein Multi-Stage Processing Pipeline mit asynchroner Verarbeitung und umfassendem Error Handling. Die Klasse injiziert Abhängigkeiten zu `ollama_service` und `document_service` über Constructor Injection und nutzt das Repository Pattern für Datenbankzugriffe.

## Funktionsweise

### Core Pipeline: `process_documents_intelligently()`

Der Hauptprozess implementiert ein fünfstufiges ETL-Pipeline (Extract, Transform, Load) mit umfassendem Exception Handling:

**1. Text Extraction & Analysis Pipeline**

```python
def _extract_and_analyze_documents(self, uploaded_files: List[Any]) -> Dict[str, Any]
```

Diese Methode nutzt `document_service.extract_text_from_uploaded_file()` für OCR-basierte Textextraktion aus PDF/DOCX-Dateien. Für jedes Dokument wird über `ollama_service.summarize_document_content()` eine AI-generierte Zusammenfassung mit Confidence Score erstellt. Die Implementierung nutzt List Comprehensions und Generator Expressions für Memory-effiziente Verarbeitung großer Datei-Collections.

**2. Named Entity Recognition & Client Matching**

```python
def _analyze_and_match_clients(self, combined_text: str, document_summaries: List[Dict]) -> Dict[str, Any]
```

Diese Phase implementiert Custom NER über structured LLM prompts für die Extraktion von Entitäten wie Namen, Adressen, Steuernummern. Der Client Matching Algorithmus nutzt Fuzzy String Matching (Levenshtein Distance) über `_find_best_client_match()` für approximate string matching gegen die SQLAlchemy Client-Models. Das System implementiert Confidence Scoring basierend auf weighted similarity metrics.

**3. Optimale Vorlagenauswahl**
Basierend auf dem Dokumentinhalt und den erkannten Dokumenttypen wählt der Service automatisch die beste verfügbare Vorlage aus. Der Algorithmus berücksichtigt dabei sowohl den Dokumenttyp als auch die spezifischen Anforderungen des erkannten Kundentyps (natürliche Person vs. Unternehmen).

**4. Feldextraktion für die gewählte Vorlage**
Nachdem eine Vorlage ausgewählt wurde, extrahiert der Service systematisch alle erforderlichen Informationen aus den Originaldokumenten. Dabei werden sowohl Kundeninformationen als auch dokumentspezifische Daten berücksichtigt, um alle Platzhalter in der Vorlage zu füllen.

**5. Finale Dokumentgenerierung**
Im letzten Schritt wird das finale Dokument generiert, wobei alle extrahierten Informationen in die gewählte Vorlage eingefügt werden. Das Ergebnis ist ein vollständig ausgefülltes, professionelles Dokument.

### Workflow Orchestration

```python
def create_intelligent_workflow(
    self,
    uploaded_files: List[Any],
    workflow_name: str,
    workflow_description: str = "",
    user_preferences: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]
```

Diese Methode implementiert ein Complex Object Factory Pattern für die automatisierte WorkOrder-Erstellung. Sie nutzt SQLAlchemy Transactions mit rollback-fähigen Database Operations, um ACID-Compliance zu gewährleisten. Der Workflow nutzt Dependency Injection für User Preferences und implementiert Strategy Pattern für verschiedene Workflow-Typen.

## Service Dependencies & Integration

Der AIAgentService implementiert das Dependency Injection Pattern:

```python
def __init__(self):
    self.ollama_service = ollama_service  # Singleton LLM Service
    self.document_service = document_service  # Document Processing Service
```

**LLM Service Integration**: Nutzt RESTful API calls zu lokalen Ollama-Endpoints mit Connection Pooling und Retry Logic
**Document Service**: Interface für OCR, DOCX/PDF processing via python-docx und PyPDF2/pdfplumber
**SQLAlchemy ORM**: Direkte Model-Zugriffe auf Client, Document, WorkOrder, TaxAdvisor Entities mit Lazy Loading

# LLM Service

Die `OllamaService` Klasse implementiert ein RESTful HTTP Client Interface für lokale Large Language Model Inference über Ollama Runtime. Sie nutzt das `requests` Library für HTTP Communication und implementiert Connection Pooling, Retry Logic und Error Handling für robuste LLM Integration.

## Technical Architecture

Die Klasse implementiert das Adapter Pattern für verschiedene LLM-Modelle und nutzt Factory Methods für Model-spezifische Konfigurationen. Sie kapselt Ollama's REST API und bietet type-safe Python Interfaces mit comprehensive error handling und response validation.

## Technische Architektur

### Lokale KI-Integration

Das System kommuniziert mit Ollama über dessen REST-API. Der Service kann automatisch erkennen, ob Ollama installiert und verfügbar ist, und passt seine Funktionalität entsprechend an. Falls Ollama nicht verfügbar ist, degradiert das System graceful und informiert Benutzer über den Status.

### Modell-Management

Der Service bietet umfassende Funktionen für die Verwaltung verschiedener KI-Modelle:

**Modell-Kategorisierung**: Automatische Unterscheidung zwischen Text- und Bildverarbeitungsmodellen
**Leistungsoptimierung**: Empfehlungen für verschiedene Hardware-Konfigurationen
**Fallback-Mechanismen**: Automatische Auswahl alternativer Modelle bei Verfügbarkeitsproblemen

Das System unterstützt verschiedene Modelltypen für unterschiedliche Anwendungsfälle - von kompakten Modellen für schnelle Textverarbeitung bis hin zu spezialisierten Vision-Language-Modellen für die Dokumentenanalyse.

## Kernfunktionalitäten

### Text Generation & Completion APIs

```python
def generate_completion(
    self,
    prompt: str,
    model: str = None,
    system_prompt: Optional[str] = None,
    temperature: float = 0.7,
    max_tokens: int = 500,
    stream: bool = False
) -> Dict[str, Any]
```

**Parameter Configuration**:

- **Temperature**: Steuert Sampling Randomness (0.0 = deterministic, 1.0 = maximum entropy)
- **Max Tokens**: Token Limit für Response Generation mit Tokenizer-aware Truncation
- **System Prompt**: Context Injection für Instruction-based Fine-tuning Simulation
- **Streaming Mode**: Server-Sent Events (SSE) für Real-time Token Generation

### Named Entity Recognition & Information Extraction

```python
def extract_placeholders_from_text(
    self,
    document_text: str,
    placeholders: List[Dict[str, Any]],
    model: str = 'qwen3:0.6b'
) -> Dict[str, Any]
```

**Structured Information Extraction**:

- **Custom NER Pipeline**: Implementiert structured prompting für Entity Recognition
- **JSON Schema Validation**: Output Validation gegen predefined Placeholder Schemas
- **Data Type Coercion**: Automatic type conversion (str→int, str→datetime, etc.)
- **Confidence Scoring**: Probability-based confidence metrics für extracted values
- **Fallback Strategies**: Multiple extraction attempts mit decreasing confidence thresholds

Der Extraktionsprozess verwendet strukturierte Prompts, die dem Sprachmodell klare Anweisungen geben, welche Informationen zu suchen und wie sie zu formatieren sind. Das System kann auch mit unvollständigen oder unklaren Informationen umgehen und Vertrauenswerte für extrahierte Daten bereitstellen.

### Response-Bereinigung

Ein wichtiges Feature ist die automatische Bereinigung von LLM-Antworten. Das System entfernt interne "Thinking-Tags" und andere Metadaten, die das Sprachmodell möglicherweise generiert, und liefert saubere, benutzerfreundliche Ausgaben.

## Qualitätssicherung und Validierung

### Datenvalidierung

Der Service implementiert umfassende Validierungslogik für extrahierte Daten. Jeder Platzhalter-Typ hat spezifische Validierungsregeln:

- **Textfelder**: Längenprüfung und Zeichensatzvalidierung
- **Numerische Felder**: Format- und Bereichsprüfung
- **Datumsfelder**: Parsing und Plausibilitätsprüfung
- **Auswahlfelder**: Überprüfung gegen definierte Optionslisten

### Vertrauenswerte

Für alle extrahierten Informationen berechnet das System Vertrauenswerte (Confidence Scores). Diese helfen Benutzern zu verstehen, wie zuverlässig die automatisch extrahierten Daten sind, und ermöglichen es ihnen, bei niedrigen Vertrauenswerten eine manuelle Überprüfung durchzuführen.

## Systemintegration

### Status-Monitoring

Der Service bietet umfassende Status-Informationen über das Ollama-System:

- **Installationsstatus**: Erkennung, ob Ollama verfügbar ist
- **Verfügbare Modelle**: Liste aller installierten Modelle
- **Systemleistung**: Informationen über Modellgrößen und Anforderungen

### Konfigurationsmanagement

Das System kann über Umgebungsvariablen und Anwendungskonfiguration angepasst werden. Dies umfasst die Ollama-Server-URL, Standard-Modelle und Performance-Parameter.

## Performance und Skalierung

### Optimierte Prompt-Gestaltung

Der Service verwendet sorgfältig gestaltete Prompts, die für maximale Effizienz und Genauigkeit optimiert sind. Die Prompts sind so strukturiert, dass sie klare, konsistente Ergebnisse liefern und gleichzeitig die Verarbeitungszeit minimieren.

### Ressourcenmanagement

Das System überwacht die Verfügbarkeit von KI-Ressourcen und kann bei Überlastung alternative Strategien einsetzen. Dies gewährleistet eine stabile Systemleistung auch bei hoher Auslastung.

## Sicherheit und Datenschutz

### Lokale Verarbeitung

Ein entscheidender Vorteil des LLM Service ist die vollständig lokale Verarbeitung aller Daten. Keine Kundeninformationen oder Dokumentinhalte verlassen das lokale System, was höchste Datenschutzstandards gewährleistet.

## Entwicklung und Wartung

Der modulare Aufbau des LLM Service ermöglicht es, neue Modelle und Funktionen einfach zu integrieren. Das System ist darauf vorbereitet, mit der rapidenEntwicklung im Bereich der lokalen Sprachmodelle Schritt zu halten und neue Möglichkeiten zu nutzen, sobald sie verfügbar werden.

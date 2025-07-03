# Document Preview

## Übersicht und Zweck

Die `DocumentPreview` Komponente ermöglicht es Steuerberatern und Kanzleimitarbeitern, Dokumente vor der finalen Erstellung zu betrachten und zu überprüfen. Sie ist ein unverzichtbares Werkzeug für die Qualitätssicherung in der Dokumentenerstellung und verhindert Fehler bei wichtigen Steuerdokumenten.

## Hauptfunktionen und Anwendungsgebiete

### Sichere Dokumentvorschau für Steuerdokumente

Diese Komponente wurde speziell für die Vorschau von steuerrechtlichen Dokumenten entwickelt. Sie unterstützt verschiedene Dokumenttypen wie Steuererklärungen, Einsprüche, Vollmachten und andere rechtlich relevante Unterlagen, die in Steuerkanzleien täglich erstellt werden.

**Unterstützte Dokumentformate:**

- **PDF-Dokumente**: Vollständige PDF-Darstellung mit allen Formatierungen
- **Word-Dokumente**: DOCX-Dateien mit korrekter Formatierung
- **Vorlagen mit Platzhaltern**: Dynamische Dokumentvorschau mit eingefügten Mandantendaten

### Zwei Darstellungsmodi für verschiedene Bedürfnisse

**PDF-Vorschaumodus**:
Zeigt das Dokument genau so an, wie es gedruckt oder versendet werden würde. Dies ist besonders wichtig für offizielle Dokumente, die an Finanzämter oder Gerichte übermittelt werden. Der PDF-Modus garantiert, dass Formatierungen, Seitenumbrüche und Layout exakt der finalen Version entsprechen.

**Text-Vorschaumodus**:
Bietet eine schnelle Übersicht über den Dokumentinhalt mit hervorgehobenen Platzhaltern. Dieser Modus ist ideal für die schnelle Überprüfung von Inhalten, bevor das finale PDF generiert wird. Steuerberater können so efizient prüfen, ob alle relevanten Daten korrekt eingefügt wurden.

### Intelligente Platzhalter-Verarbeitung

Das System arbeitet mit einem fortschrittlichen Platzhalter-System, das Mandantendaten automatisch in Dokumentvorlagen einfügt:

**Echtzeit-Aktualisierung**: Änderungen an Mandantendaten werden sofort in der Vorschau reflektiert, ohne dass das Dokument neu geladen werden muss.

**Validierung von Pflichtfeldern**: Das System überprüft automatisch, ob alle erforderlichen Daten für das Dokument vorhanden sind und markiert fehlende Informationen.

**Formatierte Darstellung**: Zahlen, Daten und andere Werte werden automatisch in der korrekten rechtlichen Formatierung angezeigt.

### Navigation und Benutzerfreundlichkeit

**Seitennavigation**: Bei mehrseitigen Dokumenten ermöglicht eine intuitive Navigation das schnelle Springen zwischen Seiten.

**Zoom-Funktionen**: Verschiedene Vergrößerungsstufen für bessere Lesbarkeit, besonders bei kleinen Texten oder detaillierten Tabellen.

**Suchfunktion**: Textsuche innerhalb des Dokuments zum schnellen Auffinden spezifischer Inhalte.

## Technische Grundlagen

```typescript
// Kern-Komponenten-Struktur
export default defineComponent({
  name: "DocumentPreview",
  props: {
    documentId: Number,
    placeholderValues: Object,
    documentFile: File,
    initialViewMode: String,
  },
});
```

### Integration mit dem Dokumentgenerierungssystem

Die Komponente kommuniziert nahtlos mit dem Backend-System für die Dokumentgenerierung:

```typescript
// Basis-API für Dokumentvorschau
DocumentAPI.getDocumentPreview(documentId, placeholderValues);
DocumentAPI.getTemporaryPreview(file, placeholderValues);
```

## Workflow-Integration und Arbeitsabläufe

### Qualitätskontrolle vor Dokumentfinalisierung

Die Dokumentvorschau ist ein kritischer Schritt im Dokumenterstellungsprozess. Bevor wichtige Dokumente wie Steuererklärungen oder Rechtsdokumente finalisiert werden, können Steuerberater:

- **Inhaltsprüfung**: Alle eingefügten Daten auf Korrektheit überprüfen
- **Formatierungskontrolle**: Sicherstellen, dass das Layout professionell und korrekt ist
- **Vollständigkeitsprüfung**: Verifizieren, dass alle erforderlichen Abschnitte ausgefüllt sind
- **Rechtschreibprüfung**: Texte auf Fehler überprüfen

### Verschiedene Anwendungsszenarien

**Mandantengespräche**: Während Beratungsterminen können Dokumente gemeinsam mit dem Mandanten betrachtet und besprochen werden.

**Interne Revision**: Vor dem Versand an Behörden werden Dokumente von Kollegen oder Vorgesetzten überprüft.

**Schulungszwecke**: Neue Mitarbeiter können anhand der Vorschau lernen, wie korrekte Dokumente aussehen sollten.

**Dokumentvergleich**: Verschiedene Versionen eines Dokuments können miteinander verglichen werden.

## Benutzerfreundlichkeit und Accessibility

### Intuitive Bedienung

Die Komponente wurde für die tägliche Arbeit in Steuerkanzleien optimiert:

**Ein-Klick-Vorschau**: Dokumente können mit einem einzigen Klick in der Vorschau angezeigt werden.

**Kontextuelle Hilfe**: Tooltips und Hilfetexte unterstützen bei der Bedienung.

**Keyboard-Navigation**: Vollständige Bedienung über Tastatur für Power-User.

Diese Komponente ist essentiell für die professionelle Dokumenterstellung in Steuerkanzleien und trägt maßgeblich zur Qualitätssicherung und Fehlerreduzierung bei.

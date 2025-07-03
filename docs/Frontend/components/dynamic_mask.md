# Dynamic Mask

## Übersicht und Zweck

Die `DynamicMask` Komponente erstellt dynamische und kontextsensitive Eingabeformulare für die Erfassung von Mandantendaten und steuerrelevanten Informationen. Sie passt sich automatisch an verschiedene Dokumenttypen an und gewährleistet eine konsistente und fehlerfreie Dateneingabe in Steuerberatungskanzleien.

## Hauptfunktionen und Anwendungsgebiete

### Adaptive Formulargenerierung für Steuerdokumente

Diese Komponente revolutioniert die Dateneingabe in Steuerberatungskanzleien durch die automatische Generierung passender Eingabemasken basierend auf dem gewählten Dokumenttyp. Ob Einkommensteuererklärung, Umsatzsteuervoranmeldung oder Jahresabschluss - die Maske passt sich automatisch an die spezifischen Anforderungen an.

**Dokumenttyp-spezifische Anpassung**:
Jeder Dokumenttyp in der Steuerberatung hat unterschiedliche Datenanforderungen. Die Komponente erkennt automatisch, welche Felder für welchen Dokumenttyp relevant sind und blendet irrelevante Eingaben aus. Dies reduziert Verwirrung und beschleunigt die Dateneingabe erheblich.

**Hierarchische Feldorganisation**:
Komplexe Steuerdokumente werden in logische Abschnitte unterteilt, die sich erweitern und zusammenklappen lassen. Beispielsweise können in einer Einkommensteuererklärung die Bereiche "Einkünfte aus nichtselbständiger Arbeit", "Sonderausgaben" und "Außergewöhnliche Belastungen" separat bearbeitet werden.

### Intelligente Feldvalidierung und Plausibilitätsprüfung

**Echtzeit-Validierung**:
Während der Eingabe prüft das System kontinuierlich die Plausibilität der eingegebenen Daten. Steuerrechtliche Besonderheiten wie gültige Steuernummernformate, Datum-Bereiche oder Höchstbeträge werden automatisch überwacht.

**Kontextuelle Hilfestellungen**:
Bei komplexen steuerrechtlichen Sachverhalten bietet die Komponente kontextuelle Hilfen und Erklärungen. Tooltips erläutern steuerrechtliche Begriffe und geben Hinweise zur korrekten Ausfüllung.

**Cross-Field-Validierung**:
Das System erkennt Abhängigkeiten zwischen verschiedenen Eingabefeldern und prüft diese automatisch. Beispielsweise wird überprüft, ob die Summe der Einzelpositionen mit der angegebenen Gesamtsumme übereinstimmt.

### Automatische Datenübernahme und -vervollständigung

**Mandantendaten-Integration**:
Bereits im System gespeicherte Mandantendaten werden automatisch in die entsprechenden Felder übernommen. Dies vermeidet redundante Eingaben und reduziert Fehlerquellen.

**Vorjahresvergleich**:
Bei wiederkehrenden Dokumenten wie Jahressteuererklärungen können Daten aus dem Vorjahr als Grundlage verwendet und entsprechend angepasst werden.

**KI-gestützte Vorschläge**:
Basierend auf ähnlichen Mandanten oder historischen Daten schlägt das System plausible Werte vor, die vom Benutzer übernommen oder angepasst werden können.

## Technische Grundlagen

```typescript
// Grundstruktur der dynamischen Maske
export default defineComponent({
  name: "DynamicMask",
  props: {
    templateId: Number,
    initialValues: Object,
    validationRules: Object,
    readOnly: Boolean,
  },
});
```

### Flexible Feldkonfiguration

```typescript
interface FieldDefinition {
  id: string;
  type: "text" | "number" | "date" | "select" | "checkbox";
  label: string;
  required: boolean;
  validation: ValidationRule[];
  dependencies: FieldDependency[];
  help?: string;
}
```

## Benutzerfreundlichkeit und Workflow-Integration

### Intuitive Bedienung für Steuerfachkräfte

**Logische Feldanordnung**:
Die Reihenfolge der Eingabefelder folgt der Logik des jeweiligen Steuerdokuments oder Formulars. Steuerberater können dadurch effizient von oben nach unten arbeiten, ohne zwischen verschiedenen Bereichen springen zu müssen.

**Tab-Navigation und Tastaturkürzel**:
Vollständige Unterstützung für Tastaturnavigation ermöglicht eine schnelle Dateneingabe ohne Mausnutzung. Erfahrene Anwender können so besonders effizient arbeiten.

**Automatische Speicherung**:
Eingegebene Daten werden automatisch zwischengespeichert, um Datenverlust bei unerwarteten Unterbrechungen zu vermeiden.

### Integration in Kanzlei-Workflows

**Workflow-Status-Integration**:
Die Komponente ist eng mit dem Workflow-Management-System verbunden und zeigt den aktuellen Bearbeitungsstand an. Pflichtfelder werden hervorgehoben, und der Fortschritt wird visuell dargestellt.

**Mehrbenutzerfähigkeit**:
In größeren Kanzleien können verschiedene Mitarbeiter nacheinander an derselben Eingabemaske arbeiten. Das System protokolliert, wer welche Änderungen vorgenommen hat.

**Qualitätssicherung**:
Vor der Finalisierung durchläuft jede Eingabemaske einen Validierungsprozess, der sowohl technische als auch fachliche Plausibilitätsprüfungen umfasst.

## Datenqualität und Fehlerprävention

### Proaktive Fehlervermeidung

**Eingabebeschränkungen**:
Das System verhindert bereits bei der Eingabe typische Fehler durch intelligente Formatvorgaben und Wertebereiche. Beispielsweise werden automatisch korrekte Datumsformate erzwungen oder unplausible Beträge abgelehnt.

**Warnsystem**:
Bei ungewöhnlichen oder potenziell fehlerhaften Eingaben warnt das System den Benutzer und bittet um Bestätigung. Dies hilft, Tippfehler und Versehen zu vermeiden.

**Vollständigkeitsprüfung**:
Bevor ein Dokument als abgeschlossen markiert werden kann, überprüft das System die Vollständigkeit aller Pflichtangaben und weist auf fehlende Informationen hin.

### Konsistenz und Standardisierung

**Einheitliche Datenformate**:
Alle Eingaben werden automatisch in standardisierte Formate konvertiert, was die Datenqualität verbessert und die spätere Verarbeitung erleichtert.

**Zentrale Stammdatenverwaltung**:
Häufig verwendete Werte wie Finanzämter, Banken oder Standardtexte werden zentral verwaltet und in Dropdown-Listen angeboten.

**Historische Datenanalyse**:
Das System lernt aus vergangenen Eingaben und kann Unstimmigkeiten oder Abweichungen von üblichen Mustern erkennen.

Diese Komponente ist ein essentielles Werkzeug für die moderne Steuerberatung und trägt maßgeblich zur Effizienzsteigerung und Qualitätsverbesserung in der täglichen Kanzleiarbeit bei.

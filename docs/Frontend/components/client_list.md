# Client List

## Übersicht und Zweck

Die `ClientList` Komponente bildet das Herzstück der Kundenverwaltung in unserem Rechts- und Steuerberatungssystem. Sie ermöglicht Steuerberatern und Kanzleimitarbeitern eine effiziente Verwaltung ihrer gesamten Mandantschaft mit modernen Suchfunktionen und intelligenten Filteroptionen.

## Hauptfunktionen und Anwendungsbereiche

### Mandantenverwaltung für Steuerkanzleien

Diese Komponente wurde speziell für die Bedürfnisse von Steuerberatungskanzleien entwickelt. Sie verwaltet sowohl natürliche Personen als auch Unternehmen als Mandanten und berücksichtigt die spezifischen Anforderungen der Steuerberatung wie Steuernummern, Finanzämter und Mandatsverantwortliche.

**Unterstützte Mandantentypen:**

- **Natürliche Personen**: Privatpersonen mit Steuernummer, Geburtsdatum und persönlichen Daten
- **Unternehmen**: Firmen mit Rechtsform, Umsatzsteuer-ID und Ansprechpartnern

### Intelligente Suchfunktionen

Das System bietet verschiedene Suchmodi, die es ermöglichen, schnell den richtigen Mandanten zu finden:

**Volltext-Suche**: Durchsucht alle relevanten Felder wie Namen, Firmenbezeichnungen, E-Mail-Adressen und Steuernummern gleichzeitig.

**Erweiterte Filter**:

- Nach Mandantentyp (Privatperson/Unternehmen)
- Nach zuständigem Mandatsverantwortlichen
- Nach Finanzamt
- Nach Ort/PLZ
- Nach Rechtsform bei Unternehmen

**Fuzzy-Suche**: Findet auch bei Tippfehlern oder unvollständigen Eingaben die richtigen Ergebnisse.

### Performance-optimierte Darstellung

Für Kanzleien mit vielen Mandanten implementiert die Komponente virtuelles Scrollen, wodurch auch bei tausenden von Datensätzen eine flüssige Bedienung gewährleistet ist. Dies ist besonders wichtig für große Steuerberatungskanzleien mit umfangreicher Mandantschaft.

### Verschiedene Ansichtsmodi

Die Komponente kann in verschiedenen Modi verwendet werden:

**Vollständige Listenansicht**: Zeigt alle Mandanten mit allen relevanten Informationen in einer übersichtlichen Tabellenform.

**Suchmodmodus**: Kompakte Darstellung für die Mandantenauswahl in anderen Bereichen der Anwendung.

**Mehrfachauswahl**: Ermöglicht die Auswahl mehrerer Mandanten für Massenoperationen wie Serienbriefe oder Sammelrechnungen.

## Technische Integration

```typescript
// Grundlegende Komponenten-Definition
export default defineComponent({
  name: "ClientList",
  props: {
    searchMode: Boolean,
    multiSelect: Boolean,
    virtualized: Boolean,
  },
});
```

### Datenmodell für Mandanten

Die Komponente arbeitet mit einem strukturierten Datenmodell, das sowohl deutsche Rechtsformen als auch steuerrechtliche Anforderungen berücksichtigt:

```typescript
interface Client {
  id: number;
  client_type: "natural" | "company";

  // Für Privatpersonen
  salutation?: "Herr" | "Frau";
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  tax_id?: string;

  // Für Unternehmen
  company_name?: string;
  legal_form?: "GmbH" | "AG" | "UG" | "KG" | "OHG" | "e.K.";
  vat_id?: string;

  // Gemeinsame Felder
  mandate_manager: string;
  tax_number: string;
  tax_office: string;
  email: string;
  address_street: string;
  address_city: string;
  address_zip: string;
}
```

## Benutzerfreundlichkeit und Workflow-Integration

### Intuitive Bedienung

Die Komponente wurde mit Fokus auf die tägliche Arbeit in Steuerkanzleien entwickelt. Häufig verwendete Funktionen sind schnell erreichbar, und die Suche beginnt bereits während der Eingabe.

### Integration in Arbeitsabläufe

Die Mandantenliste ist eng mit anderen Komponenten der Anwendung verzahnt:

- **Dokumentenerstellung**: Direkter Übergang von der Mandantenauswahl zur Dokumenterstellung
- **Workflow-Management**: Automatische Zuordnung von Arbeitsaufträgen zu Mandanten
- **Terminplanung**: Verknüpfung mit Terminen und Fristen
- **Rechnungsstellung**: Basis für die Abrechnung von Mandantsleistungen

## Konfigurationsmöglichkeiten

Administratoren können verschiedene Aspekte der Komponente anpassen:

- **Anzuzeigende Felder**: Welche Informationen in der Liste angezeigt werden
- **Standardsortierung**: Nach welchem Kriterium die Liste initial sortiert wird
- **Filtervoreinstellungen**: Vordefinierte Filter für verschiedene Benutzergruppen
- **Zugriffsrechte**: Welche Benutzer welche Mandanten sehen und bearbeiten dürfen

Diese Komponente ist essentiell für den effizienten Betrieb einer modernen Steuerberatungskanzlei und bildet die Grundlage für alle mandantenbezogenen Prozesse im System.

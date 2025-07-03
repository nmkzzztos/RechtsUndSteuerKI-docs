---
id: datenmodelle
title: Datenmodelle
sidebar_position: 4
---

# Datenmodelle

Die Data Model Layer implementiert Domain-Driven Design (DDD) Principles mit SQLAlchemy ORM für complex business entity relationships. Alle Models erben von `db.Model` (Flask-SQLAlchemy) und implementieren declarative mapping mit Table-per-Class inheritance patterns.

## Technical Database Architecture

**SQLAlchemy Configuration**:

- **Declarative Base**: `db.Model` als Base Class für alle Entities
- **Foreign Key Constraints**: Referential integrity durch SQLAlchemy ForeignKey constraints
- **Indexing Strategy**: Optimized indexing für query performance auf häufig verwendete lookups
- **Connection Pooling**: Automatic connection pool management für concurrent access
- **Migration Support**: Alembic integration für schema versioning und database migrations

## Client Model - Mandantenverwaltung

Das Client-Modell ist das Herzstück der Mandantenverwaltung und wurde entwickelt, um sowohl natürliche Personen als auch Unternehmen effizient zu verwalten. Diese duale Struktur berücksichtigt die unterschiedlichen rechtlichen und steuerlichen Anforderungen beider Mandantentypen.

### Polymorphic Entity Design

```python
class Client(db.Model):
    __tablename__ = 'clients'

    client_type = db.Column(db.String(20), nullable=False)  # Discriminator column
```

**Table-per-Class Polymorphism**:
Das Model implementiert Single Table Inheritance mit Discriminator Column `client_type`. Conditional Field Validation erfolgt über SQLAlchemy hybrid properties und custom validators. Die `to_dict()` method implementiert polymorphic serialization mit type-specific field inclusion via conditional dictionary updates.

### Persönliche Daten (Natürliche Personen)

Für natürliche Personen werden umfassende persönliche Informationen gespeichert, einschließlich Anrede (über das Salutation-Enum), Titel, Vor- und Nachname, Geburtsdatum sowie die deutsche Steuer-ID. Diese Struktur entspricht den Anforderungen deutscher Steuerbehörden und ermöglicht eine vollständige Mandantenidentifikation.

### Unternehmensdaten

Unternehmen werden mit spezifischen Geschäftsinformationen verwaltet, einschließlich Firmenname, Rechtsform (über das LegalForm-Enum) und Umsatzsteuer-ID. Das LegalForm-Enum umfasst alle gängigen deutschen Rechtsformen wie GmbH, AG, UG, OHG, KG, GbR und Einzelfirma.

### Kontaktperson-Management

Für Unternehmen implementiert das Modell ein dediziertes Kontaktperson-System mit separaten Feldern für Ansprechpartner. Dies ermöglicht es, die rechtliche Unternehmensstruktur von den praktischen Kommunikationswegen zu trennen.

### Steuerliche Integration

Das Modell beinhaltet umfassende steuerliche Informationen, einschließlich Steuernummer, zuständigem Finanzamt und Finanzgericht. Zusätzlich werden vollständige Finanzamt-Kontaktdaten gespeichert, was eine direkte Kommunikation mit Behörden ermöglicht.

### Adressverwaltung

Sowohl für Mandanten als auch für die zuständigen Finanzämter werden vollständige Adressinformationen gespeichert. Dies unterstützt automatisierte Dokumentengenerierung und Behördenkommunikation.

## Document Model - Dokumentenverwaltung

Das Document-Modell verwaltet alle Arten von Dokumenten und Vorlagen im System. Es ist darauf ausgelegt, sowohl finale Dokumente als auch Arbeitsvorlagen zu handhaben und unterstützt den gesamten Dokumentenlebenszyklus.

### Dokumenttypen und Status

Dokumente werden über das `document_type`-Feld kategorisiert (z.B. 'tax_return', 'annual_report'), während das `status`-Feld den Bearbeitungsstand anzeigt ('draft', 'final'). Diese Strukturierung ermöglicht effiziente Workflows und Qualitätskontrolle.

### JSON Schema-based Placeholder System

```python
class Document(db.Model):
    placeholders = db.Column(db.JSON)  # PostgreSQL JSONB / MySQL JSON column
```

**Technical Implementation**:

- **JSON Schema Validation**: Runtime validation gegen predefined JSON schemas
- **Nested Object Support**: Complex placeholder hierarchies via nested JSON structures
- **Query Optimization**: JSONB GIN indexes für efficient JSON query performance (PostgreSQL)
- **Type Safety**: Custom SQLAlchemy types für JSON field validation und serialization

### Beziehungsmanagement

Dokumente können optional mit Mandanten, Steuerberatern und Arbeitsaufträgen verknüpft werden. Diese flexiblen Beziehungen ermöglichen es, Dokumente in verschiedenen Kontexten zu verwenden - von einfachen Vorlagen bis hin zu projektspezifischen Dokumenten.

### Metadaten und Versionierung

Jedes Dokument enthält umfassende Metadaten einschließlich Erstellungs- und Änderungszeitstempel. Dies unterstützt Audit-Trails und ermöglicht eine nachvollziehbare Dokumentenhistorie.

## WorkOrder Model - Arbeitsauftragsverwaltung

Das WorkOrder-Modell repräsentiert Arbeitsaufträge und Projekte in der Kanzlei. Es verbindet Mandanten, Steuerberater und Dokumente zu strukturierten Arbeitspaketen.

### Projektstruktur

Arbeitsaufträge haben einen Titel, eine Beschreibung und können mit einem Fälligkeitsdatum versehen werden. Der Status zeigt den aktuellen Bearbeitungsstand ('open', 'in_progress', 'completed'), während die Priorität ('low', 'medium', 'high') die Dringlichkeit angibt.

### Template-Integration

Ein innovatives Feature ist die Integration mit Dokumentvorlagen über das `template_id`-Feld. Dies ermöglicht es, Arbeitsaufträge mit spezifischen Dokumentvorlagen zu verknüpfen und standardisierte Workflows zu erstellen.

### Beziehungsmanagement

Arbeitsaufträge verknüpfen obligatorisch einen Mandanten mit einem Steuerberater und können beliebig viele Dokumente enthalten. Diese Struktur gewährleistet klare Verantwortlichkeiten und ermöglicht effiziente Projektorganisation.

## TaxAdvisor Model - Steuerberater-Verwaltung

Das TaxAdvisor-Modell verwaltet alle Steuerberater und deren spezifische Informationen. Es ist darauf ausgelegt, sowohl interne Mitarbeiter als auch externe Berater zu verwalten.

### Berufsspezifische Daten

Steuerberater werden mit ihren berufsspezifischen Informationen gespeichert, einschließlich ihrer eigenen Steuernummer und ihres Spezialisierungsgebiets. Dies ermöglicht eine kompetenzbasierte Zuordnung von Mandanten und Projekten.

### Kontaktmanagement

Vollständige Kontaktinformationen einschließlich E-Mail, Telefon und Adresse ermöglichen eine effiziente Kommunikation und Integration in Dokumentenworkflows.

### Beziehungsintegration

Das Modell definiert Beziehungen zu Dokumenten und Arbeitsaufträgen, was eine vollständige Nachverfolgung der Berateraktivitäten ermöglicht.

## User Model - Benutzerverwaltung

Das User-Modell verwaltet Systembenutzer und deren Präferenzen. Es ist darauf ausgelegt, eine personalisierte Benutzererfahrung zu ermöglichen.

### Authentifizierung und Rollen

Benutzer werden über E-Mail-Adressen identifiziert und haben definierte Rollen im System. Dies ermöglicht rollenbasierte Zugriffskontrolle und angemessene Berechtigungsvergabe.

### KI-Präferenzen

Ein besonderes Feature sind die integrierten KI-Modell-Präferenzen. Benutzer können ihre bevorzugten Text- und Bildverarbeitungsmodelle auswählen, was eine personalisierte KI-Erfahrung ermöglicht.

### Internationalisierung

Das Modell unterstützt mehrsprachige Benutzeroberflächen über das `language`-Feld, was wichtig für internationale Kanzleien oder mehrsprachige Teams ist.

## Placeholder Model - Flexibles Platzhalter-System

Das Placeholder-Modell ermöglicht die Definition wiederverwendbarer Platzhalter für Dokumentvorlagen. Diese können verschiedene Datentypen haben und mit Validierungsregeln versehen werden.

### Datentyp-Unterstützung

Platzhalter können verschiedene Datentypen repräsentieren - von einfachen Textfeldern über Datumsangaben bis hin zu komplexen Auswahllisten. Dies ermöglicht die Erstellung intelligenter Dokumentvorlagen.

### Validierung und Qualitätssicherung

Jeder Platzhalter kann mit Validierungsregeln versehen werden, die automatisch überprüfen, ob eingegebene Daten den Anforderungen entsprechen. Dies reduziert Fehler und verbessert die Dokumentqualität.

## Erweiterbarkeit und Wartung

### Modulare Struktur

Die Modelle sind modular aufgebaut und können unabhängig voneinander erweitert werden. Neue Felder oder Beziehungen können hinzugefügt werden, ohne bestehende Funktionalität zu beeinträchtigen.

### Migration-Support

Die Verwendung von SQLAlchemy ORM ermöglicht strukturierte Datenbank-Migrationen bei Modelländerungen, was wichtig für die kontinuierliche Weiterentwicklung ist.

### Performance-Optimierung

Die Modelle sind mit angemessenen Indizes ausgestattet und nutzen Lazy Loading für Beziehungen, um optimale Performance auch bei großen Datenmengen zu gewährleisten.

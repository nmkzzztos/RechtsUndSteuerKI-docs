import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Automatisierte Dokumentenerstellung",
    img: "/img/AutoDokumentation.png",
    description: "Dokumente effizient und fehlerfrei generieren",
  },
  {
    title: "Sicherheit garantiert",
    img: "/img/SicherheitGarnatiert.png",
    description: "Modernste Standards für Sicherheit und Vertraulichkeit",
  },
  {
    title: "KI-gestützte Analyse",
    img: "/img/KIgestutzteAnalyse.png",
    description: "Intelligente Auswertung und Aufbereitung von Informationen",
  },
  {
    title: "Individuelle Anpassbarkeit",
    img: "/img/IndividuelleAnpass.png",
    description: "Lösungen genau zugeschnitten auf Ihre Anforderungen",
  },
];

function Feature({ img, title, description }) {
  return (
    <div className={styles.feature}>
      <img src={img} alt={title} className={styles.featureIcon} />
      <div className={styles.featureText}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <Heading as="h2" className={styles.title}>
        Warum wir?
      </Heading>
      <div className={styles.row}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

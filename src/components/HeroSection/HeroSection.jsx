import React from "react";
import styles from "./HeroSection.module.css";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>
            Rechts- & Steuerprozesse.
            <br />
            Einfach.
            <br />
            Automatisiert.
          </h1>
          <p className={styles.tagline}>
            Optimieren Sie ihre Kanzleiprozesse
            <br />
            mit unserer intelligenten Plattform.
          </p>
          <Link className={styles.cta} to="#">
            Jetzt testen
          </Link>
        </div>
        <div className={styles.imageBlock}>
          <img
            src={useBaseUrl("../../static/img/DocUmwandlung.png")}
            alt="Dokumente einfach erstellen"
            className={styles.heroImage}
          />
          <p className={styles.caption}>
            Dokumente ganz simpel, in wenigen Minuten.
          </p>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroCustom}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            Rechts- & Steuerprozesse.
            <br />
            Einfach.
            <br />
            Automatisiert.
          </h1>
          <p className={styles.subtitle}>
            Optimieren Sie ihre Kanzleiprozesse mit unserer intelligenten
            Plattform.
          </p>
          <Link className={styles.ctaButton} to="/intro">
            Jetzt testen
          </Link>
        </div>
        <div className={styles.heroImage}>
          <img
            src="/img/DocUmwandlung.png"
            alt="Dokumente ganz simpel"
            className={styles.image}
          />
          <p className={styles.imageCaption}>
            Dokumente ganz simpel, in wenigen Minuten.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Willkommen bei ${siteConfig.title}`}
      description="Optimieren Sie Ihre Kanzleiabläufe mit LAX KI"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

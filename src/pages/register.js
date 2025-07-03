import React, { useState } from "react";
import { useHistory } from "@docusaurus/router";
import Layout from "@theme/Layout";
import styles from "./auth.module.css";

export default function RegisterPage() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Registrierungs-Logik
  };

  return (
    <Layout title="Registrieren" description="Neues Konto anlegen">
      <div className={styles.container}>
        <h1>Registrieren</h1>
        <p>Eröffnen Sie ein Benutzerkonto</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Name
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Passwort
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Passwort bestätigen
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={styles.cta}>
            Registrieren
          </button>
        </form>
        <p className={styles.footerText}>
          Bereits registriert?{" "}
          <a onClick={() => history.push("/login")}>Login</a>
        </p>
      </div>
    </Layout>
  );
}

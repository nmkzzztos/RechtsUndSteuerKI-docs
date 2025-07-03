import React, { useState } from "react";
import { useHistory } from "@docusaurus/router";
import Layout from "@theme/Layout";
import styles from "./auth.module.css";

export default function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Auth-Logik
  };

  return (
    <Layout title="Login" description="Anmelden bei LAX KI">
      <div className={styles.container}>
        <h1>Login</h1>
        <p>Willkommen zurück!</p>
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <button type="submit" className={styles.cta}>
            Anmelden
          </button>
        </form>
        <p className={styles.footerText}>
          Du hast noch keinen Account?{" "}
          <a onClick={() => history.push("/register")}>Registrieren</a>
        </p>
      </div>
    </Layout>
  );
}

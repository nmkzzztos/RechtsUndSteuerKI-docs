// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Rechts- & Steuerprozesse. Einfach. Automatisiert.",
  tagline:
    "Optimieren Sie ihre Kanzleiprozesse mit unserer intelligenten Plattform.",
  favicon: "img/favicon.ico",

  future: { v4: true },
  url: "https://www.lax-ki.de",
  baseUrl: "/RechtsUndSteuerKI-docs/",
  organizationName: "lax-ki",
  projectName: "lax-ki-website",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "de",
    locales: ["de"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // Alle Docs unter /intro/*
          routeBasePath: "intro",
          sidebarPath: require.resolve("./sidebars.ts"),
          editUrl: "https://github.com/lax-ki/lax-ki-website/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap",
  ],

  themeConfig: {
    navbar: {
      title: "LAX KI",
      logo: { alt: "Logo", src: "img/LAXKI Weiß.png" },
      items: [
        // Deine React-Startseite
        { to: "/", label: "Home", position: "left" },

        // Dropdown mit korrektem /intro-Prefix
        {
          type: "dropdown",
          label: "Dokumentation",
          position: "left",
          items: [
            { to: "/intro/category/einleitung", label: "Einleitung" },
            { to: "/intro/category/seiten--funktionen", label: "Funktionen" },
            { to: "/intro/category/frontend", label: "Frontend" },
            { to: "/intro/category/backend", label: "Backend" },
          ],
        },

        // React-Seiten Login/Register
        { to: "/login", label: "Login", position: "right" },
        { to: "/register", label: "Registrieren", position: "right" },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Dokumentation",
          items: [
            { label: "Einleitung", to: "/intro/category/einleitung" },
            { label: "Funktionen", to: "/intro/category/seiten--funktionen" },
            { label: "Frontend", to: "/intro/category/frontend" },
            { label: "Backend", to: "/intro/category/backend" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} LAX KI.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;

import React from "react";
import MainComponent from "./MainComponent";
import { createRoot } from "react-dom/client";
import { initI18n } from "./utils/i18nUtils";
import '@shopify/polaris-viz/build/esm/styles.css';
import "./assets/style.css";

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
    const root = createRoot(document.getElementById("app"));
    root.render(<MainComponent />);
});

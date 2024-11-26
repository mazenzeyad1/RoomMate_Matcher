import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 

// Import custom styles
import "./index.css";
const domNode = document.getElementById("root")!;
const root = ReactDOM.createRoot(domNode);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CookiesProvider } from "react-cookie"

const domNode = document.getElementById('root')!;
const root = ReactDOM.createRoot(domNode)

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App/>
    </CookiesProvider>
  </React.StrictMode>
);

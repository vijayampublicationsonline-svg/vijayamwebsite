import React from "react";
import { createRoot } from "react-dom/client";
import Page from "./page.tsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
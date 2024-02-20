import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="eatsy-theme">
    <Router>
     <AppRoutes />
    </Router>
    </ThemeProvider>
  </React.StrictMode>
);

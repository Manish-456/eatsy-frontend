import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Auth0ProviderWithNavigate from "./auth/auth0ProviderWithNavigate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="eatsy-theme">
      <Router>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
        </Auth0ProviderWithNavigate>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

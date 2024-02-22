import React from "react";
import "./global.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import AppRoutes from "./AppRoutes.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Auth0ProviderWithNavigate from "./auth/auth0ProviderWithNavigate.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="eatsy-theme">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Auth0ProviderWithNavigate>
            <Toaster visibleToasts={1} position="bottom-right" richColors />
            <AppRoutes />
          </Auth0ProviderWithNavigate>
        </QueryClientProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

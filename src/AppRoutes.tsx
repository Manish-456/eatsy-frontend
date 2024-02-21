import { Navigate, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Layout from "./layouts/layout";
import AuthCallback from "./pages/AuthCallback";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
      path="/"
      element={
        <Layout>
          <App />
        </Layout>
      }
      />
      <Route 
      path="/auth-callback"
      element={<AuthCallback />}
      />
      <Route 
      path="/profile"
      element={<h2>User Profile</h2>}
      />
      <Route 
      path="*"
      element={<Navigate to={'/'}/>}
      />
    </Routes>
  )
}

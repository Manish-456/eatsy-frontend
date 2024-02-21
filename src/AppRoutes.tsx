import { Navigate, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Layout from "./layouts/layout";
import AuthCallback from "./pages/AuthCallback";
import UserProfilePage from "./pages/UserProfile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
      path="/"
      element={
        <Layout showHero>
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
      element={<Layout>
        <UserProfilePage />
      </Layout>} />
      <Route 
      path="*"
      element={<Navigate to={'/'}/>}
      />
    </Routes>
  )
}

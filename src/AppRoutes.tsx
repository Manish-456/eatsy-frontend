import { Navigate, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Layout from "./layouts/layout";

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

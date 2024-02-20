import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
      path="/"
      element={<App />}
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

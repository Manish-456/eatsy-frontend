import { Navigate, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Layout from "./layouts/layout";
import AuthCallback from "./pages/AuthCallback";
import UserProfilePage from "./pages/UserProfile";
import ProtectedRoute from "./auth/protected-route";
import RestaurantSettings from "./pages/RestaurantSetting";
import SearchPage from "./pages/searchPage";
import DetailPage from "./pages/DetailPage";

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
      <Route path="/auth-callback" element={<AuthCallback />} />
        <Route
          path="/search/:city"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
          <Route
            path="/restaurant/detail/:restaurantId"
            element={
              <Layout>
                <DetailPage />
              </Layout>
            }
            />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/restaurant/manage"
          element={
            <Layout>
              <RestaurantSettings />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

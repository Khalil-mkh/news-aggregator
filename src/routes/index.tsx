import { Routes, Route, Navigate } from "react-router-dom";
import NewsHomePage from "../features/newsHome/pages";
import ForYouNewsPage from "../features/forYouNews/pages";
import UserPreferencesPage from "../features/userPreferences/pages";
import { usePreferencesStore } from "../features/userPreferences/store/preferencesStore";

const AppRoutes = () => {
  const { isPreferencesSet } = usePreferencesStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={isPreferencesSet ? "/home" : "/preferences"} replace />
        }
      />
      <Route
        path="/home"
        element={
          isPreferencesSet ? <NewsHomePage /> : <Navigate to="/" replace />
        }
      />

      <Route
        path="/for-you"
        element={
          isPreferencesSet ? <ForYouNewsPage /> : <UserPreferencesPage />
        }
      />

      <Route
        path="/preferences"
        element={
          !isPreferencesSet ? (
            <UserPreferencesPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;

import { useRoutes, Navigate } from "react-router-dom";
import { usePreferencesStore } from "../features/userPreferences/store/preferencesStore";
import NewsHomePage from "../features/newsHome/pages";
import ForYouNewsPage from "../features/forYouNews/pages";
import UserPreferencesPage from "../features/userPreferences/pages";
import AppLayout from "../shared/components/appLayout";
import NotFound from "../shared/components/notFound.tsx";

const AppRoutes = () => {
  const { isPreferencesSet } = usePreferencesStore();

  return useRoutes([
    {
      path: "/preferences",
      element: !isPreferencesSet ? (
        <UserPreferencesPage />
      ) : (
        <Navigate to="/home" replace />
      ),
    },

    {
      path: "/",
      element: isPreferencesSet ? (
        <AppLayout />
      ) : (
        <Navigate to="/preferences" replace />
      ),
      children: [
        { path: "home", element: <NewsHomePage /> },
        { path: "for-you", element: <ForYouNewsPage /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
};

export default AppRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import NewsHomePage from "../features/newsHome/pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<NewsHomePage />} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;

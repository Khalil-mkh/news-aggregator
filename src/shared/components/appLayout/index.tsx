import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-tarawera-900 px-12 py-4">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;

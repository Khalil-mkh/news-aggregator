import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-tarawera-900 px-12 py-4">
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

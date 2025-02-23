import Navbar from "../navbar";
import { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren & { showUpdatePreferences: boolean }> = ({
  children,
  showUpdatePreferences,
}) => {
  return (
    <div className="min-h-screen bg-tarawera-900 px-12 py-4">
      <Navbar showUpdatePreferences={showUpdatePreferences} />
      {children}
    </div>
  );
};

export default AppLayout;

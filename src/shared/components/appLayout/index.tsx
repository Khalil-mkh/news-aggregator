import Navbar from "../navbar";
import { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren & { showUpdatePreferences: boolean }> = ({
  children,
  showUpdatePreferences,
}) => {
  return (
    <div className="min-h-screen bg-tarawera-900">
      <Navbar showUpdatePreferences={showUpdatePreferences} />
      <div className="pt-18">{children}</div>
    </div>
  );
};

export default AppLayout;
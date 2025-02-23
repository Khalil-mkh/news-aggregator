import { FC, PropsWithChildren, ReactNode } from "react";

const PreferencesLayout: FC<
  PropsWithChildren & {
    actions?: ReactNode;
  }
> = ({ children, actions }) => {
  return (
    <div className="min-h-screen bg-tarawera-900 flex flex-col justify-center items-center p-4 space-y-4">
      <img src="/src/assets/logo.svg" className="h-12" alt="Innoscripta Logo" />
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col h-[500px] sm:h-[550px] md:h-[500px]">
        <h2 className="text-lg sm:text-xl font-bold text-center">
          Select your news preferences
        </h2>
        <div className="flex-1 overflow-auto">{children}</div>
        <div>{actions}</div>
      </div>
    </div>
  );
};

export default PreferencesLayout;

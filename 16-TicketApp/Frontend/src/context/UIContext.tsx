import { createContext, useState } from "react";
import { ReactNode } from "react";

interface UIContextProps {
  hiddenMain: boolean;
  showMain: () => void;
  hideMain: () => void;
}

const UIContext = createContext({} as UIContextProps);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [hiddenMain, setHiddenMain] = useState(false);

  const showMain = () => setHiddenMain(false);
  const hideMain = () => setHiddenMain(true);

  return (
    <UIContext.Provider
      value={{
        hiddenMain,
        showMain,
        hideMain,
      }}
      children={children}
    />
  );
};

export { UIContext };

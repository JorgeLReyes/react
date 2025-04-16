import { useContext, useEffect } from "react";
import { UIContext } from "../context/UIContext";

export const useHideMain = (hidden: boolean) => {
  const { showMain, hideMain } = useContext(UIContext);

  useEffect(() => {
    if (hidden) hideMain();
    else showMain();
  }, [hidden]);
};

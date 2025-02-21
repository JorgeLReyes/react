import { type TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useAppStore = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  return { useAppSelector };
};

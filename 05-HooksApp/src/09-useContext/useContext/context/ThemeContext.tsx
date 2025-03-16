import { ChangeEvent, createContext, ReactNode, useState } from "react";

export interface ThemeProps {
  theme: string;
  handleTheme: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ThemeContext = createContext<Partial<ThemeProps>>({});
ThemeContext.displayName = "ThemeContextHook";
export default ThemeContext;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const handleTheme = (e: ChangeEvent<HTMLInputElement>) =>
    setTheme(e.target.value);

  const data = { theme, handleTheme };

  return (
    <>
      <h2>Provider</h2>
      <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
    </>
  );
};

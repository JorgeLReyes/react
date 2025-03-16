import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { purpleTheme } from "./purpleTheme";
// import { ThemeProvider } from "@emotion/react";

const Theme = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;

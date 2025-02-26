import { Box, Toolbar } from "@mui/material";
import { ReactNode } from "react";
import { Navbar } from "../components";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;
const JournalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default JournalLayout;

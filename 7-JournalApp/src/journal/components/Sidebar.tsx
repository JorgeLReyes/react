import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useStore } from "../../hook";
import { SidedbarItem } from "./SidedbarItem";
const Sidebar = ({ drawerWidth }: { drawerWidth: number }) => {
  const { useAppSelector } = useStore();
  const { displayName, notes } = useAppSelector((state) => ({
    displayName: state.auth.displayName,
    notes: state.journal.notes,
  }));
  return (
    <Box
      component="nav"
      sx={{
        width: {
          sm: drawerWidth,
        },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component={"div"}>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SidedbarItem key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

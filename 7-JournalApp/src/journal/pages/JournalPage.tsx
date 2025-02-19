import { AddOutlined } from "@mui/icons-material";
import JournalLayout from "../layouts/JournalLayout";
import { NothingSelectedView } from "../views/";
import { IconButton } from "@mui/material";

export const JournalPage = () => {
  return (
    <JournalLayout>
      <NothingSelectedView />
      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
          zIndex: 1000,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
      {/* <NoteView /> */}
    </JournalLayout>
  );
};

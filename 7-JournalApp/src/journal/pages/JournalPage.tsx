import { AddOutlined } from "@mui/icons-material";
import JournalLayout from "../layouts/JournalLayout";
import { NothingSelectedView } from "../views/";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { startNewNote } from "../../store/journal";
import { useStore } from "../../hook";
import NoteView from "../views/NoteView";

export const JournalPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { useAppSelector } = useStore();
  const { isSaving, active } = useAppSelector((state) => ({
    isSaving: state.journal.isSaving,
    active: state.journal.active,
  }));
  const onNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={onNewNote}
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
    </JournalLayout>
  );
};

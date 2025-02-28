import { note, setActiveNote } from "../../store/journal";
import {
  Grid2,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useDispatch } from "react-redux";

export const SidedbarItem = ({ note }: { note: note }) => {
  const dispatch = useDispatch();

  const onActiveNote = () => {
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem key={note.id} disablePadding>
      <ListItemButton onClick={onActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid2 container>
          <ListItemText
            primary={note.title}
            style={{
              display: "inline",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
          <ListItemText secondary={note.body} />
        </Grid2>
      </ListItemButton>
    </ListItem>
  );
};

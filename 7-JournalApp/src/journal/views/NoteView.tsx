import { DeleteOutline, SaveOutlined, UploadFile } from "@mui/icons-material";
import {
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ImageGallery } from "../components/";
import { useForm, useStore } from "../../hook";
import {
  note,
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
// import { styled } from "@mui/material/styles";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const NoteView = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { useAppSelector } = useStore();
  const dispatch = useDispatch<AppDispatch>();
  const { noteActive, messageSave, isSaving } = useAppSelector((state) => ({
    noteActive: state.journal.active,
    messageSave: state.journal.messageSave,
    isSaving: state.journal.isSaving,
  }));
  const { form, onInputChange } = useForm<note>(noteActive!);

  const dateString = useMemo(() => {
    const newDate = new Date(form.date);
    return newDate.toLocaleDateString();
  }, [form.date]);

  useEffect(() => {
    dispatch(setActiveNote(form));
  }, [form]);

  useEffect(() => {
    if (messageSave) Swal.fire("Nota actualizada", messageSave, "success");
  }, [messageSave]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid2
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ mb: 1 }}
    >
      <Grid2>
        <Typography fontSize={39} fontWeight={200}>
          {dateString}
        </Typography>
      </Grid2>
      <Grid2>
        {/* <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUpload />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={onFileInputChange}
            multiple
          />
        </Button> */}
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{
            display: "none",
          }}
          ref={fileRef}
        />
        <IconButton
          onClick={() => {
            fileRef.current?.click();
          }}
        >
          <UploadFile />
        </IconButton>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid2>
      <Grid2 container size={12}>
        <TextField
          type="text"
          variant="filled"
          placeholder="Ingrese un titulo"
          label="Titulo"
          name="title"
          onChange={onInputChange}
          value={form.title}
          sx={{ border: "none", mb: 1 }}
          fullWidth
        />
        <TextField
          type="text"
          variant="filled"
          multiline
          placeholder="¿Que sucedio en el dia de hoy?"
          name="body"
          onChange={onInputChange}
          value={form.body}
          minRows={5}
          fullWidth
        />
      </Grid2>
      <Grid2 container justifyContent={"end"}>
        <Button
          onClick={onDelete}
          sx={{
            mt: 2,
          }}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid2>
      <ImageGallery photos={noteActive?.imageUrl || []} />
    </Grid2>
  );
};

export default NoteView;

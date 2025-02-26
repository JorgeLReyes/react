import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components/";

const NoteView = () => {
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
          28 de agosto, 2025
        </Typography>
      </Grid2>
      <Grid2>
        <Button color="primary" sx={{ padding: 2 }}>
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
          sx={{ border: "none", mb: 1 }}
          fullWidth
        />
        <TextField
          type="text"
          variant="filled"
          multiline
          placeholder="¿Que sucedio en el dia de hoy?"
          minRows={5}
          fullWidth
        />
      </Grid2>
      <ImageGallery />
    </Grid2>
  );
};

export default NoteView;

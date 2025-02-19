import { StarOutline } from "@mui/icons-material";
import { Grid2, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid2
      container
      spacing={0}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        minHeight: "calc(100vh - 115px)",
        backgroundColor: "primary.main",
        borderRadius: 2,
      }}
    >
      <Grid2 size={{ xs: 12 }} textAlign={"center"}>
        <StarOutline sx={{ fontSize: 100, color: "white" }} />
      </Grid2>
      <Grid2 size={{ xs: 12 }} textAlign={"center"}>
        <Typography color="white" variant="h5">
          Selecciona o crea una entrada
        </Typography>
      </Grid2>
    </Grid2>
  );
};

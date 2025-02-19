import { Button, Grid2, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid2 container>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="correo@gmail.com"
              fullWidth
            />
          </Grid2>
          <Grid2 container sx={{ mb: 2, mt: 1 }} size={12}>
            <Grid2 size={{ xs: 12 }}>
              <Button variant="contained" fullWidth>
                Crear cuenta
              </Button>
            </Grid2>
          </Grid2>
          <Grid2 container direction={"row"} justifyContent={"end"} size={12}>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  );
};

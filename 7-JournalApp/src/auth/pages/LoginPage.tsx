import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid2,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useForm, useStore } from "../../hook";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";

const initialState = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { useAppSelector } = useStore();
  const { status, errorMessage } = useAppSelector((state) => ({
    status: state.auth.status,
    errorMessage: state.auth.errorMessage,
  }));
  const dispacth = useDispatch<AppDispatch>();

  const { form, onInputChange } = useForm<{
    email: string;
    password: string;
  }>(initialState);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispacth(startLoginWithEmailPassword(form));
  };

  const onGoogleSignIn = () => {
    dispacth(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid2 container>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              placeholder="correo@gmail.com"
              fullWidth
              value={form.email}
              onChange={onInputChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              placeholder="correo@gmail.com"
              fullWidth
              value={form.password}
              onChange={onInputChange}
            />
          </Grid2>
          <Grid2 container spacing={2} sx={{ mt: 2 }} size={12}>
            <Grid2
              size={{ xs: 12 }}
              sx={{ mb: 1 }}
              display={!errorMessage ? "none" : ""}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={status === "cheking"}
              >
                Login
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                disabled={status === "cheking"}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid2>
          </Grid2>
          <Grid2 container direction={"row"} justifyContent={"end"} size={12}>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  );
};

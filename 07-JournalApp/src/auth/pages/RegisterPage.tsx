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
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { AppDispatch } from "../../store/store";

export interface Form {
  displayName: string;
  email: string;
  password: string;
}

const initialForm = {
  email: "jorge.mini130101@gmail.com",
  password: "12345678",
  displayName: "Jorge Reyes",
};

const validation: Record<keyof Form, { exp: RegExp; message: string }> = {
  displayName: {
    exp: /^[a-z]+(\s[a-z]+)*$/i,
    message: "Nombre inválido",
  },
  email: {
    exp: /^[a-z0-9]+((.|_)[a-z0-9]+){1}@[a-z]{2,}\.[a-z]{3}$/i,
    message: "Correo inválido",
  },
  password: {
    exp: /^\w{8,}$/i,
    message: "Contraseña debe tener mínimo 8 caracteres",
  },
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { useAppSelector } = useStore();
  const { errorMessage, status } = useAppSelector((state) => ({
    errorMessage: state.auth.errorMessage,
    status: state.auth.status,
  }));

  const { form, onInputChange, error, isFormValid } = useForm<Form>(
    initialForm,
    validation
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(form));
  };

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid2 container>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={form.displayName}
              onChange={onInputChange}
              error={!!error?.displayName && formSubmitted}
              helperText={error?.displayName}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={form.email}
              onChange={onInputChange}
              error={!!error?.email && formSubmitted}
              helperText={error?.email}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="correo@gmail.com"
              fullWidth
              name="password"
              value={form.password}
              onChange={onInputChange}
              error={!!error?.password && formSubmitted}
              helperText={error?.password}
            />
          </Grid2>
          <Grid2 container sx={{ mb: 2, mt: 1 }} size={12}>
            <Grid2
              size={{ xs: 12 }}
              sx={{ mb: 1 }}
              display={!errorMessage ? "none" : ""}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={status === "cheking"}
              >
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

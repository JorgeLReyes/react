import { FormEvent, useRef } from "react";
import { useForm } from "../../hooks/useForm";
import "./LoginPage.css";
import { useAuthStore } from "../../hooks/useAuthStore";

const loginForm = {
  loginEmail: "",
  loginPassword: "",
};

const registerForm = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const loginError = useRef<boolean>(null);
  const registerError = useRef<boolean>(null);

  const { startLogin, startRegister, errorMessage, errorCustomMesssage } =
    useAuthStore();
  const { form: login, onInputChange: onLoginInputChange } =
    useForm<typeof loginForm>(loginForm);
  const { form: register, onInputChange: onRegisterInputChange } =
    useForm<typeof registerForm>(registerForm);

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginError.current = true;
    registerError.current = false;
    startLogin({
      email: login.loginEmail,
      password: login.loginPassword,
    });
  };

  const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginError.current = false;
    registerError.current = true;
    if (register.registerPassword !== register.registerPassword2) {
      errorCustomMesssage("Password are different");
      return;
    }
    startRegister({
      email: register.registerEmail,
      password: register.registerPassword,
      name: register.registerName,
    });
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                name="loginEmail"
                type="text"
                className="form-control"
                placeholder="Correo"
                value={login.loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                name="loginPassword"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={login.loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              {loginError.current && errorMessage && (
                <p className="error">{errorMessage}</p>
              )}
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                name="registerName"
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={register.registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                name="registerEmail"
                // type="email"
                className="form-control"
                placeholder="Correo"
                value={register.registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                name="registerPassword"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={register.registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                name="registerPassword2"
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                value={register.registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              {registerError.current && errorMessage && (
                <p className="error">{errorMessage}</p>
              )}
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

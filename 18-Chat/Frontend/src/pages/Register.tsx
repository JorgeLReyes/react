import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";
import Swal from "sweetalert2";

export const Register = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "test",
    email: "test@gmail.com",
    password: "123456",
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await register!(form);
    if (!ok)
      Swal.fire("ERROR", "Error en usuario, contraseña o nombre", "error");
  };

  const verifyForm = () =>
    form.email.length && form.password.length && form.name.length;

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!verifyForm()}
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};

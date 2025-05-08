import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";
import Swal from "sweetalert2";

export const Login = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: localStorage.getItem("email") || "jorge@gmail.com",
    password: "123456",
    rememberme: true,
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const toggleCheck = () =>
    setForm((prev) => ({ ...prev, rememberme: !prev.rememberme }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.rememberme) localStorage.setItem("email", form.email);
    else localStorage.removeItem("email");

    const ok = await login!({
      email: form.email,
      password: form.password,
    });

    if (!ok) Swal.fire("ERROR", "Verifique el usuario y contraseña", "error");
  };

  const verifyForm = () => form.email.length > 0 && form.password.length;

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

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
        <div className="col" onClick={toggleCheck}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
            readOnly
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button className="login100-form-btn" disabled={!verifyForm()}>
          Ingresar
        </button>
      </div>
    </form>
  );
};

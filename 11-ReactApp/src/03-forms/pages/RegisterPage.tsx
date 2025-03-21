import "../styles/styles.css";
import { useForm } from "../hooks/useForm";

const data = {
  name: "Jorge",
  email: "jorge@gmail.com",
  password1: "123456",
  password2: "123456",
};

const validation: Record<
  keyof typeof data,
  { exp: RegExp; message: string }
> = {
  name: {
    exp: /^[a-z]+(\s[a-z]+)*$/i,
    message: "Nombre inválido",
  },
  email: {
    exp: /^[a-z0-9]+((.|_)[a-z0-9]+){1}@[a-z]{2,}\.[a-z]{3}$/i,
    message: "Correo inválido",
  },
  password1: {
    exp: /^\w{8,}$/i,
    message: "Contraseña debe tener mínimo 8 caracteres",
  },
  password2: {
    exp: /^\w{8,}$/i,
    message: "Contraseña debe tener mínimo 8 caracteres",
  },
};

export const RegisterPage = () => {
  const { form, onChange, onSubmit, onReset, error } = useForm({
    data,
    validation,
  });

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="name"
          onChange={onChange}
        />
        {error.name && <p>Campo necesario</p>}
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="email"
          onChange={onChange}
        />
        {error.email && <p>Email valido</p>}
        <input
          type="password"
          name="password1"
          value={form.password1}
          placeholder="password1"
          onChange={onChange}
        />
        {error.password1 && <p>Contraseña no valida</p>}
        <input
          type="password"
          name="password2"
          value={form.password2}
          placeholder="password2"
          onChange={onChange}
        />
        {error.password2 ||
          (form.password1 !== form.password2 && <p>Contraseñano es igual</p>)}
        <button type="submit">Submit</button>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

import useForm from "../hooks/02-useEffect/useForm";

type Form = {
  username: string;
  email: string;
  password: string;
};

const SimpleFormWithCustomHook = () => {
  const { onInputChange, onReset, username, email, password } = useForm<Form>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <>
      <h1>Formulario Simple</h1>
      <hr />
      <input
        type="text"
        className="form-control"
        placeholder="username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <input
        type="email"
        className="form-control mt-2"
        placeholder="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input
        type="password"
        className="form-control mt-2"
        placeholder="password"
        name="password"
        value={password}
        onChange={onInputChange}
      />
      <button className="btn btn-primary" onClick={onReset}>
        Limpiar
      </button>
    </>
  );
};

export default SimpleFormWithCustomHook;

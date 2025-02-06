import { ChangeEvent, useEffect, useState } from "react";
import Message from "./Message";

const SimpleForm = () => {
  const [{ email, username }, setFormState] = useState({
    username: "strider",
    email: "jorge@gmail.com",
  });

  const onInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormState((state) => ({ ...state, [name]: value }));
  };

  useEffect(() => {}, [email]);

  useEffect(() => {}, [username]);

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
      {username === "strider2" && <Message />}
      <input
        type="email"
        className="form-control mt-2"
        placeholder="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
    </>
  );
};

export default SimpleForm;

import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const LoginPage = () => {
  const { setUser, user } = useContext(UserContext);

  return (
    <>
      <h2>LoginPage</h2>
      <p>{JSON.stringify(user)}</p>
      <button
        onClick={() => setUser?.({ name: "John Doe", id: 123, email: "jorge" })}
      >
        Login
      </button>
    </>
  );
};

export default LoginPage;

import { useContext } from "react";
import { AuthContext } from "../";
import { AuthContextConsumer } from "../types/types";

const useAuth = () => {
  const { login, logout, state } = useContext(
    AuthContext
  ) as AuthContextConsumer;

  return { login, logout, state };
};

export default useAuth;

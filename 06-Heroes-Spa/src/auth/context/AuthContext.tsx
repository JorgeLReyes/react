import { createContext, ReactNode, useEffect, useReducer } from "react";
import { authReducer } from "./AuthReducer";
import { type AuthContextConsumer, AuthTypes } from "../types/types";

const AuthContext = createContext<Partial<AuthContextConsumer>>({});

const init = () => {
  const user = localStorage.getItem("user");
  return {
    logged: !!user,
    user,
  };
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (state.user) localStorage.setItem("user", state.user);
    else localStorage.removeItem("user");
  }, [state.user]);

  const login = (name: string) => {
    dispatch({ type: AuthTypes.LOGIN, payload: name });
  };
  const logout = () => {
    dispatch({ type: AuthTypes.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

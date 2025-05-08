import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { fetchAPI } from "../../helpers/fetch";
import { ChatContext } from "../chat/chatContext";

export interface User {
  uid?: string;
  cheking: boolean;
  logged: boolean;
  name?: string;
  email?: string;
}

export interface AuthContextProps {
  user: User;
  login?: (user: { email: string; password: string }) => Promise<boolean>;
  logout?: () => Promise<boolean>;
  register?: (user: {
    email: string;
    password: string;
    name: string;
  }) => Promise<boolean>;
  verifyToken?: () => void;
}

export interface UserLogin {
  ok: boolean;
  user: {
    name: string;
    email: string;
    online: boolean;
    uid: string;
  };
}

const AuthContext = createContext({} as AuthContextProps);

const initialState: User = {
  uid: undefined,
  cheking: true,
  logged: false,
  name: undefined,
  email: undefined,
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (user: { email: string; password: string }) => {
    const resp = await fetchAPI<UserLogin>({
      endpoint: "auth/login",
      data: user,
      method: "POST",
    });

    if (resp.ok) {
      setAuth({
        uid: resp.user.uid,
        cheking: false,
        logged: true,
        name: resp.user.name,
        email: resp.user.email,
      });
      dispatch({ type: "cleanChat" });
    }
    return resp.ok;
  };

  const logout = async () => {
    const resp = await fetchAPI<UserLogin>({
      endpoint: "auth/logout",
      method: "POST",
    });

    if (resp.ok) {
      setAuth({ ...initialState, cheking: false });
    }
    return resp.ok;
  };

  const register = async (user: {
    email: string;
    password: string;
    name: string;
  }) => {
    const resp = await fetchAPI<UserLogin>({
      endpoint: "auth/register",
      data: user,
      method: "POST",
    });

    if (resp.ok) {
      setAuth({
        uid: resp.user.uid,
        cheking: false,
        logged: true,
        name: resp.user.name,
        email: resp.user.email,
      });
    }
    return resp.ok;
  };

  const verifyToken = useCallback(async () => {
    const resp = await fetchAPI<
      {
        ok: boolean;
        msg?: string;
      } & UserLogin
    >({
      method: "POST",
      endpoint: "auth/renew",
    });
    if (!resp.ok) return setAuth((data) => ({ ...data, cheking: false }));

    setAuth({
      uid: resp.user.uid,
      cheking: false,
      logged: true,
      name: resp.user.name,
      email: resp.user.email,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: auth,
        login,
        register,
        verifyToken,
        logout,
      }}
      children={children}
    />
  );
};

export { AuthContext };

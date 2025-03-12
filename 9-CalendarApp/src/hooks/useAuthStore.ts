import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  customErrorMessage,
  onLogin,
  onLogout,
  RootState,
  User,
} from "../store";
import { api } from "../api/calendarApi";
import { AxiosError } from "axios";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { status, user, errorMessage } = useSelector(
    (store: RootState) => store.auth
  );

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const data = await api.post<User & { ok: boolean }>("/auth", {
        email,
        password,
      });
      const { ok, ...user } = data.data;
      dispatch(onLogin(user));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 2000);
    }
  };

  const startRegister = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post<User & { ok: boolean }>("/auth/new", {
        email,
        password,
        name,
      });

      const { ok, ...user } = data;
      dispatch(onLogin(user));
    } catch (error) {
      const { errors, msg } = (<AxiosError>error).response!.data as {
        errors?: {
          [key: string]: { [key: string]: { msg: string } };
        };
        msg?: string;
      };

      if (msg) dispatch(onLogout(msg));
      else {
        const { email, password, name } = errors!;
        dispatch(onLogout([email?.msg, password?.msg, name?.msg].join(",")));
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 2000);
    }
  };

  const errorCustomMesssage = (msg: string) => {
    dispatch(customErrorMessage(msg));
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 2000);
  };

  const checkAuthToken = async () => {
    try {
      const { data } = await api.get("/auth/renew");
      if (data.error) throw data.error;

      const { ok, ...user } = data;
      dispatch(onLogin(user));
    } catch (error) {
      console.log(error);
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    try {
      const { data } = await api.get("/auth/logout");
      if (data.error) throw data.error;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(onLogout());
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    errorCustomMesssage,
    checkAuthToken,
    startLogout,
  };
};

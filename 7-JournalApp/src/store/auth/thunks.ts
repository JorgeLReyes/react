import {
  registerUserWithEmailPassword,
  loginWithEmailPassword,
  signInWithGoogle,
  logoutFirebase,
} from "../../firebase/providers";
import { type AppDispatch } from "../store";
import { checkingCredentials, login, logout } from "./auth";

export const checkingAuthentication = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startLoginWithEmailPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout({ message: result.errorMessage! }));
    dispatch(
      login({
        uuid: result.uid!,
        email: result.email!,
        displayName: result.displayName!,
        photoURL: result.photoURL!,
      })
    );
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout({ message: result.errorMessage! }));
    dispatch(
      login({
        uuid: result.uid!,
        email: result.email!,
        displayName: result.displayName!,
        photoURL: result.photoURL!,
      })
    );
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });

    if (!result.ok) return dispatch(logout({ message: result.errorMessage! }));

    const { uid, email: mail, photoURL } = result;

    dispatch(
      login({
        uuid: uid!,
        email: mail!,
        displayName,
        photoURL: photoURL!,
      })
    );
    console.log(result);
  };
};

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    await logoutFirebase();
    dispatch(
      logout({
        message: "Sesión finalizada",
      })
    );
  };
};

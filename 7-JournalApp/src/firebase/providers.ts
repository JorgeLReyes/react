import {
  AuthError,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { FirebaseAuth } from "./init";
import { Form } from "../auth/pages";

const provider = new GoogleAuthProvider();
// provider.addScope("https://www.googleapis.com/auth/userinfo.email");
// provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

export const signInWithGoogle = async () => {
  try {
    provider.setCustomParameters({
      prompt: "select_account",
    });
    const result = await signInWithPopup(FirebaseAuth, provider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const authError = error as AuthError;

    const errorCode = authError.code;
    const errorMessage = authError.message;
    // The email of the user's account used.
    const email = authError.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(authError);
    return {
      ok: false,
      errorCode,
      errorMessage,
      email,
      credential,
    };
  }
};

export const loginWithEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { displayName, photoURL, uid } = result.user;
    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    return {
      ok: false,
      errorMessage: (<AuthError>error).message,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: Form) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    // await updateProfile(result.user, {
    //   displayName,
    // });
    await updateProfile(FirebaseAuth.currentUser!, {
      displayName,
    });

    const { displayName: name, email: mail, photoURL, uid } = result.user;
    return { ok: true, displayName: name, email: mail, photoURL, uid };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Usuario ya existe",
    };
  }
};

export const logoutFirebase = async () => {
  try {
    const res = await signOut(FirebaseAuth);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

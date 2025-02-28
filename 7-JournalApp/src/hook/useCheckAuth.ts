import { useDispatch } from "react-redux";
import { useStore } from "./useStore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/auth";
import { FirebaseAuth } from "../firebase/init";
import { startLoadingNotes } from "../store/journal";
import { AppDispatch } from "../store/store";

export const useCheckAuth = () => {
  const { useAppSelector } = useStore();
  const dispatch = useDispatch<AppDispatch>();
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch(logout({ message: "User is not logged" }));
      const { displayName, email, photoURL, uid } = user!;
      dispatch(
        login({
          displayName,
          email,
          photoURL,
          uuid: uid,
        })
      );

      dispatch(startLoadingNotes());
    });
  }, [dispatch]);

  return {
    status,
  };
};

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/hooks/useAuth";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { pathname, search } = useLocation();
  const lastPath = pathname + search;
  localStorage.setItem("lastPath", lastPath);

  const {
    state: { logged },
  } = useAuth();

  return logged ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

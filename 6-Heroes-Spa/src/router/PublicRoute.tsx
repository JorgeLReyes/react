import { Navigate } from "react-router-dom";
import useAuth from "../auth/hooks/useAuth";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const {
    state: { logged },
  } = useAuth();

  return !logged ? children : <Navigate to="/heroes" />;
};

export default PublicRoute;

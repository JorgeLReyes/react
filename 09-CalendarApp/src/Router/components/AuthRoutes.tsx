import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";

export const AuthRoutes = () => {
  const { status } = useAuthStore();

  return (
    <>{status === "not-authenticated" ? <Outlet /> : <Navigate to="/" />}</>
  );
};

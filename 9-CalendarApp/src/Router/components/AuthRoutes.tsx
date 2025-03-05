import { Navigate, Outlet } from "react-router-dom";

export const AuthRoutes = () => {
  type Auth = "authenticated" | "not-authenticated";
  const auth: Auth = "authenticated";

  return <>{auth === "not-authenticated" ? <Outlet /> : <Navigate to="/" />}</>;
};

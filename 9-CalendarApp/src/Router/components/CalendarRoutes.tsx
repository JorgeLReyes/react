import { Navigate, Outlet } from "react-router-dom";

export const CalendarRoutes = () => {
  type Auth = "authenticated" | "not-authenticated";
  const auth: Auth = "authenticated";
  return (
    <>{auth === "authenticated" ? <Outlet /> : <Navigate to="/auth/login" />}</>
  );
};

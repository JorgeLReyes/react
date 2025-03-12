import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarRoutes = () => {
  const { status } = useAuthStore();

  return (
    <>
      {status === "authenticated" ? <Outlet /> : <Navigate to="/auth/login" />}
    </>
  );
};

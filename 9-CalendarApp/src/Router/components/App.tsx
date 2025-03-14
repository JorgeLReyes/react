import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";

export const App = () => {
  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "cheking") return <></>;

  return <Outlet />;

  // if (status === "not-authenticated") {
  //   return (
  //     <>
  //       <Navigate to="/auth/" />
  //       <Outlet />
  //     </>
  //   );
  // }
  /* <Navigate to="/" /> */
  /* <Outlet /> */
};

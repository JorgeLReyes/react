import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";
import CheckRoute from "./components/CheckRoute";

const App = () => {
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth/*",
        element: (
          <CheckRoute statusCurrent={"not-authenticated"} pathRedirect="/" />
        ),
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "*", element: <Navigate to={"/auth/login"} /> },
        ],
      },
      {
        path: "*",
        element: (
          <CheckRoute
            statusCurrent={"authenticated"}
            pathRedirect="/auth/login"
          />
        ),
        children: [
          { index: true, element: <CalendarPage /> },
          { path: "*", element: <Navigate to="/" /> },
        ],
      },
    ],
  },
]);

export const ProviderRouter = () => <RouterProvider router={router} />;

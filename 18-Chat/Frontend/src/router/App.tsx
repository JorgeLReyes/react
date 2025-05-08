import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { CheckPath } from "./CheckPath";
import { Register } from "../pages/Register";
import { Chat } from "../pages/Chat";
import { AuthLayout } from "../Layouts/auth.layout";
import { Login } from "../pages/Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth/authContext";

const AppRedirect = () => {
  const { user, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken!();
  }, [verifyToken]);

  if (user.cheking) return <></>;

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRedirect />,
    children: [
      {
        path: "auth",
        element: (
          <AuthLayout>
            <CheckPath isAuthenticated={false} redirectPath="/chat" />
          </AuthLayout>
        ),
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            index: true,
            element: <Navigate to="/auth/login" />,
          },
          {
            path: "*",
            element: <Navigate to="/auth/login" />,
          },
        ],
      },
      {
        path: "*",
        element: (
          <CheckPath isAuthenticated={true} redirectPath="/auth/login" />
        ),
        children: [
          {
            path: "chat",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Chat />,
              },
              { path: "*", element: <Navigate to="/chat" /> },
            ],
          },
          {
            index: true,
            element: <Navigate to="/chat" />,
          },
          {
            path: "*",
            element: <Navigate to="/chat" />,
          },
        ],
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;

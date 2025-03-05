import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { AuthRoutes } from "./components/AuthRoutes";
import { CalendarRoutes } from "./components/CalendarRoutes";

const router = createBrowserRouter([
  {
    path: "auth/*",
    element: <AuthRoutes />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <Navigate to={"/auth/login/"} /> },
    ],
  },
  {
    path: "*",
    element: <CalendarRoutes />,
    children: [{ path: "*", element: <CalendarPage /> }],
  },
]);

export const ProviderRouter = () => <RouterProvider router={router} />;

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import CheckRoute from "./components/CheckRoute";
import { App } from "./components/App";

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

import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { RegisterPage } from "../03-forms/pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <>
        <h1>Not found</h1>
        <Link to={"/"}>Volver</Link>
      </>
    ),
    children: [
      {
        index: true,
        element: <h1>Home</h1>,
      },
      {
        path: "about",
        element: (
          <>
            <h1>About</h1>
            <Outlet />
          </>
        ),
      },
      {
        path: "users",
        element: <h1>Users</h1>,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

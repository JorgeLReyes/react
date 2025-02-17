import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "../ui/pages/ErrorPage";
import { LoginPage } from "../auth";
// import App from "../App";
import {
  DCPage,
  HeroesRoutes,
  HeroPage,
  MarvelPage,
  SearchPage,
} from "../heroes";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {/* <h1>App</h1> */}
        {/* <App /> llamando a <Outlet /> en este caso */}
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <p>Elemento de raiz hijo </p>,
      },
      {
        path: "error",
        loader: async () => {
          throw new Error("Error contextual");
        },
        errorElement: <ErrorPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "heroes",
        element: (
          <PrivateRoute>
            <HeroesRoutes />
            {/* <Navbar /> */}
            {/* <Outlet /> */}
          </PrivateRoute>
        ),
        children: [
          {
            path: "marvel",
            element: <MarvelPage />,
          },
          {
            path: "dc",
            element: <DCPage />,
          },
          {
            path: "search",
            element: <SearchPage />,
            action: async ({ request }) => {
              const data = await request.formData();
              const entries = Object.fromEntries(data);
              return { q: entries.q };
            },
          },
          {
            path: "hero/:id",
            element: <HeroPage />,
          },
          {
            path: "",
            element: <Navigate to="/heroes/marvel" />,
          },
        ],
      },
    ],
  },
]);

export const MainRouter = () => {
  return <RouterProvider router={router} />;
};

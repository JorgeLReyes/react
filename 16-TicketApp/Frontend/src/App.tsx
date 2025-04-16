import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Ant from "./pages/Layout";
import { Cola } from "./pages/Cola";
import { Ingresar } from "./pages/Ingresar";
import { CrearTicket } from "./pages/CrearTicket";
import { Escritorio } from "./pages/Escritorio";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Ant />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "ingresar",
        element: <Ingresar />,
      },
      {
        path: "cola",
        element: <Cola />,
      },
      {
        path: "crear-tickets",
        element: <CrearTicket />,
      },
      {
        path: "escritorio",
        element: <Escritorio />,
      },
      {
        path: "*",
        element: <Navigate to="/ingresar" replace />,
      },
    ],
  },
]);

export const TicketRouterProvider = () => <RouterProvider router={router} />;

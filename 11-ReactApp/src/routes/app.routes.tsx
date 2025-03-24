import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { RegisterPage } from "../03-forms/pages/RegisterPage";
import { FormikPage } from "../03-forms/pages/FormikPage";
import { FormikYupPage } from "../03-forms/pages/FormikYupPage";
import { FormikComponents } from "../03-forms/pages/FormikComponents";
import { FormikAbstraction } from "../03-forms/pages/FormikAbstraction";
import { RegisterFormikPage } from "../03-forms/pages/RegisterFormikPage";
import { DynamicForm } from "../03-forms/pages/DynamicForm";

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
        path: "register",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <RegisterPage />,
          },
          {
            path: "formik",
            element: <RegisterFormikPage />,
          },
        ],
      },
      {
        path: "formik",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <FormikPage />,
          },
          {
            path: "yup",
            element: <FormikYupPage />,
          },
          {
            path: "components",
            element: <FormikComponents />,
          },
          {
            path: "abstraction",
            element: <FormikAbstraction />,
          },
        ],
      },
      {
        path: "dynamic",
        element: <DynamicForm />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

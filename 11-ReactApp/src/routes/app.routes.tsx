import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import ShoppingPages from "../02-component-patterns/pages/ShoppingPages";

// const Lazy = lazy(
//   () =>
//     import(/* webpackChunkName: "LP"*/ "../01-lazyload/components/LazyLayout")
// );

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
        element: <ShoppingPages />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return (
    // <Suspense fallback={<h1>Loading...</h1>}>
    <RouterProvider router={router} />
    // </Suspense>
  );
};

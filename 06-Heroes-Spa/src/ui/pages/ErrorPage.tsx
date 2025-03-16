import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as { statusText: string };

  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">¡Algo salió mal!</h4>
        <p>{error.statusText || "Hubo un problema al cargar la página."}</p>
        <hr />
        <p className="mb-0">
          Por favor, regresa al inicio y vuelve a intentarlo.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;

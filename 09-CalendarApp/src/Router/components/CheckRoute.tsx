import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Status } from "../../store";

interface Props {
  statusCurrent: Status;
  pathRedirect: string;
}

const CheckRoute = ({ statusCurrent, pathRedirect }: Props) => {
  const { status } = useAuthStore();
  return (
    <>
      {status === statusCurrent ? <Outlet /> : <Navigate to={pathRedirect} />}
    </>
  );
};

export default CheckRoute;

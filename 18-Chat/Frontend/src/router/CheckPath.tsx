import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

interface Props {
  isAuthenticated: boolean;
  redirectPath: string;
}
export const CheckPath = ({ isAuthenticated, redirectPath }: Props) => {
  const { user } = useContext(AuthContext);

  return user.logged === isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} />
  );
};

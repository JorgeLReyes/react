import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";

export const Navbar = () => {
  const navigate = useNavigate();
  const { state, logout } = useAuth();

  const onLogout = () => {
    logout();
    navigate({ pathname: "/login" }, { replace: true });
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
      <Link className="navbar-brand" to="/">
        Asociaciones
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active2" : ""}`
            }
            to="/heroes/marvel"
          >
            Marvel
          </NavLink>

          <NavLink className="nav-item nav-link" to="/heroes/dc">
            DC
          </NavLink>
          <NavLink className="nav-item nav-link" to="/heroes/search">
            Search
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-primary">{state.user}</span>
          <button className="nav-item nav-link btn" onClick={onLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};

import { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";

export const SearchBox = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <h4>{user.name}</h4>
        <span>Recientes</span>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button className="btn text-danger" onClick={logout}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

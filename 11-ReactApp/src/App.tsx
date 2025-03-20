import { NavLink, Outlet } from "react-router-dom";

import logo from "../public/vite.svg";

function App() {
  return (
    <div className="main-layout">
      <nav>
        <img src={logo} alt="React logo" />
        {/* <ul>
          {Object.entries(routes).map(([, value]) => (
            <li key={value.to}>
              <NavLink to={value.to}>{value.name}</NavLink>
            </li>
          ))}
        </ul> */}
        <ul>
          <li>
            <NavLink to="/shopping">Shopping</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

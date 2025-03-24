import { NavLink, Outlet } from "react-router-dom";

import logo from "../public/vite.svg";
function App() {
  return (
    <div className="main-layout">
      <nav>
        <img src={logo} alt="React logo" />
        <ul>
          <li>
            <NavLink to={"/register"} end>
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to={"/register/formik"}>Register formik</NavLink>
          </li>
          <li>
            <NavLink to={"/Formik/"} end>
              Formik
            </NavLink>
          </li>
          <li>
            <NavLink to={"/Formik/yup"}>Formik Yup</NavLink>
          </li>
          <li>
            <NavLink to={"/Formik/components"}>Formik Components</NavLink>
          </li>
          <li>
            <NavLink to={"/Formik/abstraction"}>Formik abstraction</NavLink>
          </li>
          <li>
            <NavLink to={"/dynamic"}>Dynamic Form</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

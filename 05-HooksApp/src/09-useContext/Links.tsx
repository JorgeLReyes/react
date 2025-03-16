import { NavLink } from "react-router-dom";

const Links = () => {
  return (
    <section className="d-flex gap-2">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
    </section>
  );
};

export default Links;

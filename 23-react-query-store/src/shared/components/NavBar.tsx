import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { NavLink } from "react-router-dom";
import { AcmeLogo } from "./AcmeLogo";
import "./NavBar.css";

const routes = [
  { to: "/", text: "Todo" },
  { to: "/men", text: "Hombres" },
  { to: "/women", text: "Mujeres" },
];

export const NavBar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map(({ to, text }) => (
          <NavbarItem key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              {text}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={NavLink} color="primary" to="/new" variant="flat">
            Nuevo producto
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

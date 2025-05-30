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
    <Navbar className="p-2 flex justify-between">
      <NavbarBrand className="text-white">
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
          <Button
            as={NavLink}
            to="/new"
            variant="flat"
            style={{
              color: "rgb(59, 130, 246)",
              backgroundColor: "rgba(30, 20, 160,0.5)",
              padding: ".5rem",
              borderRadius: ".5rem",
            }}
          >
            Nuevo producto
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

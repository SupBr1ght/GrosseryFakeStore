import FF_logo from "../../assets/FF_logo.svg";
import NavbarLink from "./NavbarLink";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const links = [
    { to: "/about", label: "About" },
    { to: "/cards", label: "Cards" },
    { to: "/profile", label: "Profile" },
    { to: "/login", label: "Log in" },
    { to: "/register", label: "Sighn in" },
  ];

  return (
    <>
      <nav className="bg-lime-700 flex  items-center px-6 py-4 justify-between">
        <div className="w-25 h-20">
          <img
            src={FF_logo}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <ul className="space-x-5 pr-10 flex items-center ">
          {links.map((link) => (
            <NavbarLink
              key={link.to}
              to={link.to}
              label={link.label}
              isActive={location.pathname === link.to}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}

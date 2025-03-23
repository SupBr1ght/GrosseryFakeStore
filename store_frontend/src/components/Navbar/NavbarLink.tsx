import { NavbarLinkProps } from "@/models/navBarLinkProps";
import { Link } from "react-router-dom";

export default function NavBarLink({to, label}: NavbarLinkProps ) {
  return (
    <li>
      <Link
        className="px-6 py-3 text-white rounded-sm hover:bg-yellow-300/20 transition"
        to={to}
      >
        {label}
      </Link>
    </li>
  );
}

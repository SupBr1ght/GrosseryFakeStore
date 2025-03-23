import { NavbarLinkProps } from "@/models/navBarLinkProps";
import { Link } from "react-router-dom";

export default function NavBarLink({ to, label, isActive }: NavbarLinkProps) {
  const baseClasses = "px-6 py-3 rounded-sm transition";
  const activeClasses = "bg-yellow-300/40  text-white font-semibold";
  const inactiveClasses = "text-white hover:bg-yellow-300/20";
  const className = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
 

  return (
    <li>
      <Link
        className={className}
        to={to}
      >
        {label} 
      </Link>
    </li>
  );
}

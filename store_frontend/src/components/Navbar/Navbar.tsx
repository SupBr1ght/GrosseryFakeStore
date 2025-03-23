import { Link } from "react-router-dom";
import FF_logo from "../../assets/FF_logo.svg";
export default function Navbar() {
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
        <ul className="space-x-40 pr-10 flex items-center ">
          <li>
            <Link
              className="px-6 py-3 text-white rounded-sm hover:bg-yellow-300/20 transition"
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="px-6 py-3  text-white rounded-sm hover:bg-yellow-300/20 transition "
              to="/product"
            >
              Product_Info
            </Link>
          </li>
          <li>
            <Link
              className=" px-6 py-3 text-white rounded-sm  transition hover:bg-yellow-300/20 hower: transition "
              to="/cards"
            >
              Cards
            </Link>
          </li>
          <li>
            <Link
              className=" px-6 py-3 block text-white  rounded-sm hover:bg-yellow-300/20 transition "
              to="/profile"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

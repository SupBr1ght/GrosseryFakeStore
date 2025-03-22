import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="bg-green-300 border-gray-200" >
        <ul className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/about">About</Link>
          <Link to="/products">
            Products
          </Link>
          <Link to="/product">
            Product_Info
          </Link>
          <Link to="/cards">
            Cards
          </Link>
          <Link to="/profile">
            Profile
          </Link>
        </ul>
      </nav>
    </>
  );
}

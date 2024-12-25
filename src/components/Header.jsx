import logo from "../assets/images/logo.png";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4  shadow-md rounded-lg m-3">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img
              className="w-12 hover:scale-105 transition-transform duration-200"
              src={logo}
              alt="logo"
            />
            <h1 className="font-sans text-2xl font-semibold text-blue-400">
              World News
            </h1>
          </div>
        </Link>
        <Menu color="#4B5563" size={30} />
      </header>
    </>
  );
}
export default Header;

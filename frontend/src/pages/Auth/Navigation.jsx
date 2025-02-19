import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AiOutlineShopping,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiFillShopping,
} from "react-icons/ai";

import { FaHeart } from "react-icons/fa";
import "./Navigation.css";

const Navigation = () => {
  //hooks for the dropdown and the sidebar
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  //function to toggle the dropdown and the sidebar
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center ">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2  "
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center">
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2  "
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center ">
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2  "
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center ">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2  "
        >
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
        </Link>
      </div>

      <ul>
        <li>
          <Link
            to="/login"
            className="flex items-center transition-transform transform hover:translate-x-2  "
          >
            <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Login</span>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="flex items-center transition-transform transform hover:translate-x-2  "
          >
            <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Register</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

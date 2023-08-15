"use client";
import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { IUserSession } from "../interfaces/IUser";
import Link from "next/link";
import { toast } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const Navbar = () => {
  const { data } = useSession();
  const user = data?.user as IUserSession;

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const logout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully!");
    } catch (e) {
      toast.error("Something went wrong while logging you out!");
    }
  };

  return (
    <nav className="fixed w-full h-18 border-2 z-50 bg-white">
      <div className="flex items-center justify-between m-4 px-4">
        <div>
          <Link href={"/"}>
            <h1 className={`${poppins.className} text-4xl`}>MetaMarket</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Search"
            />
            <button className="absolute top-0 right-0 p-1">
              {/* Search icon */}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={toggleProfileDropdown}
              >
                {/* User profile icon */}
                <FaUserAlt size={25} />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul className="py-1">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      Profile
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <Link href={'/orders'}>
                      Orders
                    </Link>
                    </li>
                    
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      <Link href={"/rewards"}>Rewards</Link>
                    </li>
                    <li
                      onClick={logout}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-2">
              <button className="px-4 py-2 bg-white text-blue-500 rounded-lg">
                <Link href={"/login"}>Log In</Link>
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                <Link href={"/register"}>Sign Up</Link>
              </button>
            </div>
          )}
        </div>

        <div>
          <Link href={"/products"}>Products</Link>
        </div>
        <div>
          <Link href={'/cart'}>

          <FiShoppingCart size={25} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

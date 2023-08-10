"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <section>

    <nav className="bg-blue-500 fixed w-full h-8">
      <div className="flex items-center justify-between px-4">
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
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={toggleProfileDropdown}
              >
                {/* User profile icon */}
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul className="py-1">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      Profile
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      Settings
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-2">
              <button className="px-4 py-2 bg-white text-blue-500 rounded-lg">
                Log In
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
          </section>
  );
};

export default Navbar;

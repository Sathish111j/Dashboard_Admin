import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Link to={"/students/all"} className="text-white hover:text-gray-300 transition-colors">
          View Students
        </Link>
      </li>
      <li>
        <Link to={"/mentors/all"} className="text-white hover:text-gray-300 transition-colors">
          View Mentor
        </Link>
      </li>
      <li>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">
          Login/Signup
        </a>
      </li>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="bg-black text-white py-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          <Link to={"/"} className="text-white">
            Dashboard App - Mentor View
          </Link>
        </h2>
        <div className="lg:hidden">
          <button
            className="menu-icon"
            onClick={() => setOpenNav(!openNav)}
            aria-label="Toggle Navigation"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {openNav ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 7H4v-2h16v2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 7h16v2H4v-2zm0 7h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex">
          <NavList />
        </div>
      </div>
      {openNav && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setOpenNav(false)}
        ></div>
      )}
      {openNav && (
        <div className="lg:hidden absolute top-0 left-0 w-full bg-black z-50">
          <div className="container mx-auto py-4">
            <NavList />
          </div>
        </div>
      )}
    </div>
  );
}

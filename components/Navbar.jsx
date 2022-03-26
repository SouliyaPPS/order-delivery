import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import DarkMode from "../sections/DarkMode";
function NavLink({ to, children }) {
  return (
    <a
      href={to}
      className={`mr-2 flex md:hidden bg-white pt-2 pb-3 space-y-1 sm:px-3 cursor-pointer hover:bg-amber-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
    >
      {children}
    </a>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className=" fixed w-full z-10 ">
        <div className="w-full flex items-center px-4 py-4 h-14">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center ml-0 justify-between w-full">
              <div className="flex justify-center  items-center flex-shrink-0 ">
                <h1 className=" font-bold text-xl cursor-pointer">
                  <div className="flex items-center w-13/12"></div>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    activeClass="home"
                    to="/Home"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-amber-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    activeClass="about"
                    to="/About"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-amber-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </NavLink>

                  <NavLink
                    activeClass="contact"
                    to="/Contact"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-amber-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </NavLink>

                  <NavLink
                    activeClass="work"
                    to="work"
                    smooth={true}
                    offset={50}
                    duration={500}
                  ></NavLink>
                </div>
              </div>
            </div>
            <div className="mr-0 flex md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-amber-500 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-500 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
              >
                <NavLink
                  href="/Home"
                  activeClass="home"
                  to="/Home"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-amber-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </NavLink>
                <NavLink
                  href="/About"
                  activeClass="about"
                  to="/About"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-amber-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  About
                </NavLink>

                <NavLink
                  href="/Contact"
                  activeClass="contact"
                  to="/Contact"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-amber-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Contact
                  <button className="px-1 w-1/1 sm:w-1/1">
                    <img
                      className="w-auto h-4"
                      src="https://i.ibb.co/j3L3M1z/icons8-location.gif"
                      alt=""
                    />
                  </button>
                </NavLink>

                <DarkMode />
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;

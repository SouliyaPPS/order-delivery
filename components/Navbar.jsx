import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import DarkMode from "../sections/DarkMode";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Home", href: "/Home" },
  { name: "Login", href: "/login" },
  { name: "About", href: "/About" },
  { name: "Contact", href: "/Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="fixed w-full z-10 ">
        <div className="w-full flex items-center px-4 py-4 h-14">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center ml-0 justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <h1 className=" font-bold text-xl cursor-pointer">
                  <div className="flex items-center w-13/12"></div>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="mr-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      href={item.href}
                      key={item.name}
                      smooth={true}
                      offset={50}
                      duration={500}
                      className="cursor-pointer hover:bg-amber-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      <a
                        className={classNames(
                          "mr-2 flex md:hidden bg-white pt-2 pb-3 space-y-1 sm:px-3 cursor-pointer hover:bg-amber-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium",
                          router.route === item.href
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                        aria-current={
                          router.route === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="mr-64 flex md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="mr-64 bg-amber-500 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-500 focus:ring-white"
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
                className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl text-black hover:text-white"
              >
                {navigation.map((item) => (
                  <Link
                    href={item.href}
                    key={item.name}
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-amber-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium shadow-xl"
                  >
                    <a
                      className={classNames(
                        "mr-2 flex md:hidden bg-white pt-2 pb-3 space-y-1 sm:px-3 cursor-pointer hover:bg-amber-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg",
                        router.route === item.href
                          ? "border-gray-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      )}
                      aria-current={
                        router.route === item.href ? "page" : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}

                <DarkMode />
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

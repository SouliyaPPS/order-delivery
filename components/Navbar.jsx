// import { useState } from "react";

// function NavLink({ to, children }) {
//   return (
//     <a href={to} className={`mx-4`}>
//       {children}
//     </a>
//   );
// }

// function MobileNav({ open, setOpen }) {
//   return (
//     <div
//       className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
//         open ? "-translate-x-0" : "-translate-x-full"
//       } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
//     >
//       <div className="flex items-center justify-center h-18 bg-amber-500 filter drop-shadow-md">
//         {" "}
//         {/*logo container*/}
//         <div>
//           <button>
//             <img
//               className="w-auto h-12"
//               src="https://i.ibb.co/QMMM7T1/unnamed.png"
//               alt=""
//             />
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-col ml-4">
//         <a
//           className="my-4 text-xl font-medium"
//           href="/about"
//           onClick={() =>
//             setTimeout(() => {
//               setOpen(!open);
//             }, 100)
//           }
//         >
//           About
//         </a>
//         <a
//           className="my-4 text-xl font-normal"
//           href="/contact"
//           onClick={() =>
//             setTimeout(() => {
//               setOpen(!open);
//             }, 100)
//           }
//         >
//           Contact
//         </a>
//         <div className="flex flex-col">
//           <a
//             className="my-4 text-xl font-normal"
//             href="https://goo.gl/maps/7pr2KsuYbiAHPGNk8"
//             onClick={() =>
//               setTimeout(() => {
//                 setOpen(!open);
//               }, 100)
//             }
//           >
//             Locations
// <button className="px-1 w-1/1 sm:w-1/1">
//   <img
//     className="w-auto h-5"
//     src="https://i.ibb.co/j3L3M1z/icons8-location.gif"
//     alt=""
//   />
// </button>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   return (
//     <nav className="flex items-center px-4 py-4 h-14 bg-amber-500 filter drop-shadow-md">
//       <MobileNav open={open} setOpen={setOpen} />
// <div className="flex items-center w-3/12">
//   <div>
//     <button>
//       <img
//         className="w-auto h-12"
//         src="https://i.ibb.co/QMMM7T1/unnamed.png"
//         alt=""
//       />
//     </button>
//   </div>
// </div>
//       <div className="flex items-center justify-end w-9/12">
//         <div
//           className="relative z-50 flex flex-col items-center justify-between w-8 h-8 md:hidden"
//           onClick={() => {
//             setOpen(!open);
//           }}
//         >
//           {/* hamburger button */}
//           <span
//             className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
//               open ? "rotate-45 translate-y-3.5" : ""
//             }`}
//           />
//           <span
//             className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
//               open ? "w-0" : "w-full"
//             }`}
//           />
//           <span
//             className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
//               open ? "-rotate-45 -translate-y-3.5" : ""
//             }`}
//           />
//         </div>

//         <div className="hidden md:flex">
//           <NavLink to="/contact">CONTACT</NavLink>
//           <NavLink to="/about">ABOUT</NavLink>
//           <NavLink to="https://goo.gl/maps/7pr2KsuYbiAHPGNk8">
//             LOCATION 🗺️📌
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useState } from "react";
import { Transition } from "@headlessui/react";
// import { Link } from "react-scroll";
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
                  <div className="flex items-center w-13/12">
                    {/* <div>
                      <button>
                        <img
                          className="w-auto h-12"
                          src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/sIL81wOFbRA8cH4Q2JDw.png"
                          alt=""
                        />
                      </button>
                    </div> */}
                  </div>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    activeClass="home"
                    to="/ShopNow"
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
                    {/* <button className="px-1 w-1/1 sm:w-1/1">
                      <img
                        className="w-auto h-4"
                        src="https://i.ibb.co/j3L3M1z/icons8-location.gif"
                        alt=""
                      />
                    </button> */}
                  </NavLink>

                  <NavLink
                    activeClass="work"
                    to="work"
                    smooth={true}
                    offset={50}
                    duration={500}
                    // className="w-1/1 sm:w-1/1 cursor-pointer hover:bg-amber-500 text-black hover:text-white px-4 py-2 rounded-md text-sm font-medium"
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
                  href="/ShopNow"
                  activeClass="home"
                  to="/ShopNow"
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
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;

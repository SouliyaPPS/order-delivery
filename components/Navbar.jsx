import Link from "next/link";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import DarkMode from "../sections/DarkMode";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import NextLink from "next/link";
import classes from "../utility/classes";
import { useContext, useState } from "react";
import { Store } from "../utility/Store";
import jsCookie from "js-cookie";
import SearchBox from "./SearchBox";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "🏠 Home", href: "/Home" },
  { name: "📲 Contact", href: "/Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
    jsCookie.remove("cartItems");
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    router.push("/Home");
  };

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
            <div className="mr-64 flex md:hidden">
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
                {/* <NextLink href="/login" passHref>
                  <Link> */}
                <Box>
                  <div className="bg-amber-500 px-2 pt-2 pb-2 space-y-1 sm:px-3 shadow-xl text-white hover:text-white mr-2 rounded-lg hover:bg-amber-500">
                    {userInfo ? (
                      <>
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          sx={classes.navbarButton}
                          onClick={loginClickHandler}
                        >
                          🙍‍♀️ {userInfo.name}
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={loginMenuCloseHandler}
                        >
                          <MenuItem
                            onClick={(e) =>
                              loginMenuCloseHandler(e, "/profile")
                            }
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            onClick={(e) =>
                              loginMenuCloseHandler(e, "/order-history")
                            }
                          >
                            Order History
                          </MenuItem>
                          <MenuItem onClick={logoutClickHandler}>
                            Logout
                          </MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <NextLink href="/login" passHref>
                        <Link href="/login">
                          <a>
                            <ThemeProvider theme={theme}>
                              <Typography variant="h6">
                                🙍‍♀️ Please Login 👈
                              </Typography>
                            </ThemeProvider>
                          </a>
                        </Link>
                      </NextLink>
                    )}
                  </div>
                </Box>
                {/* </Link>
                </NextLink> */}
                <Box>
                  <div className="px-2 pt-2 pb-2 space-y-1 sm:px-3 shadow-xl text-white hover:text-white mr-2 rounded-lg hover:bg-amber-500">
                    <SearchBox title="search" />
                  </div>
                </Box>
                <DarkMode />
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

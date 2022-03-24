import React from "react";
import Navbar from "./Navbar";
import Main from "./Main";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Main />
    </>
  );
};

export default Layout;

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Slider from "./Slider";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Slider />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

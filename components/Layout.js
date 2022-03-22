import React from "react";
import Footer from "./Footer";
import Slider from "./Slider";

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <Slider />
      <Footer />
    </>
  );
};

export default Layout;

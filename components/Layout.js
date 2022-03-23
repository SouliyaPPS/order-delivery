import React from "react";
import Footer from "./Footer";
import Slider from "./Slider";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <div className="flex justify-center items-center flex-col pt-41 text-center font-bold lg:text-8xl text-6xl space-y-2">
        <div className="text-gray-900 pb-10">
          <Slider />
        </div>
        <div className="flex justify-center items-center cursor-pointer hover:shadow-lg  text-3xl font-semibold text-white bg-amber-500 rounded-lg w-60 h-16">
          <h1 className="text-center">Shop Now 🚀</h1>
        </div>
      </div>
    </>
  );
};

export default Layout;

import React from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import TabsRender from "./Tabs";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Main />
      <TabsRender />
    </>
  );
};

export default Layout;

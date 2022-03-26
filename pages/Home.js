import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
function Home() {
  return (
    <>
      <div>
        <Navbar />
        Home
        <Tabs />
      </div>

      <Footer />
    </>
  );
}

export default Home;

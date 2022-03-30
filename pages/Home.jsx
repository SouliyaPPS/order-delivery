import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import ListProducts from "./ListProducts";

function Home() {
  return (
    <>
      <div>
        <Navbar />

        <img
          src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/9SZOQbw4jKQqcOkFc9k8.png"
          alt="Landscape picture"
          width={500}
          height={500}
          className="mx-auto"
        />
        <img
          src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/XOv6nw7rmZBgT8fMWlY9.png"
          alt="Landscape picture"
          width={500}
          height={500}
          className="mx-auto"
        />
        <ListProducts />
        <Tabs />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
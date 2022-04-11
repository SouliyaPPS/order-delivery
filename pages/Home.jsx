import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import ListProducts from "./ListProducts";
import CartProductstyles from "../styles/CartProducts.module.css";

function Home() {
  return (
    <>
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

      <div>
        <h6 className="my-px px-1 sm:px-1 pb-10 "></h6>
      </div>

      <img
        src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/yORMdn1kaR3zrZkqrH1I.png"
        alt="Landscape picture"
        width={500}
        height={500}
        className="mx-auto"
      />

      <div className={CartProductstyles.HomeWidth}>
        <div>
          <h1 className="text-lg my-px px-4 text-transparent bg-clip-text bg-gradient-to-br text-black to-pink-600 font-bold ">
            <h4 align="center">One support, One reduce</h4>
          </h1>
        </div>
        <div>
          <h6 className="my-px px-4 text-transparent bg-clip-text bg-gradient-to-br text-black text-justify mx-auto ">
            Let is reduce the fabric scrap from the craft production in Laos by
            supporting the Re-craft products made from fabric scrap and everyone
            also can promote reuse and recycling to society by sharing your
            picture with Re-Craft products on social media.
          </h6>
        </div>
        <br></br>
        <div>
          <h1 className="text-lg my-px px-4 text-transparent bg-clip-text bg-gradient-to-br text-black to-pink-600 font-bold justify-center">
            <h4 align="center">STAY CONNECTED</h4>
          </h1>
        </div>
        <div>
          <h6 className="my-px px-4 text-transparent bg-clip-text bg-gradient-to-br text-black text-justify mx-auto">
            <h4 align="center">Join our community</h4>
          </h6>
        </div>

        <div>
          <h6 className="my-px px-1 sm:px-1 pb-1"></h6>
        </div>

        <div className="pr-4 flex justify-center">
          <div className="rounded-md">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/6hs76UNVSk5usaPNztss.png"
                alt="Facebook"
                width={70}
                height={70}
                className="mx-auto "
              />
              <h1 className="my-px px-2 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 font-medium">
                <h4 align="center">Facebook </h4>
              </h1>
            </a>
          </div>

          <div className="rounded-md">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/SiVGiQntQs6w9IfKJOrU.png"
                alt="Instagram"
                width={70}
                height={70}
                className="mx-auto"
              />
              <h1 className="my-px px-2 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 font-medium">
                <h4 align="center">Instagram</h4>
              </h1>
            </a>
          </div>

          <div className="rounded-md">
            <a
              href="https://wa.me/+8562023564154"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/2PQrdSjHEah2N7wM4oGQ.png"
                alt="Whatsapp"
                width={70}
                height={70}
                className="mx-auto"
              />
              <h1 className="my-px px-2 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 font-medium">
                <h4 align="center">Whatsapp</h4>
              </h1>
            </a>
          </div>

          <div className="rounded-md">
            <a
              href="https://re-craft.whats.bz/"
              target="_blank"
              rel="noopener noreferrer"
              D
            >
              <img
                src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/WcGegSln4UM6HcPkKnfN.png"
                alt="Website"
                width={70}
                height={70}
                className="mx-auto"
              />
              <h1 className="my-px px-2 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 font-medium">
                <h4 align="center">Website</h4>
              </h1>
            </a>
          </div>
        </div>

        <div>
          <h6 className="my-px px-1 sm:px-1 pb-24"></h6>
        </div>
      </div>
      <Tabs />
    </>
  );
}

export default Home;

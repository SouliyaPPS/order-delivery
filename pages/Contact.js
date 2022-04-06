import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import styles from "../styles/hr.module.css";

function Contact() {
  return (
    <div>
      <div>
        <div className="mt-auto">
          <Navbar />
        </div>

        <body>
          <div>
            <h6 className="my-px px-1 sm:px-1 pb-14 "></h6>
          </div>

          <div className="flex grid-cols-4 mx-auto flex-wrap justify-center">
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

          <hr className={styles.hr} />

          <div>
            <h1 className="my-px px-4 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-600">
              <h4 align="center">
                Contact us to supply the fabric scrap and get more information
                about our products
              </h4>
            </h1>
          </div>

          <img
            className="items-center mx-auto shadow-orange-400"
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/sIL81wOFbRA8cH4Q2JDw.png"
            alt="Landscape picture"
            width={200}
            height={200}
          />

          <h4 align="center" className="font-bold ">
            Tel: +8562023564154 <br></br>
            Email: Recraft.laos@gmail.com <br></br>
            <a href="https://re-craft.vercel.app/">
              Website: https://re-craft.vercel.app/
            </a>
            <br></br>
          </h4>

          <br></br>

          <div className="mapouter items-center mx-auto">
            <div className="gmap_canvas items-center mx-auto">
              <iframe
                className="items-center mx-auto"
                width="100%"
                height={400}
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=recraft%20laos&t=k&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder={0}
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
              />
              <a href="https://123movies-to.org" />
              <br />
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    ".mapouter{position:relative;text-align:right;height:400px;width:400px;}",
                }}
              />
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    ".gmap_canvas {overflow:hidden;background:none!important;height:400px;width:400px;}",
                }}
              />
            </div>
          </div>

          <div>
            <h1 className="my-px px-4 sm:px-6 pb-20 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-600">
              <h4 align="center"></h4>
            </h1>
          </div>
        </body>
        <Tabs />
      </div>
    </div>
  );
}

export default Contact;

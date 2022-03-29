import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";

function Contact() {
  return (
    <div>
      <div>
        <div className="mt-auto">
          <Navbar />
        </div>

        <body>
          <div>
            <h1 className="my-px px-4 sm:px-6 pb-20 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-600">
              <h4 align="center"></h4>
            </h1>
          </div>

          <div>
            <h1 className="my-px px-4 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-600">
              <h4 align="center">
                Contact us to supply the fabric scrap and get more information
                about our products
              </h4>
            </h1>
          </div>

          <img
            className="items-center mx-auto"
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/sIL81wOFbRA8cH4Q2JDw.png"
            alt="Landscape picture"
            width={200}
            height={200}
          />

          <h4 align="center">
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
        </body>
        <Tabs />
      </div>
    </div>
  );
}

export default Contact;

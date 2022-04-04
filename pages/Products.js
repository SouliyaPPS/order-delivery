import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import CountCartStyles from "../styles/CountCart.module.css";
import styles from "../styles/ListProducts.module.css";
import ListProducts from "./ListProducts";

function Products() {
  return (
    <>
      <Navbar />

      <div className="fixed top-0 left-0 inset-x-5 z-40">
        <div className={CountCartStyles.col}>
          <div className={CountCartStyles.cart}>
            <img
              src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-cart-supermarket-flatart-icons-flat-flatarticons.png"
              width={25}
              height={25}
              alt="CountCart"
              className="items-left mx-auto"
            />
            <div className={CountCartStyles.counter}>0</div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <h3 className={styles.title}>
          <img
            className="items-center mx-auto"
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/sIL81wOFbRA8cH4Q2JDw.png"
            alt="Landscape picture"
            width={55}
            height={55}
          />
        </h3>
      </div>
      <div className={styles.cardList}>
        <ListProducts />
      </div>

      <div className="fixed top-0 left-0 right-77 inset-x-0">
        <Tabs />
      </div>

      <Footer />
    </>
  );
}

export default Products;

import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import styles from "../styles/CountCart.module.css";

function Products() {
  return (
    <>
      <div>
        <Navbar />
        <div className={styles.col}>
          <div className={styles.cart}>
            <img
              src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-cart-supermarket-flatart-icons-flat-flatarticons.png"
              width={25}
              height={25}
              alt="CountCart"
            />
            <div className={styles.counter}>0</div>
          </div>
        </div>
        <Tabs />
      </div>

      <Footer />
    </>
  );
}

export default Products;

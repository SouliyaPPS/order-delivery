import React from "react";
import styles from "../styles/ListProducts.module.css";
import CartProducts from "../components/CartProducts";

function ListProducts() {
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>List</h3>
      </div>
      <div className="lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 relative max-w-2xl mx-auto flex-nowrap grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 justify-between w-full h-full object-center object-cover lg:w-full lg:h-full ">
        <CartProducts />
      </div>
    </>
  );
}

export default ListProducts;

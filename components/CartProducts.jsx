import React from "react";
import styles from "../styles/CartProducts.module.css";

function CartProducts() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className="lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              src="https://scontent.fvte2-3.fna.fbcdn.net/v/t39.30808-6/273819604_146637151098584_7347096258093790808_n.jpg?stp=dst-jpg_p600x600&_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeFC47J3q5GcG9Zdw6u798WMxC_I_jgrS6rEL8j-OCtLqu0-dA6fUnKSJ0WL08Mov_tFlM4ADlCkcxnDi7O3OkVL&_nc_ohc=rLu4XUGGSRkAX-SxKC7&_nc_ht=scontent.fvte2-3.fna&oh=00_AT939Sd_BnIZ1Wm9oxiB5rrxuLgecVnUgqnFUkjBVGMGrA&oe=62487811"
              alt="img"
              className="w-full h-full object-center object-cover group-hover:opacity-75"
              width={300}
              height={210}
            />
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.cardFooterTop}>
            <h1 className={styles.cardTitle}>Re-Craft 01</h1>
            <span className={styles.cardPrice}>Kip</span>
          </div>
          <div className={styles.cardFooterMiddle}>
            <p className={styles.CardDesc}></p>
          </div>
          <div className={styles.cardFooterBottom}>
            <button className={styles.cardBtn}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProducts;

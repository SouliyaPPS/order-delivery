import React from "react";
import styles from "../styles/Tabs.module.css";
function Tabs() {
  return (
    <div className={styles.rowBottom}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <a href="/ShopNow" className={styles.link}>
            <img
              src="https://img.icons8.com/cute-clipart/64/000000/apple-home.png"
              width="30"
              height="30"
              alt="Home"
            />
            Home
          </a>
        </li>
        <li className={styles.listItem}>
          <a href="/Products" className={styles.link}>
            <img
              src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-products-sustainable-living-flaticons-flat-flat-icons.png"
              width="30"
              height="30"
              alt="Products"
            />
            Products
          </a>
        </li>
        <li className={styles.listItem}>
          <a href="" className={styles.link}>
            <img
              src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-cart-100-most-used-icons-flaticons-flat-flat-icons.png"
              width="30"
              height="30"
              alt="Cart"
            />
            Cart
          </a>
        </li>
        <li className={styles.listItem}>
          <a href="" className={styles.link}>
            <img
              src="https://img.icons8.com/plasticine/100/000000/chat--v2.png"
              width="30"
              height="30"
              alt="Chat"
            />
            Chat
          </a>
        </li>
        <li className={styles.listItem}>
          <a href="" className={styles.link}>
            <img
              src="https://img.icons8.com/clouds/100/000000/contact-card.png"
              width="30"
              height="30"
              alt="Contact"
            />
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Tabs;

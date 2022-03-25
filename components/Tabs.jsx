import React from "react";
import styles from "../styles/Tabs.module.css";

function NavLink({ to, children }) {
  return (
    <a href={to} className={styles.link}>
      {children}
    </a>
  );
}

function Tabs() {
  return (
    <div className={styles.rowBottom}>
      <ul className={styles.list}>
        <li activeclassName={styles.listItem}>
          <NavLink to="/Home">
            <img
              src="https://img.icons8.com/cute-clipart/64/000000/apple-home.png"
              width="30"
              height="30"
              alt="Home"
            />
            Home
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink to="/Products">
            <img
              src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-products-sustainable-living-flaticons-flat-flat-icons.png"
              width="30"
              height="30"
              alt="Products"
            />
            Products
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink to="/">
            <img
              src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-cart-100-most-used-icons-flaticons-flat-flat-icons.png"
              width="30"
              height="30"
              alt="Cart"
            />
            Cart
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink to="/">
            <img
              src="https://img.icons8.com/plasticine/100/000000/chat--v2.png"
              width="30"
              height="30"
              alt="Chat"
            />
            Chat
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink to="/">
            <img
              src="https://img.icons8.com/clouds/100/000000/contact-card.png"
              width="30"
              height="30"
              alt="Contact"
            />
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Tabs;

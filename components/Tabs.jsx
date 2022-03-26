import React from "react";
import styles from "../styles/Tabs.module.css";
import { ReactRouterLink } from "react-router-dom";
import Link from "next/link";

function Tabs() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  return (
    <div
      className={styles.rowBottom}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      component={ReactRouterLink}
    >
      <ul className={styles.list}>
        <li className={styles.listItem} component={ReactRouterLink}>
          <Link
            href="/Home"
            component={ReactRouterLink}
            className={styles.link}
          >
            <a className={styles.link} component={ReactRouterLink}>
              <img
                src="https://img.icons8.com/cute-clipart/64/000000/apple-home.png"
                width="30"
                height="30"
                alt="Home"
              />
              Home
            </a>
          </Link>
        </li>
        <li className={styles.listItem} component={ReactRouterLink}>
          <Link
            href="/Products"
            component={ReactRouterLink}
            className={styles.link}
          >
            <a className={styles.link}>
              <img
                src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-products-sustainable-living-flaticons-flat-flat-icons.png"
                width="30"
                height="30"
                alt="Products"
              />
              Products
            </a>
          </Link>
        </li>
        <li className={styles.listItem} component={ReactRouterLink}>
          <Link
            href="/Cart"
            component={ReactRouterLink}
            className={styles.link}
          >
            <a className={styles.link}>
              <img
                src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-cart-100-most-used-icons-flaticons-flat-flat-icons.png"
                width="30"
                height="30"
                alt="Cart"
              />
              Cart
            </a>
          </Link>
        </li>
        <li className={styles.listItem} component={ReactRouterLink}>
          <Link
            href="/Chat"
            component={ReactRouterLink}
            className={styles.link}
          >
            <a className={styles.link} component={ReactRouterLink}>
              <img
                src="https://img.icons8.com/plasticine/100/000000/chat--v2.png"
                width="30"
                height="30"
                alt="Chat"
              />
              Chat
            </a>
          </Link>
        </li>
        <li className={styles.listItem} component={ReactRouterLink}>
          <Link
            href="/Contact"
            component={ReactRouterLink}
            className={styles.link}
          >
            <a className={styles.link} component={ReactRouterLink}>
              <img
                src="https://img.icons8.com/clouds/100/000000/contact-card.png"
                width="30"
                height="30"
                alt="Contact"
              />
              Contact
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Tabs;

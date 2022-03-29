// import Link from "next/link";
import styles from "../styles/Footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <footer className="px-1 sm:px-1 pb-20">
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h1 className={styles.footerTitle}>Contact Us</h1>
            <p className={styles.footerContact}>
              Laos, Vientiane <br /> +8562023564154 <br />{" "}
              recraft.laos@gmail.com
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <p className={styles.copyRights}>
            &copy; 2022, All Rights Reserved. Powered by Re-Craft.
          </p>
        </div>
      </div>
    </footer>
    // <footer className="px-4 sm:px-6 py-6 mt-24">
    //   <div className="text-center text-sm text-gray-500">
    //     <span className="dark:text-gray-100 text-amber-500 font-bold text-lg mr-2">
    //       Re-Craft
    //     </span>
    //     &copy; {new Date().getFullYear()} All Rights Reserved
    //   </div>
    // </footer>
  );
};

export default Footer;

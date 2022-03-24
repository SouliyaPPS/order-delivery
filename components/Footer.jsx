import Link from 'next/link';
import React from 'react';
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
              <h1 className={styles.footerTitle}>The Menu</h1>
              <p className={styles.footerText}>Our mission? Busting mad hunger pangs. Checkout the juicy array of the best burgers, ribs, salads and more, right here.</p>
              <ul className={styles.footerMenu}>
                <li className={styles.footerMenuItem}>
                  <Link href="/shop" className={styles.footerMenuLink}> - Shop </Link>
                </li>
              </ul>
          </div>
          <div className={styles.col}>
              <h1 className={styles.footerTitle}>Let’s Eat</h1>
              <p className={styles.footerText}>We’ve got a couple of ways you can savour the flavour at Ribs & Burgers. Choose your weapon against hunger!</p>
              <ul className={styles.footerMenu}>
                <li className={styles.footerMenuItem}>
                  <Link href="/" className={styles.footerMenuLink}> - Order Pick-Up </Link>
                  <Link href="/" className={styles.footerMenuLink}> - Order Delivery </Link>
                  <Link href="/" className={styles.footerMenuLink}> - Find A Store (Eat-In) </Link>
                </li>
              </ul>
          </div>
          <div className={styles.col}>
            <h1 className={styles.footerTitle}>Contact Us</h1>
            <p className={styles.footerContact}>Serbia, 34000 Kragujevac, Street BB <br /> +381/0000000 <br /> ricpewebcode@gmail.com</p>
          </div>
        </div>
        <div className={styles.row}>
            <p className={styles.copyRights}>&copy; 2022, All Rights Reserved. Powered by Miljan Peric.</p>
        </div>
    </div>
  );
};

export default Footer;

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout />

      <Head>
        <title>Re-Craft App</title>
        <meta name="description" content="Re-Craft App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

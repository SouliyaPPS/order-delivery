import * as React from "react";
import styles from "../styles/ListProducts.module.css";
import CartProducts from "../components/CartProducts";
import { useEffect, useState } from "react";
import client from "../utility/client";
import { Alert, CircularProgress, Grid, Card } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
// import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  marginAutoItem: {
    margin: "auto",
  },
}));

function ListProducts() {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });
  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

  const classes = useStyles();

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>List</h3>
      </div>
      <div className={styles.cardList}>
        <div className="scroll-m-8 md:scroll-m-0 md:max-h-screen sm:gap-6 lg:gap-8 place-self-stretch place-items-stretch hover:place-items-center grid-cols-2 gap-4 place-content-evenly flex self-auto hover:self-end hover:items-center py-1 relative max-w-4xl mx-auto ml-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-2 justify-center w-full h-full">
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Grid container spacing={2} justify="center">
              {products.map((product) => (
                <Grid item md={3} key={product.slug}>
                  <CartProducts
                    product={product}
                    // addToCartHandler={addToCartHandler}
                  ></CartProducts>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </>
  );
}

export default ListProducts;

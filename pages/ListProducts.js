import React from "react";
import styles from "../styles/ListProducts.module.css";
import CartProducts from "../components/CartProducts";
import { useEffect, useState } from "react";
import client from "../utility/client";
import { Alert, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

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

      <div className={styles.container}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Grid container spacing={2}>
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
    </>
  );
}

export default ListProducts;

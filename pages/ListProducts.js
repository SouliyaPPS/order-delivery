import React from "react";
import styles from "../styles/ListProducts.module.css";
import CartProducts from "../components/CartProducts";
import { useEffect, useState } from "react";
import client from "../utility/client";
import { Alert, CircularProgress, Grid } from "@mui/material";

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
  return (
    <>
      <div>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.slug}>
                <div>{product.name}</div>
                {/* <CartProducts
                  product={product}
                  addToCartHandler={addToCartHandler}
                ></CartProducts> */}
              </Grid>
            ))}
          </Grid>
        )}
      </div>

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

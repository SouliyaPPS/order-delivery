import * as React from "react";
import styles from "../styles/ListProducts.module.css";
import CartProducts from "../components/CartProducts";
import { useContext, useEffect, useState } from "react";
import { Alert, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Store } from "../utility/Store";
import { urlForThumbnail } from "../utility/image";
import client from "../utility/client";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/router";
// import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  marginAutoItem: {
    margin: "auto",
  },
}));

function ListProducts() {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
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

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/Cart");
  };

  const classes = useStyles();

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}></h3>
      </div>

      <div className={styles.cardList}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Grid
            // className="2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-12 w-full items-center my-auto mt-5 max-w-2xl grid-cols-2 mx-auto flex-wrap justify-center"
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 1, md: 3 }}
            spacing={2}
            justify="center"
          >
            {products.map((product) => (
              <Grid item md={3} key={product.slug}>
                <CartProducts
                  product={product}
                  addToCartHandler={addToCartHandler}
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

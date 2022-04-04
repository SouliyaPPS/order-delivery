import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import LayoutDetails from "../../components/LayoutDetails";
import classes from "../../utility/classes";
import client from "../../utility/client";
import { urlFor, urlForThumbnail } from "../../utility/image";
import { Store } from "../../utility/Store";
import axios from "axios";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ProductScreen(props) {
  const router = useRouter();
  const { slug } = props;
  // const {
  //   state: { cart },
  //   dispatch,
  // } = useContext(Store);
  // const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: "",
  });
  const { product, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `
            *[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        setState({ ...state, product, loading: false });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();
  }, []);

  // const addToCartHandler = async () => {
  //   const existItem = cart.cartItems.find((x) => x._id === product._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/products/${product._id}`);
  //   if (data.countInStock < quantity) {
  //     enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
  //     return;
  //   }
  //   dispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: {
  //       _key: product._id,
  //       name: product.name,
  //       countInStock: product.countInStock,
  //       slug: product.slug.current,
  //       price: product.price,
  //       image: urlForThumbnail(product.image),
  //       quantity,
  //     },
  //   });
  //   enqueueSnackbar(`${product.name} added to the cart`, {
  //     variant: "success",
  //   });
  //   router.push("/cart");
  // };

  return (
    <LayoutDetails title={product?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Box sx={classes.section}>
            <NextLink href="/Home" passHref>
              <Link>
                <div className=" font-bold bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 text-gray-100  uppercase no-underline fixed top-0 left-0 right-15">
                  <ArrowBackIcon />
                  BACK
                </div>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <div className="mx-auto">
                <img
                  src={urlFor(product.image)}
                  alt={product.name}
                  layout="responsive"
                  width={440}
                  height={440}
                  className="mx-auto"
                />
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <div className="flex grid-cols-4 mx-auto hover:space-x-4 flex-wrap justify-center">
                    <Typography component="h5" variant="h5">
                      {product.name}
                    </Typography>
                  </div>
                </ListItem>
                <ListItem>Category: {product.category}</ListItem>
                <ListItem>Brand: {product.brand}</ListItem>
                <ListItem>
                  <Rating value={product.rating} readOnly></Rating>
                  <Typography sx={classes.smallText}>
                    ({product.numReviews} reviews)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Description: {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Price</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>${product.price}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product.countInStock > 0
                            ? "In stock"
                            : "Unavailable"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <button
                      // onClick={addToCartHandler}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium text-xl antialiased md:subpixel-antialiased rounded-md text-white bg-orange-400 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Add to cart
                    </button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </LayoutDetails>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}

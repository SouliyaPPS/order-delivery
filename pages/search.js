import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  MenuItem,
  Rating,
  Select,
  Typography,
  Link,
  Badge,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import LayoutDetails from "../components/LayoutDetails";
import CartProducts from "../components/CartProducts";
import classes from "../utility/classes";
import client from "../utility/client";
import { urlForThumbnail } from "../utility/image";
import { Store } from "../utility/Store";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import NextLink from "next/link";
import styles from "../styles/ListProducts.module.css";
import CountCartStyles from "../styles/CountCart.module.css";

const prices = [
  {
    name: "100.000 to 150.000 Kip",
    value: "100000-150000",
  },
  {
    name: "200.000 to 250.000 Kip",
    value: "200000-250000",
  },
  {
    name: "300.000 to 350.000 Kip",
    value: "300000-350000",
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function SearchScreen() {
  const router = useRouter();
  const {
    category = "all",
    query = "all",
    price = "all",
    rating = "all",
    sort = "default",
  } = router.query;
  const [state, setState] = useState({
    categories: [],
    products: [],
    error: "",
    loading: true,
  });

  const { loading, products, error } = state;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();

    const fetchData = async () => {
      try {
        let gQuery = '*[_type == "product"';
        if (category !== "all") {
          gQuery += ` && category match "${category}" `;
        }
        if (query !== "all") {
          gQuery += ` && name match "${query}" `;
        }
        if (price !== "all") {
          const minPrice = Number(price.split("-")[0]);
          const maxPrice = Number(price.split("-")[1]);
          gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
        }
        if (rating !== "all") {
          gQuery += ` && rating >= ${Number(rating)} `;
        }
        let order = "";
        if (sort !== "default") {
          if (sort === "lowest") order = "| order(price asc)";
          if (sort === "highest") order = "| order(price desc)";
          if (sort === "toprated") order = "| order(rating desc)";
        }

        gQuery += `] ${order}`;
        setState({ loading: true });

        const products = await client.fetch(gQuery);
        setState({ products, loading: false });
      } catch (err) {
        setState({ error: err.message, loading: false });
      }
    };
    fetchData();
  }, [category, price, rating, sort]);

  const filterSearch = ({ category, sort, searchQuery, price, rating }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();
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

  return (
    <div>
      <Navbar className="fixed top-0 left-0 right-0 inset-x-0 z-30 " />

      <NextLink href="/Cart" passHref>
        <Link href="/Cart" className={styles.link}>
          <div className="fixed top-0 left-44 inset-x-6 z-30 ">
            <div className={CountCartStyles.col}>
              <div className={CountCartStyles.cart}>
                <img
                  src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-cart-supermarket-flatart-icons-flat-flatarticons.png"
                  width={25}
                  height={25}
                  alt="CountCart"
                  className="items-left mx-auto"
                />
                <div className={CountCartStyles.counter} component="span">
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      style={{
                        backgroundColor: "orange",
                      }}
                      badgeContent={cart.cartItems.length}
                    ></Badge>
                  ) : (
                    "0"
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </NextLink>

      <div className={styles.container}>
        <h3 className={styles.title}>
          <img
            className="items-center mx-auto"
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/sIL81wOFbRA8cH4Q2JDw.png"
            alt="Landscape picture"
            width={55}
            height={55}
          />
        </h3>
      </div>

      <LayoutDetails title="search">
        {/* <SearchBox title="search"></SearchBox> */}
        <Grid sx={classes.section} container spacing={2}>
          <div className="flex item-center w-full justify-center">
            <Grid item md={3}>
              <List>
                <ListItem>
                  <Box sx={classes.fullWidth}>
                    <Typography style={{ fontSize: 18 }}>Categories</Typography>
                    <Select
                      fullWidth
                      value={category}
                      onChange={categoryHandler}
                      style={{ height: "40px" }}
                    >
                      <MenuItem value="all" style={{ fontSize: 18 }}>
                        All
                      </MenuItem>
                      {categories &&
                        categories.map((category) => (
                          <MenuItem
                            key={category}
                            value={category}
                            style={{ fontSize: 18 }}
                          >
                            {category}
                          </MenuItem>
                        ))}
                    </Select>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box sx={classes.fullWidth}>
                    <Typography style={{ fontSize: 18 }}>Prices</Typography>

                    <Select
                      style={{ height: "40px" }}
                      value={price}
                      onChange={priceHandler}
                      fullWidth
                    >
                      <MenuItem value="all" style={{ fontSize: 18 }}>
                        All
                      </MenuItem>
                      {prices.map((price) => (
                        <MenuItem
                          key={price.value}
                          value={price.value}
                          style={{ fontSize: 18 }}
                        >
                          {price.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box sx={classes.fullWidth}>
                    <Typography style={{ fontSize: 18 }}>Ratings</Typography>
                    <Select
                      style={{ height: "40px" }}
                      value={rating}
                      onChange={ratingHandler}
                      fullWidth
                    >
                      <MenuItem value="all" style={{ fontSize: 18 }}>
                        All
                      </MenuItem>
                      {ratings.map((rating) => (
                        <MenuItem
                          dispaly="flex"
                          key={rating}
                          value={rating}
                          style={{ fontSize: 18 }}
                        >
                          <Rating value={rating} readOnly />
                          <Typography component="span">&amp; Up</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </ListItem>
              </List>
            </Grid>
          </div>

          <div className="ml-4 flex item-center w-full justify-center">
            <Grid item md={9}>
              <div className="mr-10 ml-10">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item style={{ fontSize: 20, fontWeight: "bold" }}>
                    {products && products.length !== 0 ? products.length : "No"}{" "}
                    Results
                    {query !== "all" && query !== "" && " : " + query}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating " + rating + " & up"}
                    {(query !== "all" && query !== "") ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button onClick={() => router.push("/search")}>X</Button>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <Typography
                      component="span"
                      sx={classes.sort}
                      style={{ fontSize: 17 }}
                    >
                      Sort by
                    </Typography>
                    <Select
                      value={sort}
                      onChange={sortHandler}
                      style={{ fontSize: 17, height: "40px" }}
                    >
                      <MenuItem value="default" style={{ fontSize: 17 }}>
                        Default
                      </MenuItem>
                      <MenuItem value="lowest" style={{ fontSize: 17 }}>
                        Price: Low to High
                      </MenuItem>
                      <MenuItem value="highest" style={{ fontSize: 17 }}>
                        Price: High to Low
                      </MenuItem>
                      <MenuItem value="toprated" style={{ fontSize: 17 }}>
                        Customer Reviews
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </div>

              <br />
              <div className={styles.cardList}>
                {/* <Grid sx={classes.section} container spacing={3}> */}
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  <Grid
                    className="mr-8 justify-center"
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 1, sm: 1, md: 3 }}
                    spacing={2}
                    justify="center"
                  >
                    {products.map((product) => (
                      <Grid
                        item
                        // md={10}
                        key={(product.name, product.description)}
                      >
                        <CartProducts
                          product={product}
                          addToCartHandler={addToCartHandler}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
                {/* </Grid> */}
              </div>
              <div>
                <h6 className="my-px px-1 sm:px-1 pb-24"></h6>
              </div>
            </Grid>
          </div>
        </Grid>
      </LayoutDetails>

      <div className="fixed top-0 left-0 right-77 inset-x-0">
        <Tabs />
      </div>
    </div>
  );
}

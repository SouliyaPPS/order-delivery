import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import LayoutDetails from "../components/LayoutDetails";
import { Store } from "../utility/Store";
import styles from "../styles/ListProducts.module.css";
import { withStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import Tabstyles from "../styles/Tabs.module.css";

function Cart() {
  const router = useRouter();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: item._key,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug,
        price: item.price,
        image: item.image,
        quantity,
      },
    });
    enqueueSnackbar(`${item.name} updated in the cart`, {
      variant: "success",
    });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const CustomLink = withStyles({
    root: {
      "&.MuiTypography-colorPrimary": {
        color: "orange",
      },
    },
  })(MuiLink);

  return (
    <>
      <div>
        <div className="fixed top-0 left-0 inset-x-5 z-40">
          <Navbar />
        </div>

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

        <LayoutDetails title="Shopping Cart">
          <h3 className={styles.title}>
            <Typography component="h5" variant="h5">
              Shopping Cart
            </Typography>
          </h3>
          {cartItems.length === 0 ? (
            <div className={styles.container}>
              <Box>
                <Typography>
                  <div className="font-bold">
                    Cart is Empty.{" "}
                    <NextLink href="/Products" passHref>
                      <Link underlineHover>
                        <CustomLink color="primary">Go Shopping🛒</CustomLink>
                      </Link>
                    </NextLink>
                  </div>
                </Typography>
              </Box>
            </div>
          ) : (
            <div className={styles.CartContainer}>
              <div className="mt-5 max-w-2xl grid-cols-2 mx-auto flex-wrap justify-center">
                <div className="flow-root">
                  <ul
                    role="list"
                    className="-my-6 divide-y divide-gray-200 bg-white"
                  >
                    {cartItems.map((item) => (
                      <li key={item._key} className="flex py-6">
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 ">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center "
                              />
                            </div>
                          </Link>
                        </NextLink>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link underline="none">
                                <div className="flex justify-between font-smoothing font-semibold tracking-tight text-gray-900 text-lg">
                                  <h3>
                                    <a> {item.name} </a>
                                  </h3>
                                  <p className="ml-4">{item.price} Kip</p>
                                </div>
                              </Link>
                            </NextLink>
                            <p className="mt-1 text-sm text-gray-500">
                              {/* {item.color} */}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              <Select
                                value={item.quantity}
                                onChange={(e) =>
                                  updateCartHandler(item, e.target.value)
                                }
                                style={{
                                  fontSize: "1.2rem",
                                  fontWeight: "bold",
                                }}
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <MenuItem key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </p>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                <Button
                                  variant="contained"
                                  style={{
                                    borderRadius: 35,
                                    backgroundColor: "#FF8039",
                                    padding: "8px 16px",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                  onClick={() => removeItemHandler(item)}
                                >
                                  X
                                </Button>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <br />
          <div className={Tabstyles.CheckOutBottom}>
            <Grid
              item
              md={5}
              xs={12}
              alignItems="center"
              container
              justify="center"
              display="flex"
              style={{
                margin: "auto",
              }}
            >
              <Card
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  margin: "auto",
                }}
              >
                <List
                  style={{
                    paddingLeft: "17px",
                    paddingRight: "17px",
                    margin: "auto",
                  }}
                >
                  <h5 className={styles.textcard}>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) :{" "}
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}{" "}
                    Kip
                  </h5>
                  <ListItem>
                    <Button
                      onClick={() => {
                        router.push("/shipping");
                      }}
                      fullWidth
                      style={{
                        borderRadius: 35,
                        backgroundColor: "#FF8039",
                        padding: "7px 14px",
                        fontSize: "17px",
                        fontWeight: "bold",
                      }}
                      variant="contained"
                    >
                      <p>
                        <ShoppingCartCheckoutRoundedIcon /> Checkout
                      </p>
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </div>
        </LayoutDetails>

        {/* MUI */}
        {/* <LayoutDetails title="Shopping Cart">
          <h3 className={styles.title}>
            <Typography component="h5" variant="h5">
              Shopping Cart
            </Typography>
          </h3>
          {cartItems.length === 0 ? (
            <div className={styles.container}>
              <Box>
                <Typography>
                  <div className="font-bold">
                    Cart is Empty.{" "}
                    <NextLink href="/Products" passHref>
                      <Link underlineHover>
                        <CustomLink color="primary">Go Shopping🛒</CustomLink>
                      </Link>
                    </NextLink>
                  </div>
                </Typography>
              </Box>
            </div>
          ) : (
            <div className={styles.container}>
              <Grid
                container
                spacing={1}
                style={{
                  margin: "auto",
                }}
              >
                <Grid
                  item
                  md={9}
                  xs={12}
                  style={{
                    margin: "auto",
                  }}
                >
                  <div className={styles.container}>
                    <TableContainer
                      style={{
                        margin: "auto",
                      }}
                    >
                      <Table
                        style={{
                          margin: "auto",
                        }}
                      >
                        <TableHead>
                          <TableRow
                            style={{
                              margin: "auto",
                            }}
                          >
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cartItems.map((item) => (
                            <TableRow key={item._key}>
                              <TableCell>
                                <NextLink
                                  href={`/product/${item.slug}`}
                                  passHref
                                >
                                  <Link>
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        width="auto"
                                        height="auto"
                                      ></img>
                                    </div>
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell>
                                <NextLink
                                  href={`/product/${item.slug}`}
                                  passHref
                                >
                                  <Link underline="none">
                                    <h3 className={styles.textcard}>
                                      <Typography>{item.name}</Typography>
                                    </h3>
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell align="right">
                                <Select
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateCartHandler(item, e.target.value)
                                  }
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <MenuItem key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>{item.price} Kip</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  style={{
                                    borderRadius: 35,
                                    backgroundColor: "#FF8039",
                                    padding: "8px 16px",
                                    fontSize: "18px",
                                  }}
                                  onClick={() => removeItemHandler(item)}
                                >
                                  x
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Grid>

                <Grid
                  item
                  md={5}
                  xs={12}
                  alignItems="center"
                  container
                  justify="center"
                  display="flex"
                  style={{
                    margin: "auto",
                  }}
                >
                  <Card>
                    <List>
                      <ListItem>
                        <Typography
                          variant="h6"
                          style={{
                            margin: "auto",
                          }}
                        >
                          <h5 className={styles.textcard}>
                            Subtotal (
                            {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                            items) :{" "}
                            {cartItems.reduce(
                              (a, c) => a + c.quantity * c.price,
                              0
                            )}{" "}
                            Kip
                          </h5>
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={() => {
                            router.push("/shipping");
                          }}
                          fullWidth
                          style={{
                            borderRadius: 35,
                            backgroundColor: "#FF8039",
                            padding: "8px 16px",
                            fontSize: "18px",
                          }}
                          variant="contained"
                        >
                          Checkout
                        </Button>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </div>
          )}
        </LayoutDetails> */}
        {/* MUI end*/}

        <Tabs />
      </div>
      <div>
        <h6 className="my-px px-1 sm:px-1 pb-20"></h6>
      </div>
      <div>
        <h6 className="my-px px-1 sm:px-1 pb-24"></h6>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });

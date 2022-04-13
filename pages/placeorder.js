import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import CheckoutWizard from "../components/CheckoutWizard";
import LayoutDetails from "../components/LayoutDetails";
import classes from "../utility/classes";
import { Store } from "../utility/Store";
import { useSnackbar } from "notistack";
import { getError } from "../utility/error";
import axios from "axios";
import jsCookie from "js-cookie";
import dynamic from "next/dynamic";
import styles from "../styles/ListProducts.module.css";
import Navbar from "../components/Navbar";
import Tabstyles from "../styles/Tabs.module.css";
import Tabs from "../components/Tabs";

function PlaceOrderScreen() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  // const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const shippingPrice = 10000;
  // const taxPrice = round2(itemsPrice * 0.15);
  // const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  const totalPrice = round2(itemsPrice + shippingPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    if (cartItems.length === 0) {
      router.push("/Cart");
    }
  }, [cartItems, paymentMethod, router]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems.map((x) => ({
            ...x,
            countInStock: undefined,
            slug: undefined,
          })),
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          // taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: "CART_CLEAR" });
      jsCookie.remove("cartItems");
      setLoading(false);
      router.push(`/order/${data}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 inset-x-0 z-30 " />

      <div className={styles.container}>
        <h3 className={styles.title}>
          <img
            className="items-center mx-auto"
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/1VgavaYVt6bjm3vpJakt/pub/sIL81wOFbRA8cH4Q2JDw.png"
            alt="Landscape picture"
            width={65}
            height={65}
          />
        </h3>
      </div>

      <h3 className={styles.title}>
        <Typography component="h4" variant="h4">
          Place Order
        </Typography>
      </h3>
      <br />
      <LayoutDetails title="Place Order">
        <CheckoutWizard activeStep={3}></CheckoutWizard>
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card sx={classes.section}>
              <List>
                <ListItem>
                  <h3 className={styles.title}>
                    <Typography component="h5" variant="h5">
                      Shipping Address
                    </Typography>
                  </h3>
                </ListItem>
                <ListItem
                  style={{
                    fontSize: "19px",
                  }}
                >
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </ListItem>
                <ListItem>
                  <Button
                    onClick={() => router.push("/shipping")}
                    variant="contianed"
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#fdc479",
                      padding: "8px 16px",
                      fontSize: "18px",
                    }}
                  >
                    Edit
                  </Button>
                </ListItem>
              </List>
            </Card>
            <Card sx={classes.section}>
              <List>
                <ListItem>
                  <h3 className={styles.title}>
                    <Typography component="h5" variant="h5">
                      Payment Method
                    </Typography>
                  </h3>
                </ListItem>
                <ListItem
                  style={{
                    fontSize: "19px",
                  }}
                >
                  {paymentMethod}
                </ListItem>
                <ListItem>
                  <Button
                    onClick={() => router.push("/payment")}
                    variant="contianed"
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#fdc479",
                      padding: "8px 16px",
                      fontSize: "18px",
                    }}
                  >
                    Edit
                  </Button>
                </ListItem>
              </List>
            </Card>

            {/* <div className={styles.CartContainer}> */}
            <div className="mt-5 mx-auto flex-wrap justify-center">
              <div className="flow-root">
                <ul
                  role="list"
                  className="-my-6 divide-y divide-gray-200 bg-white"
                >
                  <Card sx={classes.section}>
                    <List>
                      <ListItem>
                        <h3 className={styles.title}>
                          <Typography component="h5" variant="h5">
                            Order Items
                          </Typography>
                        </h3>
                      </ListItem>
                      {cartItems.map((item) => (
                        <li
                          key={item._key}
                          className="flex py-1 mr-2 ml-2 shadow-md"
                        >
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
                                <Typography
                                  value={item.quantity}
                                  style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Quantity: {item.quantity}
                                </Typography>
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </List>
                  </Card>

                  {/* <Card sx={classes.section}>
                    <List>
                      <ListItem>
                        <h3 className={styles.title}>
                          <Typography component="h5" variant="h5">
                            Order Items
                          </Typography>
                        </h3>
                      </ListItem>
                      <ListItem>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>
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
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          width={50}
                                          height={50}
                                        ></Image>
                                      </Link>
                                    </NextLink>
                                  </TableCell>
                                  <TableCell>
                                    <NextLink
                                      href={`/product/${item.slug}`}
                                      passHref
                                    >
                                      <Link>
                                        <Typography align="center">
                                          {item.name}
                                        </Typography>
                                      </Link>
                                    </NextLink>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography>{item.quantity}</Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography>{item.price} Kip</Typography>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </ListItem>
                    </List>
                  </Card> */}
                </ul>
              </div>
            </div>
            {/* </div> */}
          </Grid>

          <Grid item md={3} xs={12}>
            <Card sx={classes.section}>
              <List>
                <h5 className={styles.textcard}>
                  <ListItem>
                    <Typography variant="h5">Order Summary</Typography>
                  </ListItem>
                </h5>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        Items:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        align="right"
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        {itemsPrice} Kip
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        style={{
                          fontSize: "18px",
                        }}
                      >
                        Shipping:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        align="right"
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        {shippingPrice} Kip
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                        }}
                      >
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        align="right"
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                        }}
                      >
                        <strong>{totalPrice} Kip</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <div className={Tabstyles.PlaceOrderBottom}>
                  <ListItem>
                    <Button
                      onClick={placeOrderHandler}
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      style={{
                        borderRadius: 35,
                        backgroundColor: "#ED9025",
                        padding: "5px 10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Place Order
                    </Button>
                    {loading && (
                      <ListItem>
                        <CircularProgress />
                      </ListItem>
                    )}
                  </ListItem>
                </div>
              </List>
            </Card>
          </Grid>
        </Grid>
      </LayoutDetails>

      <Tabs />
      <div>
        <h6 className="my-px px-1 sm:px-1 pb-28"></h6>
      </div>
    </>
  );
}
export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });

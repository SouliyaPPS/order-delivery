import {
  Alert,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useReducer } from "react";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import LayoutDetails from "../../components/LayoutDetails";
import classes from "../../utility/classes";
import { Store } from "../../utility/Store";
import { useRouter } from "next/router";
import { getError } from "../../utility/error";
import axios from "axios";
// import { useSnackbar } from "notistack";
import styles from "../../styles/ListProducts.module.css";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
  }
}
function OrderScreen({ params }) {
  // const { enqueueSnackbar } = useSnackbar();
  const { id: orderId } = params;
  const [{ loading, error, order, successPay }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: "",
    }
  );

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    // taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      // const loadPaypalScript = async () => {
      //   const {} = await axios.get("/api/keys/paypal", {
      //     headers: { authorization: `Bearer ${userInfo.token}` },
      //   });
      //   // paypalDispatch({
      //   //   type: "resetOptions",
      //   //   value: {
      //   //     "client-id": clientId,
      //   //     currency: "USD",
      //   //   },
      //   // });
      //   // paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      // };
      // loadPaypalScript();
    }
  }, [
    order,
    orderId,
    successPay,
    // paypalDispatch,
    router,
    userInfo,
  ]);

  // function createOrder(data, actions) {
  //   return actions.order
  //     .create({
  //       purchase_units: [
  //         {
  //           amount: { value: totalPrice },
  //         },
  //       ],
  //     })
  //     .then((orderID) => {
  //       return orderID;
  //     });
  // }

  // function onApprove(data, actions) {
  //   return actions.order.capture().then(async function (details) {
  //     try {
  //       dispatch({ type: "PAY_REQUEST" });
  //       const { data } = await axios.put(
  //         `/api/orders/${order._id}/pay`,
  //         details,
  //         {
  //           headers: { authorization: `Bearer ${userInfo.token}` },
  //         }
  //       );
  //       dispatch({ type: "PAY_SUCCESS", payload: data });
  //       enqueueSnackbar("Order is paid", { variant: "success" });
  //     } catch (err) {
  //       dispatch({ type: "PAY_FAIL", payload: getError(err) });
  //       enqueueSnackbar(getError(err), { variant: "error" });
  //     }
  //   });
  // }

  // function onError(err) {
  //   enqueueSnackbar(getError(err), { variant: "error" });
  // }

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
          Order
        </Typography>
        <Typography component="h6" variant="h6">
          ID: {orderId}
        </Typography>
      </h3>

      <LayoutDetails title={`Order ${orderId}`}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
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
                  <ListItem
                    style={{
                      fontSize: "19px",
                    }}
                  >
                    Status:{" "}
                    {isDelivered
                      ? `delivered at ${deliveredAt}`
                      : "not delivered"}
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
                  <ListItem
                    style={{
                      fontSize: "19px",
                    }}
                  >
                    Status: {isPaid ? `paid at ${paidAt}` : "not paid"}
                  </ListItem>
                </List>
              </Card>

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
                        {orderItems.map((item) => (
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
                                <NextLink
                                  href={`/product/${item.slug}`}
                                  passHref
                                >
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
                          <Typography component="h2" variant="h2">
                            Order Items
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Image</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell align="right">Quantity</TableCell>
                                  <TableCell align="right">Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {orderItems.map((item) => (
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
                                          <Typography>{item.name}</Typography>
                                        </Link>
                                      </NextLink>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Typography>{item.quantity}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Typography>${item.price}</Typography>
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
                            fontSize: "18px",
                          }}
                        >
                          Items:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          style={{
                            fontSize: "20px",
                          }}
                          align="right"
                        >
                          {itemsPrice} Kip
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {/* <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">{taxPrice} Kip</Typography>
                    </Grid>
                  </Grid>
                </ListItem> */}
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
                          style={{
                            fontSize: "20px",
                          }}
                          align="right"
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
                            fontSize: "20px",
                          }}
                        >
                          <strong>Total:</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          style={{
                            fontSize: "22px",
                          }}
                          align="right"
                        >
                          <strong>{totalPrice} Kip</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>

                  {/* {!isPaid && (
                  <ListItem>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                      <Box sx={classes.fullWidth}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </Box>
                    )}
                  </ListItem>
                )} */}
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </LayoutDetails>

      <Tabs />
      <div>
        <h6 className="my-px px-1 sm:px-1 pb-28"></h6>
      </div>
    </>
  );
}
export function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });

import {
  Alert,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer } from "react";
import LayoutDetails from "../components/LayoutDetails";
import { getError } from "../utility/error";
import { Store } from "../utility/Store";
import dynamic from "next/dynamic";
import styles from "../styles/ListProducts.module.css";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrders();
  }, [router, userInfo]);
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
          Order History
        </Typography>
      </h3>
      <br />
      <LayoutDetails title="Order History">
        {loading ? (
          <CircularProgress
            style={{
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              gridRowGap: "10px",
              margin: "auto",
            }}
          />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div className=" mx-auto flex-wrap justify-center">
            <div className="flow-root h-64">
              <ul
                role="list"
                className="h-64 -my-6 divide-y divide-gray-200 bg-white"
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>DATE</TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell>PAID</TableCell>
                        <TableCell>ACTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          <TableCell>{order.totalPrice} Kip</TableCell>
                          <TableCell>
                            {order.isPaid
                              ? `paid at ${order.paidAt}`
                              : "not paid"}
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/order/${order._id}`} passHref>
                              <Button
                                variant="contained"
                                style={{
                                  borderRadius: 35,
                                  backgroundColor: "#FF8039",
                                  padding: "8px 16px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                Details
                              </Button>
                            </NextLink>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ul>
            </div>
          </div>
        )}
      </LayoutDetails>

      <Tabs />
    </>
  );
}
export default dynamic(() => Promise.resolve(OrderHistoryScreen), {
  ssr: false,
});

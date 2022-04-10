import React from "react";
import { createTheme } from "@mui/material/styles";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import CountCartStyles from "../styles/CountCart.module.css";
import styles from "../styles/ListProducts.module.css";
import ListProducts from "./ListProducts";
import Footer from "../components/Footer";
import NextLink from "next/link";
import classes from "../utility/classes";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utility/Store";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getError } from "../utility/error";

export default function Products({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar]);

  return (
    <div>
      <Navbar className="fixed top-0 left-0 right-0 inset-x-0 z-30 " />

      <NextLink href="/Cart" passHref>
        <Link href="/Cart" className={styles.link}>
          <div className="fixed top-0 left-44 inset-x-6 z-30 ">
            {/* left-44 */}
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

      {/* Search Box */}
      <div className={styles.cardList}>
        <div className="mt-1 rounded-md inset-y-0 left-0 pl-2 flex items-center text-black">
          <div className="box pt-1">
            <div className="box-wrapper">
              <div className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                <button className="outline-none focus:outline-none">
                  <svg
                    className=" w-5 text-gray-600 h-5 cursor-pointer"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <input
                  type="search"
                  name
                  id
                  placeholder="search"
                  x-model="q"
                  className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent mx-auto"
                />
                <div className="select mx-auto">
                  <select
                    name
                    id
                    x-model="image_type"
                    className="text-sm outline-none focus:outline-none bg-transparent text-right"
                  >
                    <option className="mx-auto" value="All" selected>
                      All
                    </option>
                    <option className="mx-auto" value="RE-CRAFT STAR">
                      RE-CRAFT STAR
                    </option>
                    <option className="mx-auto" value="SPECIAL COLLECTION">
                      SPECIAL COLLECTION
                    </option>
                    <option className="mx-auto" value="vector">
                      FABRIC SCRAP
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      {/* Search Box end*/}

      <div className="grid -z-50">
        <ListProducts />
        <Footer />
      </div>

      <div className="fixed top-0 left-0 right-77 inset-x-0">
        <Tabs />
      </div>
    </div>
  );
}

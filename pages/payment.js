import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Form from "../components/Form";
import LayoutDetails from "../components/LayoutDetails";
import { Store } from "../utility/Store";
import styles from "../styles/ListProducts.module.css";
import Navbar from "../components/Navbar";

export default function PaymentScreen() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(jsCookie.get("paymentMethod") || "");
    }
  }, [router, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar("Payment method is required", { variant: "error" });
    } else {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
      jsCookie.set("paymentMethod", paymentMethod);
      router.push("/placeorder");
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
          Payment Method
        </Typography>
      </h3>

      <br />
      <LayoutDetails title="Payment Method">
        <CheckoutWizard activeStep={2}></CheckoutWizard>
        <Form onSubmit={submitHandler}>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Payment Method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label="PayPal"
                    value="PayPal"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Stripe"
                    value="Stripe"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                style={{
                  borderRadius: 35,
                  backgroundColor: "#ED9025",
                  padding: "8px 16px",
                  fontSize: "18px",
                }}
              >
                Continue
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="button"
                variant="contained"
                style={{
                  borderRadius: 35,
                  backgroundColor: "#fdc479",
                  padding: "8px 16px",
                  fontSize: "18px",
                }}
                onClick={() => router.push("/shipping")}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </Form>
      </LayoutDetails>
    </>
  );
}

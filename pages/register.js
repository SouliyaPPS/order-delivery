import React, { useContext, useEffect } from "react";
import LayoutDetails from "../components/LayoutDetails";
import { useForm, Controller } from "react-hook-form";
import NextLink from "next/link";
import Form from "../components/Form";
import { withStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { Store } from "../utility/Store";
import { getError } from "../utility/error";
import styles from "../styles/ListProducts.module.css";
import Navbar from "../components/Navbar";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function RegisterScreen() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [router, userInfo, redirect]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const CustomLink = withStyles({
    root: {
      "&.MuiTypography-colorPrimary": {
        color: "#ED9025",
      },
    },
  })(MuiLink);

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

      <LayoutDetails title="Register">
        <Form onSubmit={handleSubmit(submitHandler)}>
          <h3 className={styles.title}>
            <Typography component="h4" variant="h4">
              Register
            </Typography>
          </h3>
          <List style={{ backgroundColor: "white", color: "black" }}>
            <ListItem>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Name"
                    inputProps={{ type: "name" }}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.name.type === "minLength"
                          ? "Name length is more than 1"
                          : "Name is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    inputProps={{ type: "email" }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "Email is not valid"
                          : "Email is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <FormControl sx={{ width: "100ch" }} variant="outlined">
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <OutlinedInput
                      id="password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      variant="outlined"
                      fullWidth
                      label="Password"
                      // inputProps={{ type: "password" }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === "minLength"
                            ? "Password length is more than 5"
                            : "Password is required"
                          : ""
                      }
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    ></OutlinedInput>
                  )}
                ></Controller>
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl sx={{ width: "100ch" }} variant="outlined">
                <InputLabel htmlFor="filled-adornment-password">
                  Confirm Password
                </InputLabel>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <OutlinedInput
                      id="confirmPassword"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      variant="outlined"
                      fullWidth
                      label="Confirm Password"
                      // inputProps={{ type: "password" }}
                      error={Boolean(errors.confirmPassword)}
                      helperText={
                        errors.confirmPassword
                          ? errors.confirmPassword.type === "minLength"
                            ? "Confirm Password length is more than 5"
                            : "Confirm Password is required"
                          : ""
                      }
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    ></OutlinedInput>
                  )}
                ></Controller>
              </FormControl>
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                style={{
                  borderRadius: 35,
                  backgroundColor: "#ED9025",
                  padding: "8px 16px",
                  fontSize: "18px",
                }}
              >
                Register
              </Button>
            </ListItem>
            <ListItem>
              <div className="font-medium text-lg">
                Already have an account?{" "}
                <NextLink
                  href={`/login?redirect=${redirect || "/Home"}`}
                  passHref
                >
                  <Link>
                    <CustomLink color="primary">Login</CustomLink>
                  </Link>
                </NextLink>
              </div>
            </ListItem>
          </List>
        </Form>
      </LayoutDetails>
    </>
  );
}

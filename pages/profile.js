import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import jsCookie from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Form from "../components/Form";
import LayoutDetails from "../components/LayoutDetails";
import { getError } from "../utility/error";
import { Store } from "../utility/Store";
import Navbar from "../components/Navbar";
import styles from "../styles/ListProducts.module.css";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function ProfileScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { redirect } = router.query;

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
      // router.push(redirect || "/Home");
    }
    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
  }, [router, setValue, userInfo]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      router.push(redirect || "/Home");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

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

      <LayoutDetails title="Profile">
        <h3 className={styles.title}>
          <Typography component="h4" variant="h4">
            Profile
          </Typography>
        </h3>
        <Form onSubmit={handleSubmit(submitHandler)}>
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
                    inputProps={{ type: "text" }}
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
                    validate: (value) =>
                      value === "" ||
                      value.length > 5 ||
                      "Password length is more than 5",
                  }}
                  render={({ field }) => (
                    <OutlinedInput
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      variant="outlined"
                      fullWidth
                      id="password"
                      label="password"
                      // inputProps={{ type: "password" }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password ? "Password length is more than 5" : ""
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
                    validate: (value) =>
                      value === "" ||
                      value.length > 5 ||
                      "confirmPassword length is more than 5",
                  }}
                  render={({ field }) => (
                    <OutlinedInput
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      variant="outlined"
                      fullWidth
                      id="confirmPassword"
                      label="Confirm Password"
                      // inputProps={{ type: "password" }}
                      error={Boolean(errors.confirmPassword)}
                      helperText={
                        errors.confirmPassword
                          ? "Confirm Password length is more than 5"
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
                Update
              </Button>
            </ListItem>
          </List>
        </Form>
      </LayoutDetails>
    </>
  );
}

export default dynamic(() => Promise.resolve(ProfileScreen), { ssr: false });

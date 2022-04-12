// import { ChakraProvider } from "@chakra-ui/react";
// import { CacheProvider } from "@emotion/react";
// import {ThemeProvider, CssBaseline } from "@mui/material";
// import "../styles/application.scss";
import React from "react";
import PropTypes from "prop-types";
import createEmotionCache from "../utility/createEmotionCache";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";
import { StoreProvider } from "../utility/Store";
import { SnackbarProvider } from "notistack";

const clientSideEmotionCache = createEmotionCache();

// function MyApp({ Component, pageProps }) {
//   return (
//     <ChakraProvider>
//       <Component {...pageProps} />
//     </ChakraProvider>
//   );
// }

const MyApp = (props) => {
  const { Component = clientSideEmotionCache, pageProps } = props;

  return (
    // <CacheProvider value={emotionCache}>
    //   <CssBaseline />
    <ThemeProvider enableSystem={true} attribute="class">
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SnackbarProvider>
    </ThemeProvider>
    // </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

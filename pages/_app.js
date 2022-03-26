// import { ChakraProvider } from "@chakra-ui/react";
// import { CacheProvider } from "@emotion/react";
// import {ThemeProvider, CssBaseline } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import createEmotionCache from "../utility/createEmotionCache";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";

const clientSideEmotionCache = createEmotionCache();

// function MyApp({ Component, pageProps }) {
//   return (
//     <ChakraProvider>
//       <Component {...pageProps} />
//     </ChakraProvider>
//   );
// }

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    // <CacheProvider value={emotionCache}>
    //   <CssBaseline />
    <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
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

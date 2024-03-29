import { AuthConsumer, AuthProvider } from "@/contexts/auth-context";
import { useNProgress } from "@/hooks/use-nprogress";
import { createTheme } from "@/theme";
import { createEmotionCache } from "@/utils/create-emotion-cache";
import { CacheProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@/contexts/theme-context";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Head from "next/head";

import "@/styles/editor-content-styles.css";
import { useMemo, useState } from "react";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <img width="250px" src="/assets/hackum-logo-white.png" alt="Club Management System" />
    </Box>
  );
};

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Club Management System</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <AuthConsumer>
              {(auth) =>
                auth.isLoading ? <SplashScreen /> : getLayout(<Component {...pageProps} />)
              }
            </AuthConsumer>
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default App;

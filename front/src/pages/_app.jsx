import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "@/contexts/auth-context";
import { useNProgress } from "@/hooks/use-nprogress";
import { createTheme } from "@/theme";
import { createEmotionCache } from "@/utils/create-emotion-cache";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Club Management System</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <ThemeProvider theme={theme}>
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

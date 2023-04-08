import Head from "next/head";
import NextLink from "next/link";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";

const Page = () => (
  <>
    <Head>
      <title>Verify</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box textAlign="center">
            <img width="100%" alt="" src="/assets/verify.svg" />
          </Box>
          <Typography align="center" sx={{ mt: -8, mb: 3 }} variant="h3">
            Please verify your email address
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            We have sent you an email with a link to verify your email address.
          </Typography>
          <Button
            component={NextLink}
            href="/auth/login"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            Back to login
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;

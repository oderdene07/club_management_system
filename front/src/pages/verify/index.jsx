import { apiClient } from "@/api/apiClient";
import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const email = router.query.email;

  const handleResendCode = async () => {
    try {
      await apiClient.post("/resend", { email: email });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Verify</title>
      </Head>
      <Box
        component="main"
        sx={{
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
              color="primary"
              sx={{ mt: 3 }}
              variant="contained"
              size="large"
              onClick={handleResendCode}
            >
              <Typography variant="body1">Resend email</Typography>
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;

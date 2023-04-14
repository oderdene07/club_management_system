import { apiClient } from "@/api/apiClient";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    async function verify(code) {
      if (!code) return;
      try {
        await apiClient.get(`/verify/${code}`);
      } catch (error) {
        console.log(error);
        if (error) {
          router.push("/auth/login");
        }
      }
    }
    verify(code);
  }, [code, router]);

  return (
    <>
      <Head>
        <title>Success</title>
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
              Email verification successful
            </Typography>
            <Typography align="center" color="text.secondary" variant="body1">
              You are now in waitlist. We will notify you when we launch.
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
};

export default Page;

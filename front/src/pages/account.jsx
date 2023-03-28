import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { AccountProfile } from "@/components/account/account-profile";
import { AccountProfileDetails } from "@/components/account/account-profile-details";
import { AccountPassword } from "@/components/account/account-password";

const Page = () => (
  <>
    <Head>
      <title>Account</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Account</Typography>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={5}>
                <Grid xs={12}>
                  <AccountProfile />
                </Grid>
                <Grid xs={12}>
                  <AccountPassword />
                </Grid>
              </Grid>
              <Grid xs={12} md={6} lg={7}>
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

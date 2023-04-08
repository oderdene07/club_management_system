import { SettingsForm } from "@/components/settings/settings-form";
import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import { Layout as DashboardLayout } from "@/layouts/overview/layout";

const Page = () => (
  <>
    <Head>
      <title>Settings</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={3}
          width={{
            xs: "100%",
            sm: "90%",
            md: "80%",
            xl: "70%",
          }}
        >
          <Typography variant="h4">Settings</Typography>
          <SettingsForm />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

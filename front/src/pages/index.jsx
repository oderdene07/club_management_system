import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTotalMembers } from "src/sections/overview/overview-total-members";

const Page = () => (
  <>
    <Head>
      <title>Overview</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid xs={12} sm={6} lg={6}>
            <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" />
          </Grid>
          <Grid xs={12} sm={6} lg={6}>
            <OverviewTotalMembers
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid xs={12} lg={12}>
            <OverviewSales
              chartSeries={[
                {
                  name: "This year",
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                },
                {
                  name: "Last year",
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

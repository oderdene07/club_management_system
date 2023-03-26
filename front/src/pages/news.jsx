import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { NewsCard } from "src/sections/news/news-card";

const news = [
  {
    id: "1",
    title: "It Does Not Matter Hows Slowly go as Long",
    image: "/assets/products/product-1.png",
  },
  {
    id: "2",
    title: "Netbook Network Added New Photo Filter",
    image: "/assets/products/product-2.png",
  },
  {
    id: "3",
    title: "We Optimised Netbooks Better Navigation",
    image: "/assets/products/product-6.png",
  },
  {
    id: "4",
    title: "Netbook Network Added New Photo Filter",
    image: "/assets/products/product-4.png",
  },
  {
    id: "5",
    title: "We Optimised Netbooks Better Navigation",
    image: "/assets/products/product-5.png",
  },
  {
    id: "6",
    title: "It Does Not Matter Hows Slowly go as Long",
    image: "/assets/products/product-6.png",
  },
];

const Page = () => (
  <>
    <Head>
      <title>News</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">News</Typography>
            </Stack>

            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Add
            </Button>
          </Stack>
          <Grid container spacing={3}>
            {news.map((news) => (
              <Grid xs={12} sm={6} md={4} lg={4} xl={3} key={news.id}>
                <NewsCard news={news} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination count={3} size="small" />
          </Box>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

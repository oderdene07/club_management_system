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
import { Layout as DashboardLayout } from "src/layouts/overview/layout";
import { NewsCard } from "src/sections/news/news-card";
import { useRouter } from "next/router";
import { useState } from "react";
import usePagination from "@/components/pagination";

const data = [
  {
    id: "1",
    title: "It Does Not Matter Hows Slowly go as Long",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-1.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "2",
    title: "Netbook Network Added New Photo Filter",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-2.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "3",
    title: "We Optimised Netbooks Better Navigation",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-6.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "4",
    title: "Netbook Network Added New Photo Filter",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-4.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "5",
    title: "We Optimised Netbooks Better Navigation",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-5.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "6",
    title: "It Does Not Matter Hows Slowly go as Long",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-6.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "7",
    title: "It Does Not Matter Hows Slowly go as Long",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-1.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "8",
    title: "Netbook Network Added New Photo Filter",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-2.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "9",
    title: "We Optimised Netbooks Better Navigation",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-6.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "10",
    title: "Netbook Network Added New Photo Filter",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-4.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "11",
    title: "We Optimised Netbooks Better Navigation",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-5.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "12",
    title: "It Does Not Matter Hows Slowly go as Long",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-6.png",
    createdAt: "2021-09-24 10:00:00",
  },
];

const rowsPerPage = 8;

const Page = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const count = Math.ceil(data.length / rowsPerPage);
  const news = usePagination(data, rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    news.jump(newPage);
  };

  return (
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
                onClick={() => {
                  router.push("/news/add");
                }}
              >
                Add
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {news.currentData().map((newsItem) => (
                <Grid xs={12} sm={6} md={4} lg={4} xl={3} key={newsItem.id}>
                  <NewsCard newsItem={newsItem} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            ></Box>
          </Stack>
        </Container>
      </Box>
      <Pagination size="small" count={count} page={page} onChange={handleChangePage} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

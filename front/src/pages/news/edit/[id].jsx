import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Button,
  CardActions,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { NewsForm } from "@/components/news/news-form";
import { apiClient } from "@/api/apiClient";

const Page = () => {
  const router = useRouter();
  const [values, setValues] = useState();
  const newsID = router.query.id;

  const getNews = async (id) => {
    await apiClient.get(`/news/${id}`).then((res) => {
      setValues(res.data);
    });
  };

  useEffect(() => {
    if (newsID) getNews(newsID);
  }, [newsID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiClient.put(`/news/${newsID}`, values).then((res) => {
      router.back();
    });
  };

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [setValues]
  );

  const handleChangeEditor = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        content: event,
      }));
    },
    [setValues]
  );

  const handleImageChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      if (file) reader.readAsDataURL(file);
    },
    [setValues]
  );

  return (
    <>
      <Head>
        <title>Edit News</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          <form autoComplete="off">
            <Card>
              <CardHeader title="Edit News" />
              <CardContent>
                <NewsForm
                  values={values}
                  handleChange={handleChange}
                  handleImageChange={handleImageChange}
                  handleChangeEditor={handleChangeEditor}
                />
              </CardContent>
              <Divider sx={{ borderColor: "primary.light" }} />
              <CardActions sx={{ padding: 3, justifyContent: "flex-end" }}>
                <Stack direction="row" spacing={2}>
                  <Button onClick={() => router.back()} variant="outlined">
                    Close
                  </Button>
                  <Button onClick={handleSubmit} variant="contained">
                    Save details
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </form>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

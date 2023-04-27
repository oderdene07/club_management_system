import { apiClient } from "@/api/apiClient";
import { NewsForm } from "@/components/news/news-form";
import { useAuth } from "@/contexts/auth-context";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    member_id: user?.id,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiClient.post("/news", values);
    router.push("/news");
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

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const res = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setValues((prevState) => ({
      ...prevState,
      image: res.data,
    }));
  };

  const handleChangeEditor = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        content: event,
      }));
    },
    [setValues]
  );

  return (
    <>
      <Head>
        <title>Add News</title>
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
              <CardHeader title="Add News" />
              <CardContent>
                <NewsForm
                  values={values}
                  handleChange={handleChange}
                  handleImageChange={handleImageChange}
                  handleChangeEditor={handleChangeEditor}
                />
              </CardContent>
              <Divider />
              <CardActions sx={{ padding: 3, justifyContent: "flex-end" }}>
                <Stack direction="row" spacing={2}>
                  <Button onClick={() => router.push("/news")} variant="outlined">
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

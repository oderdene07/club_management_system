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
import { useCallback, useState } from "react";
import { NewsForm } from "@/components/news/news-form";

const news = {
  id: "1",
  title:
    "Өндөр барилга дээр гэмтсэн хүнд нисдэг тэргээр эмнэлгийн тусламж үзүүлэх сургуулилалт боллоо",
  content:
    "Тэрбээр 'Өндөр барилга дээр ажиллаж буй краннистын биеийн байдал муудсан үед хэрхэн тусламж үзүүлэх талаар сургуулилалт хийж байна. Энэ тохиолдолд иргэнийг өндрөөс буулгах боломжгүй учир аврах ангийнхан эмнэлгийн тусламжийг нисдэг тэргээр ирж үзүүлэх юм. Энэ бол бодит биш. Дадлага сургуулилалт' хэмээн ярилаа. ",
  image: "/assets/products/product-1.png",
  createdAt: "2021-09-24 10:00:00",
  creator: "H.ЭРХБАЯР",
};

const Page = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    title: news.title,
    content: news.content,
    image: news.image,
    creator: news.creator,
  });

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", values);
      router.back();
    },
    [values, router]
  );

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
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

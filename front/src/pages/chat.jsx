import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";

import { ChatBox } from "@/components/chat/chat-box";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";

const Page = () => (
  <>
    <Head>
      <title>Chat</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: 2,
      }}
    >
      <Container maxWidth="xl">
        <Typography pb={2} variant="h4">
          Chat
        </Typography>
      </Container>
      <ChatBox />
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

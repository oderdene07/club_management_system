import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { MembersTable } from "@/components/member/members-table";
import { MembersSearch } from "@/components/member/members-search";
import { useApi } from "@/hooks/use-api";

const Page = () => {
  const { data, error, loading } = useApi("/members");

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Stack spacing={1}>
                <Typography variant="h4">Members</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <MembersSearch onChange={(value) => handleSearch(value)} />
              </Stack>
            </Stack>
            <MembersTable members={data} loading={loading} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

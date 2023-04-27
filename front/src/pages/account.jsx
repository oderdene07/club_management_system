import { apiClient } from "@/api/apiClient";
import { AccountPassword } from "@/components/account/account-password";
import { AccountProfile } from "@/components/account/account-profile";
import { AccountProfileDetails } from "@/components/account/account-profile-details";
import { useAuth } from "@/contexts/auth-context";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { Box, Container, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";

const Page = () => {
  const { user, refresh } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [member, setMember] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    occupation: "",
    profile_picture: "",
    profile_description: "",
  });

  useEffect(() => {
    setMember(user);
  }, [user]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await apiClient.put("/member/" + user?.id, member);
    refresh();
    setIsLoading(false);
    setIsChanged(false);
  };

  return (
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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Account</Typography>
            <div>
              <Grid container spacing={3}>
                <Grid padding={0} xs={12} md={6} lg={5}>
                  <Grid xs={12}>
                    <AccountProfile
                      setIsChanged={setIsChanged}
                      member={member}
                      setMember={setMember}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <AccountPassword member={member} />
                  </Grid>
                </Grid>
                <Grid xs={12} md={6} lg={7}>
                  <AccountProfileDetails
                    isChanged={isChanged}
                    setIsChanged={setIsChanged}
                    isLoading={isLoading}
                    member={member}
                    setMember={setMember}
                    handleSubmit={handleSubmit}
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

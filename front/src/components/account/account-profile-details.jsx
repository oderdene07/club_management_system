import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
} from "@mui/material";
import { useCallback } from "react";

export const AccountProfileDetails = ({
  isLoading,
  isChanged,
  setIsChanged,
  member,
  setMember,
  handleSubmit,
}) => {
  const handleChange = (event) => {
    setMember((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setIsChanged(true);
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="first_name"
                  onChange={handleChange}
                  required
                  value={member.first_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="last_name"
                  onChange={handleChange}
                  required
                  value={member.last_name}
                />
              </Grid>
              <Grid xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={member.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  onChange={handleChange}
                  type="number"
                  value={member.phone_number}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  onChange={handleChange}
                  value={member.occupation}
                />
              </Grid>
              <Grid xs={12} md={8}>
                <TextField
                  multiline
                  maxRows={4}
                  fullWidth
                  label="Description"
                  name="profile_description"
                  onChange={handleChange}
                  value={member.profile_description}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider sx={{ borderColor: "primary.light" }} />
        <CardActions sx={{ py: 2, px: 3, justifyContent: "flex-end" }}>
          <Button
            disabled={!isChanged}
            startIcon={<CheckBadgeIcon width={24} />}
            onClick={handleSubmit}
            variant="contained"
          >
            {isLoading ? "Saving ..." : "Save details"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

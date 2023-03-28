import { useAuth } from "@/contexts/auth-context";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const AccountProfile = () => {
  const { user } = useAuth();
  const [values, setValues] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    occupation: user.occupation,
    date_joined: user.date_joined,
    profile_picture: user.profile_picture,
    profile_description: user.profile_description,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setValues((prevState) => ({
        ...prevState,
        profile_picture: reader.result,
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={values.profile_picture}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h6">
            {values.first_name} {values.last_name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {values.occupation}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {values.profile_description}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="contained" component="label">
          Change profile picture
          <input hidden accept="image/*" type="file" onChange={handleImageChange} />
        </Button>
      </CardActions>
    </Card>
  );
};

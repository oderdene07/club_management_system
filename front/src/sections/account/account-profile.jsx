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

const user = {
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@gmail.com",
  phone_number: "99887744",
  occupation: "Software Engineer",
  date_joined: "2023-03-20T00:00:00Z",
  profile_picture: "/assets/avatars/avatar-anika-visser.png",
  profile_description: "I am a software engineer",
};

export const AccountProfile = () => (
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
          src={user.profile_picture}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        />
        <Typography gutterBottom variant="h6">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.occupation}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.profile_description}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        Change profile picture
      </Button>
    </CardActions>
  </Card>
);

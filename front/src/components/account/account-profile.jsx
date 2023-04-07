import { apiClient } from "@/api/apiClient";
import { getInitials } from "@/utils/get-initials";
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

export const AccountProfile = ({ member, setMember }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    apiClient
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setMember((prevState) => ({
          ...prevState,
          profile_picture: res.data,
        }));
      });
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
            src={member.profile_picture && member.profile_picture}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
              fontSize: "1.5rem",
            }}
          >
            {getInitials(member.first_name + " " + member.last_name)}
          </Avatar>
          <Typography gutterBottom variant="h6">
            {member.first_name} {member.last_name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {member.occupation}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {member.profile_description}
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

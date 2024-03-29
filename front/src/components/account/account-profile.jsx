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

export const AccountProfile = ({ member, setMember, setIsChanged }) => {
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const res = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setMember((prevState) => ({
      ...prevState,
      profile_picture: res.data,
    }));
    setIsChanged(true);
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
            src={member.profile_picture && process.env.NEXT_PUBLIC_API_URL + member.profile_picture}
            sx={{
              height: 100,
              mb: 2,
              width: 100,
              fontSize: "1.5rem",
            }}
          >
            {getInitials(member.first_name + " " + member.last_name)}
          </Avatar>
          <Typography gutterBottom variant="h5">
            {member.first_name} {member.last_name}
          </Typography>
          <Typography color="text.secondary" variant="body1">
            {member.occupation}
          </Typography>
          <Typography color="text.secondary" variant="body1">
            {member.profile_description}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="outlined" component="label">
          Change profile picture
          <input hidden accept="image/*" type="file" onChange={handleImageChange} />
        </Button>
      </CardActions>
    </Card>
  );
};

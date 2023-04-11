import { useAuth } from "@/contexts/auth-context";
import { getInitials } from "@/utils/get-initials";
import { Avatar, Card, Stack, Typography } from "@mui/material";

const dateFormat = (seconds) => {
  const date = new Date(seconds * 1000);
  if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const ChatMessage = ({ message }) => {
  const { user } = useAuth();

  return message?.member?.id === user?.id ? (
    <Stack direction="row" justifyContent="flex-end" mb={2} px={2}>
      <Stack spacing={0.5} mr={2} alignItems="flex-end">
        <Card sx={{ paddingY: 1.5, paddingX: 2, bgcolor: "primary.main", color: "neutral.100" }}>
          <Typography variant="subtitle1">
            {message?.member?.firstName + " " + message?.member?.lastName}
          </Typography>
          <Typography mt={1} variant="body1">
            {message?.message}
          </Typography>
        </Card>
        <Typography color="neutral.500" pr={2} variant="body2">
          {dateFormat(message?.createdAt?.seconds)}
        </Typography>
      </Stack>
      <Avatar src={message?.member?.avatar} sx={{ width: 40, height: 40, fontSize: 16 }}>
        {getInitials(user.firstName + " " + user.lastName)}
      </Avatar>
    </Stack>
  ) : (
    <Stack direction="row" mb={2} px={2}>
      <Avatar src={message?.member?.avatar} sx={{ width: 40, height: 40, fontSize: 16 }}>
        {getInitials(user.firstName + " " + user.lastName)}
      </Avatar>
      <Stack spacing={0.5} ml={2}>
        <Card sx={{ paddingY: 1.5, paddingX: 2 }}>
          <Typography variant="subtitle1">
            {message?.member?.firstName + " " + message?.member?.lastName}
          </Typography>
          <Typography mt={1} variant="body1">
            {message?.message}
          </Typography>
        </Card>
        <Typography color="neutral.500" pl={2} variant="body2">
          {dateFormat(message?.createdAt?.seconds)}
        </Typography>
      </Stack>
    </Stack>
  );
};

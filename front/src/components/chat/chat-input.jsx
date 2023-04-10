import { useAuth } from "@/contexts/auth-context";
import db from "@/firebase/config";
import { getInitials } from "@/utils/get-initials";
import { addDoc, collection } from "@firebase/firestore";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Avatar, Box, Button, OutlinedInput, Stack } from "@mui/material";
import { useState } from "react";

const SIDE_NAV_WIDTH = 280;

const addMessage = async (user, message) => {
  const createdAt = new Date();
  const newMessage = {
    message,
    createdAt,
    member: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: process.env.NEXT_PUBLIC_API_URL + user.profile_picture,
    },
  };
  console.log(newMessage);
  const docRef = await addDoc(collection(db, "chat"), newMessage);
  console.log("Document written with ID: ", docRef.id);
};

export const ChatInput = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSend = () => {
    addMessage(user, message);
    setMessage("");
  };

  return (
    <Box
      sx={{
        position: "sticky",
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        bottom: 0,
        right: 0,
        bgcolor: "neutral.50",
        p: 2,
        borderTop: "1px solid",
        borderColor: "neutral.200",
      }}
    >
      <Stack direction="row" alignItems="center">
        <Avatar
          src={user.profile_picture && process.env.NEXT_PUBLIC_API_URL + user.profile_picture}
          sx={{
            height: 48,
            width: 48,
            fontSize: "1.2rem",
          }}
        >
          {getInitials(user.first_name + " " + user.last_name)}
        </Avatar>
        <Stack flex={1} mx={3}>
          <OutlinedInput
            fullWidth
            multiline
            maxRows={5}
            placeholder="Leave a message"
            type="text"
            value={message}
            onChange={handleChange}
          />
        </Stack>
        <Button onClick={handleSend} variant="contained" endIcon={<PaperAirplaneIcon width={24} />}>
          Send
        </Button>
      </Stack>
    </Box>
  );
};
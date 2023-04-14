import db from "@/firebase/config";
import { collection, limit, onSnapshot, orderBy, query } from "@firebase/firestore";
import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";

export const ChatBox = () => {
  const [messages, setMessages] = useState([]);

  const unsubscribe = () => {
    const q = query(collection(db, "chat"), orderBy("createdAt", "desc"), limit(10));
    onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc);
      });
      setMessages(messages.reverse());
    });
  };

  useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <Stack height="calc(100% - 72px)" mt={2}>
      <Stack flex={1}>
        {messages.length !== 0 ? (
          messages.map((message) => <ChatMessage key={message.id} message={message.data()} />)
        ) : (
          <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        )}
      </Stack>
      <Box
        ref={(el) => {
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      ></Box>
      <ChatInput />
    </Stack>
  );
};

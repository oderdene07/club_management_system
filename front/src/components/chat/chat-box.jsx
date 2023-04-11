import db from "@/firebase/config";
import { collection, limit, onSnapshot, orderBy, query } from "@firebase/firestore";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { Box } from "@mui/system";

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
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message.data()} />
        ))}
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

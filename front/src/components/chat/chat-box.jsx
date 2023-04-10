import db from "@/firebase/config";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";

export const ChatBox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chat"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc);
      });
      setMessages(messages);
    });
  }, []);

  return (
    <Stack height="calc(100% - 72px)" mt={2}>
      <Stack flex={1}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message.data()} />
        ))}
      </Stack>
      <ChatInput />
    </Stack>
  );
};

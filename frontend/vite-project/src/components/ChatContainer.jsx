import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { ChatHeader } from "./ChatHeader";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";
import { MessageInput } from "./MessageInput";
import { formatMessageTime } from "../lib/utils";
import { Box, Avatar, Typography } from "@mui/material";

export const ChatContainer = () => {
  const {
    messages,
    getMessage,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessage(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessage,
    subscribeToMessages,
    unsubscribeFromMessages
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto"
        }}
      >
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto"
      }}
    >
      <ChatHeader />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        {messages.map((message) => (
          <Box
            key={message._id}
            sx={{
              display: "flex",
              flexDirection:
                message.senderId === authUser._id ? "row-reverse" : "row",
              alignItems: "flex-start"
            }}
            ref={messageEndRef}
          >
            {/* Avatar */}
            {/* <Avatar
              alt="profile pic"
              src={
                message.senderId === authUser._id
                  ? authUser.profilePic || "/avatar.png"
                  : selectedUser.profilePic || "/avatar.png"
              }
              sx={{ width: 40, height: 40, borderRadius: "50%" }}
            /> */}

            {/* Message Content */}
            <Box
              sx={{
                marginLeft: message.senderId === authUser._id ? 2 : 0,
                marginRight: message.senderId === authUser._id ? 0 : 2
              }}
            >
              {/* Time above the message */}
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: 1 }}
              >
                {formatMessageTime(message.createdAt)}
              </Typography>

              {/* Message Bubble */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center", // Align avatar and text on the same line
                  justifyContent: "center", // Center the message
                  flexDirection:
                    message.senderId === authUser._id ? "row-reverse" : "row", // Adjust layout direction for the sender
                  gap: 2, // Add some space between avatar and message bubble
                  marginBottom: 2 // Add spacing below the message
                }}
              >
                {/* Avatar */}
                <Avatar
                  alt="profile pic"
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover" // Make sure the avatar image covers the space
                  }}
                />

                {/* Message Bubble */}
                <Box
                  sx={{
                    backgroundColor:
                      message.senderId === authUser._id ? "#3F4F44" : "#A27B5C",
                    borderRadius: 2,
                    padding: 1,
                    maxWidth: "80%",
                    display: "flex",
                    color:
                      message.senderId === authUser._id ? "#fff" : "#000",
                    flexDirection: "column", // Stack image and text vertically inside the bubble
                    justifyContent: "center", // Center the content vertically inside the bubble
                    alignItems: "center" // Align the content horizontally inside the bubble
                  }}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      style={{
                        maxWidth: "200px",
                        borderRadius: "8px",
                        marginBottom: "8px" // Space between image and text
                      }}
                    />
                  )}
                  {message.text && (
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      {message.text}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <MessageInput />
    </Box>
  );
};

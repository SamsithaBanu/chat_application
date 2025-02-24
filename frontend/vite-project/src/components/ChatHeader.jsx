import React from 'react';
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { X } from 'lucide-react';

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <Box
      sx={{
        padding: '10px',
        borderBottom: '1px solid #e0e0e0', // Light border color
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left side - Avatar and user info */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          alt={selectedUser.fullName}
          src={selectedUser.profilePic || '/avatar.png'}
          sx={{
            width: 36,
            height: 36,
            position: 'relative',
          }}
        >
          {/* Online status indicator */}
          {onlineUsers.includes(selectedUser._id) && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#4CAF50', // Green color for online
                border: '2px solid #fff',
              }}
            />
          )}
        </Avatar>

        <Box>
          <Typography variant="body1" fontWeight="medium">
            {selectedUser.fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </Typography>
        </Box>
      </Box>

      {/* Close button */}
      <IconButton onClick={() => setSelectedUser(null)} sx={{ padding: 0 }}>
        <X />
      </IconButton>
    </Box>
  );
};

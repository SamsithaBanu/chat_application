import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Box, Typography, IconButton } from '@mui/material';

export const NoContainer = () => {
  return (
    <Box
      className="w-full flex flex-1 flex-col items-center justify-center p-16"
      sx={{
        backgroundColor: 'rgba(241, 245, 249, 0.5)', // Light background with opacity
      }}
    >
      <Box className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <Box display="flex" justifyContent="center" gap={4} mb={4}>
          <Box
            className="relative"
            sx={{
              width: 64,
              height: 64,
              borderRadius: '16px',
              backgroundColor: '#2C3930',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'bounce 1s infinite',
            }}
          >
            <MessageSquare className="w-8 h-8 text-primary" />
          </Box>
        </Box>

        {/* Welcome Text */}
        <Typography variant="h5" fontWeight="bold">
          Welcome to Chatty!
        </Typography>
        <Typography color="textSecondary" paddingTop={'5px'}>
          Select a conversation from the sidebar to start chatting
        </Typography>
      </Box>
    </Box>
  );
};

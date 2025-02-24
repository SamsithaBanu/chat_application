import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { Sidebar } from '../components/Sidebar';
import { NoContainer } from '../components/NoContainer';
import { ChatContainer } from '../components/ChatContainer';
import { Box, Container } from '@mui/material';

export const Homepage = () => {
  const { selectedUser } = useChatStore();

  return (
    <Box sx={{ height: '100vh', backgroundColor: 'background.paper' }}>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', paddingTop: 8, marginTop:'10px' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '1370px',
            height: 'calc(100vh - 6rem)',
            backgroundColor: 'background.default',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: 'flex', height: '100%', borderRadius: 2, overflow: 'hidden' }}>
            <Sidebar />

            {!selectedUser ? <NoContainer /> : <ChatContainer />}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

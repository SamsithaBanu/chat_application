import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { SidebarSkeleton } from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import { Box, Checkbox, FormControlLabel, Typography, List, ListItem, ListItemAvatar, Avatar,ListItemText } from '@mui/material';

export const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <Box
      sx={{
        height: '100%',
        width: { xs: '80px', lg: '280px' },
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        background: 'white'
      }}
    >
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Users size={24} />
          <Typography variant="h6" fontWeight="medium" sx={{ display: { xs: 'none', lg: 'block' } }}>
            Contacts
          </Typography>
        </Box>
        {/* Online filter toggle */}
        <Box display={{ xs: 'none', lg: 'flex' }} alignItems="center" gap={0}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                size="small"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
              />
            }
            label={<Typography variant="body2">Show online only</Typography>}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ({onlineUsers.length - 1} online)
          </Typography>
        </Box>
      </Box>

      {/* Users List */}
      <Box sx={{ overflowY: 'hidden', py: 1 }}>
        <List>
          {filteredUsers.map((user) => (
            <ListItem
            key={user._id}
            button // This is a boolean prop to indicate that the ListItem should behave like a button
            onClick={() => setSelectedUser(user)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 1.5,
              backgroundColor: selectedUser?._id === user._id ? '#3F4F44' : 'transparent',
              '&:hover': { backgroundColor: '#3F4F44' },
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={user.fullName}
                src={user.profilePic || '/avatar.png'}
                sx={{
                  width: 36,
                  height: 36,
                  position: 'relative',
                }}
              >
                {onlineUsers.includes(user._id) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: '#3F4F44',
                      border: '2px solid #fff',
                    }}
                  />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.fullName}
              secondary={onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              sx={{
                display: { xs: 'none', lg: 'block' },
                color: 'text.primary',
              }}
            />
          </ListItem>
          
          ))}
        </List>

        {filteredUsers.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center" py={4}>
            No online users
          </Typography>
        )}
      </Box>
    </Box>
  );
};

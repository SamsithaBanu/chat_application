import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, Settings, User, Menu } from "lucide-react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import { useState } from "react";

export const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#2C3930",
        borderBottom: 1,
        borderColor: "divider",
        boxShadow: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: isMobile ? "0 16px" : "0 60px",
        }}
      >
        {/* Left Side - Logo */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <MessageIcon />
          {!isMobile && (
            <Typography variant="h5" fontWeight="bold">
              Chatty
            </Typography>
          )}
        </Box>

        {/* Mobile Menu Button */}
        {isMobile ? (
          <IconButton onClick={() => setOpenDrawer(true)}>
            <Menu color="#DCD7C9" />
          </IconButton>
        ) : (
          // Desktop Menu
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              display="flex"
              alignItems="center"
              component={Link}
              to="/settings"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton>
                <Settings color="#DCD7C9" />
              </IconButton>
              <Typography fontWeight="400">Settings</Typography>
            </Box>

            {authUser && (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  component={Link}
                  to="/profile"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <IconButton>
                    <User color="#DCD7C9" />
                  </IconButton>
                  <Typography fontWeight="400">Profile</Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={logout}
                  sx={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                >
                  <IconButton>
                    <LogOut color="#DCD7C9" />
                  </IconButton>
                  <Typography fontWeight="400">Logout</Typography>
                </Box>
              </>
            )}
          </Box>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/settings">
              <Settings />
              <ListItemText primary="Settings" sx={{ marginLeft: 1 }} />
            </ListItemButton>
          </ListItem>

          {authUser && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/profile">
                  <User />
                  <ListItemText primary="Profile" sx={{ marginLeft: 1 }} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <LogOut />
                  <ListItemText primary="Logout" sx={{ marginLeft: 1 }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

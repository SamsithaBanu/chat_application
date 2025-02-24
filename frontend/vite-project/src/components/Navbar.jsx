import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";

export const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#2C3930",
        borderBottom: 1,
        borderColor: "divider",
        boxShadow: 2,
        margin: "0 auto", // Center the AppBar
      }}
    >
      {/* Container with expanded width */}
      <div
      style={{padding:'0 60px'}}

      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Side - Logo */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1.5}
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <MessageIcon size={27} />
            <Typography variant="h5" fontWeight="bold">
              Chatty
            </Typography>
          </Box>

          {/* Right Side - Buttons */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              display="flex"
              alignItems="center"
              component={Link}
              to="/settings"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton component={Link} color="#DCD7C9">
                <Settings size={24} color="#DCD7C9" />
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
                  <IconButton component={Link} color="#DCD7C9">
                    <User size={24} color="#DCD7C9" />
                  </IconButton>
                  <Typography fontWeight="400">Profile</Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  component={Link}
                  onClick={logout}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <IconButton component={Link} color="#DCD7C9">
                    <LogOut size={24} color="#DCD7C9" />
                  </IconButton>
                  <Typography fontWeight="400">Logout</Typography>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
};

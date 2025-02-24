import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import {
  Container,
  Grid,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  CircularProgress,
  useMediaQuery
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Mail, Lock, MessageSquare } from "lucide-react";
import { useDimensions } from "../lib/utils";
import { useTheme } from "@mui/material/styles";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const { width } = useDimensions();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Left Side - Form */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ px: isMobile ? 2 : 8 }} // Responsive padding
      >
        <Container maxWidth="sm">
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                bgcolor: "#2C3930",
                p: 1.5,
                borderRadius: 2,
                color: "white",
                display: "inline-flex"
              }}
            >
              <MessageSquare size={28} />
            </Box>

            <Typography variant="h5" fontWeight="600">
              Welcome Back
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Sign in to your account
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                )
              }}
              sx={{
                "& label.Mui-focused": { color: "#2C3930" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#2C3930" },
                  "&:hover fieldset": { borderColor: "#2C3930" },
                  "&.Mui-focused fieldset": { borderColor: "#2C3930" }
                }
              }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                "& label.Mui-focused": { color: "#2C3930" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#2C3930" },
                  "&:hover fieldset": { borderColor: "#2C3930" },
                  "&.Mui-focused fieldset": { borderColor: "#2C3930" }
                }
              }}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                background: "#2C3930",
                height: "50px",
                borderRadius: "5px",
                color: "white",
                "&:hover": { background: "#1E2820" }
              }}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" style={{ color: "#0A5EB0", textDecoration: "none" }}>
              Create account
            </Link>
          </Typography>
        </Container>
      </Grid>

      {/* Right Side - Image/Pattern (Hidden on Small Screens) */}
      {!isMobile && width > 1020 && (
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "#F5F5F5", // Soft background color for contrast
          }}
        >
          <AuthImagePattern
            title="Welcome back!"
            subtitle="Sign in to continue your conversations and catch up with your messages."
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Signin;

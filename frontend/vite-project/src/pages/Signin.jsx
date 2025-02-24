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
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Mail, Lock, MessageSquare } from "lucide-react";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Grid
      container
      component="main"
      lg={{ width: "1200px" }}
      sx={{ height: "100vh" }}
    >
      {/* Left Side - Form */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        paddingLeft={"180px"}
        alignItems="center"
        justifyContent="center"
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

            <Typography
              variant="body2"
              fontSize="1rem"
              letterSpacing="0.03rem"
              paddingTop={"6px"}
              color="text.secondary"
            >
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
                "& label.Mui-focused": { color: "#2C3930" }, // Label color when focused
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#2C3930" }, // Default border color
                  "&:hover fieldset": { borderColor: "#2C3930" }, // Hover effect
                  "&.Mui-focused fieldset": { borderColor: "#2C3930" } // Focused border color
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
                "& label.Mui-focused": { color: "#2C3930" }, // Label color when focused
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#2C3930" }, // Default border color
                  "&:hover fieldset": { borderColor: "#2C3930" }, // Hover effect
                  "&.Mui-focused fieldset": { borderColor: "#2C3930" } // Focused border color
                }
              }}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button
              type="submit"
              variant="#2C3930"
              color=""
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoggingIn}
              style={{
                background: "#2C3930",
                height: "50px",
                borderRadius: "5px",
                color: "white"
              }}
            >
              {isLoggingIn ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={2}
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "#0A5EB0", textDecoration: "none" }}
            >
              Create account
            </Link>
          </Typography>
        </Container>
      </Grid>

      {/* Right Side - Image/Pattern */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <AuthImagePattern
          title={"Welcome back!"}
          subtitle={
            "Sign in to continue your conversations and catch up with your messages."
          }
        />
      </Grid>
    </Grid>
  );
};

export default Signin;

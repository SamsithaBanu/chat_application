import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  useEffect(() => {
    toast("Test toast!");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <Grid container component="main" sx={{ minHeight: "100vh" }} paddingLeft={'150px'}>
      {/* Left Side - Form */}
      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <Container maxWidth="sm">
          {/* <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}> */}
            {/* Logo */}
            <Box textAlign="center" mb={3}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#2C3930",
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                }}
              >
                <MessageSquare size={28} color="white" />
              </Box>
              <Typography variant="h5" fontWeight="bold" mt={2}>
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get started with your free account
              </Typography>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& label.Mui-focused": { color: "#2C3930" }, // Label color when focused
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#2C3930" }, // Default border color
                    "&:hover fieldset": { borderColor: "#2C3930" }, // Hover effect
                    "&.Mui-focused fieldset": { borderColor: "#2C3930" } // Focused border color
                  }
                }}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                // variant="contained"
                // color="primary"
                sx={{ mt: 2, py: 1.2 }}
                disabled={isSigningUp}
                style={{
                  background: "#2C3930",
                  height: "50px",
                  borderRadius: "5px",
                  color: "white"
                }}
              >
                {isSigningUp ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
              </Button>
            </form>

            {/* Sign In Link */}
            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#1976D2", textDecoration: "none" }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          {/* </Paper> */}
        </Container>
      </Grid>

      {/* Right Side - Auth Image Pattern */}
      <Grid item xs={12} md={6} marginTop='30px' sx={{ display: { xs: "none", md: "flex" }, alignItems:"center", justifyContent: "center" }}>
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </Grid>
    </Grid>
  );
};

export default SignUpPage;

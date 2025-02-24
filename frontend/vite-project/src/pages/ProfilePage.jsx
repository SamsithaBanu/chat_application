import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { Box, Typography, Avatar, IconButton, TextField, CircularProgress } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <Box
      sx={{
        height: "100vh",
        pt: { xs: 30, sm: 8, md: 8},
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 500, md: 600 },
          backgroundColor: "background.default",
          borderRadius: 2,
          p: { xs: 5, sm: 4 },
          boxShadow: 3,
        }}
      >
        {/* Profile Heading */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#2C3930" }}>
            Profile Page
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
            Your profile information
          </Typography>
        </Box>

        {/* Avatar Upload */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              sx={{
                width: { xs: 100, sm: 120 },
                height: { xs: 100, sm: 120 },
                border: 4,
                borderColor: "#2C3930",
                objectFit: "cover",
              }}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "background.paper",
                  "&:hover": { backgroundColor: "action.hover" },
                  padding: 1,
                }}
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <CameraAlt sx={{ color: "text.primary" }} />
                )}
              </IconButton>
            </label>
            <input
              type="file"
              id="avatar-upload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </Typography>
        </Box>

        {/* Profile Details */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 1 }}>
              <User sx={{ width: 16, height: 16 }} />
              Full Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={authUser?.fullName || ""}
              disabled
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 1,
                mt: 1,
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 1 }}>
              <Mail sx={{ width: 16, height: 16 }} />
              Email Address
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={authUser?.email || ""}
              disabled
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 1,
                mt: 1,
              }}
            />
          </Box>
        </Box>

        {/* Account Info */}
        <Box sx={{ mt: 4, backgroundColor: "background.default", borderRadius: 2, p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
            Account Information
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
            <Typography variant="body2">Member Since</Typography>
            <Typography variant="body2">{authUser.createdAt?.split("T")[0]}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
            <Typography variant="body2">Account Status</Typography>
            <Typography variant="body2" sx={{ color: "success.main" }}>
              Active
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

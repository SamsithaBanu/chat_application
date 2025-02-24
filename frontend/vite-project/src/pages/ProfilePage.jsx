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
    <Box sx={{ height: '100vh', pt: 8 }}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 4, paddingY: 8 }}>
        <Box sx={{ backgroundColor: 'background.default', borderRadius: 2, padding: 4, spacing: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: '#2C3930' }}>
              Profile Page
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2, marginBottom:2, color:'gray' }}>
              Your profile information
            </Typography>
          </Box>

          {/* Avatar upload section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                sx={{
                  width: 128,
                  height: 128,
                  border: 4,
                  borderColor: '#2C3930',
                  objectFit: 'cover',
                }}
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    padding: 1,
                  }}
                  disabled={isUpdatingProfile}
                >
                  {isUpdatingProfile ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <CameraAlt sx={{ color: 'text.primary' }} />
                  )}
                </IconButton>
              </label>
              <input
                type="file"
                id="avatar-upload"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </Typography>
          </Box>

          {/* Profile details */}
          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
                <User sx={{ width: 16, height: 16 }} />
                Full Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={authUser?.fullName || ""}
                disabled
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 1,
                  marginTop: 1,
                }}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Mail sx={{ width: 16, height: 16 }} />
                Email Address
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={authUser?.email || ""}
                disabled
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 1,
                  marginTop: 1,
                }}
              />
            </Box>
          </Box>

          {/* Account info */}
          <Box sx={{ marginTop: 4, backgroundColor: 'background.default', borderRadius: 2, padding: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 500, marginBottom: 2 }}>
              Account Information
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
              <Typography variant="body2">Member Since</Typography>
              <Typography variant="body2">{authUser.createdAt?.split("T")[0]}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
              <Typography variant="body2">Account Status</Typography>
              <Typography variant="body2" sx={{ color: 'success.main' }}>
                Active
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

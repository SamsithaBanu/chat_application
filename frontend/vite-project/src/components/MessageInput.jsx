import React, { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import { TextField, IconButton, Button, Box, Avatar } from '@mui/material';
import toast from 'react-hot-toast';

export const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    console.log('text', text, imagePreview)

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Box sx={{ padding: 2, width: '100%' }}>
      {imagePreview && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              variant="rounded"
              sx={{
                width: 80,
                height: 80,
                borderRadius: 1,
                border: '1px solid #e0e0e0',
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </Avatar>
            <IconButton
              onClick={removeImage}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 0,
              }}
            >
              <X size={16} />
            </IconButton>
          </Box>
        </Box>
      )}

      <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            
            sx={{
              
              "& label.Mui-focused": { color: "#2C3930" }, // Label color when focused
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#2C3930" }, // Default border color
                "&:hover fieldset": { borderColor: "#2C3930" }, // Hover effect
                "&.Mui-focused fieldset": { borderColor: "#2C3930" } // Focused border color
              }
            }}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          
          <IconButton
            sx={{
              color: imagePreview ? '#4caf50' : '#2c3930',
              display: { xs: 'none', sm: 'flex' },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={27} />
          </IconButton>
        </Box>

        <Button
          type="submit"
          variant=""
          color="#2C3930"
          style={{background:'#fff'}}
          disabled={!text.trim() && !imagePreview}
          sx={{ padding: 2 }}
        >
          <Send size={27} color='#2C3930' />
        </Button>
      </form>
    </Box>
  );
};

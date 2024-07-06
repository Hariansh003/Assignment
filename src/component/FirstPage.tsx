import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Basic validation: Check if fields are empty
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert("Please fill out all fields");
      return;
    }

    // Name validation: Check if name contains only alphabets and spaces
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert("Please enter a valid name (only alphabets and spaces)");
      return;
    }

    // Phone number validation: Check if phone number contains only digits and is exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number (only digits)");
      return;
    }

    // Further validation for email format (optional)
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // If all validations pass, proceed to submit
    localStorage.setItem("userDetails", JSON.stringify({ name, phone, email }));
    navigate("/second");
  };

  const isValidEmail = (email: string) => {
    // Simple email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default App;

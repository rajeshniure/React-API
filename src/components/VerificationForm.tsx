import React, { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { verifyEmailPost } from "../api/productApi";

const VerificationForm = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await verifyEmailPost(email, token);
      setMessage("✅ Verification successful!");
      console.log(res);
    } catch (error: any) {
      console.error("Verification failed:", error);
      setMessage("❌ Verification failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} width={300} margin="auto" mt={4}>
        <Typography variant="h6">Email Verification</Typography>
        <TextField
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Verification Code"
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Verify
        </Button>
        {message && <Typography>{message}</Typography>}
      </Stack>
    </form>
  );
};

export default VerificationForm;

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SignupForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <TextField
        name="username"
        label="Username"
        fullWidth
        margin="normal"
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
      />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default SignupForm;

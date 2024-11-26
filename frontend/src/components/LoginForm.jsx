import React, { useState } from 'react';
import { TextField, Button, Box , Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

       <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          New to App, create an account?{' '}
          <Button variant="text" onClick={() => navigate('/signup')}>
            Signup here
          </Button>
        </Typography>
    </Box>
  );
};

export default LoginForm;

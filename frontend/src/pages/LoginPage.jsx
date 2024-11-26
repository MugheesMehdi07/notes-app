import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
      alert('Login successful!');
      navigate('/notes');
    } catch (error) {
      alert(error);
    }
  };

  return <LoginForm onSubmit={handleLogin} isLoading={loading} />;
};

export default LoginPage;

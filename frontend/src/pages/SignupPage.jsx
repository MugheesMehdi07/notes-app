import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSignup = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await dispatch(signup(formData)).unwrap();
      alert('Signup successful! Please log in.');
    } catch (error) {
      alert(error);
    }
  };

  return <SignupForm onSubmit={handleSignup} isLoading={loading} />;
};

export default SignupPage;

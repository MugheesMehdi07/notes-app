import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NoteDetailPage from './pages/NoteDetailPage';
import {Navigate} from 'react-router-dom';


// PrivateRoute to protect authenticated routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if user is authenticated
  return isAuthenticated ? children : <Navigate to ="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /notes if authenticated, or /login otherwise */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <NotesPage />
            </PrivateRoute>
          }
        />

        {/* Login and Signup routes (public) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <NotesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <PrivateRoute>
              <NoteDetailPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all route: Redirect invalid paths to login */}
        <Route path="*" element= {<Navigate to ="/login" />}/>
      </Routes>
    </Router>
  );
};

export default App;

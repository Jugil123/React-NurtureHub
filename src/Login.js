// Import the necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // State to manage error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/account/login', {
        username,
        password,
      });

      // Handle successful login
      console.log(response);
      console.log(response.data);

      // Check the user type and navigate accordingly
      const userType = response.data;

      if (userType === 1) {
        navigate('/home-recipient');
      } else if (userType === 2) {
        navigate('/home-caregiver');
      } else if (userType === 3) {
        navigate('/dashboard');
      } else if (userType === 0) {
        setError('Invalid Credentials');
      }

    } catch (error) {
      // Handle login failure
      console.error('Login Failed', error.response.data);
      setError('Invalid Credentials');  // Set the error message
      console.log("Error: ", error); // Log the error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Render error message if present */}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
        <nav>
          <Link to="/user-type">Register Here</Link>
        </nav>
      </form>
    </div>
  );
};

export default Login;

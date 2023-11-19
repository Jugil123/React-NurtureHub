import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import "./Login.css";

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
    <div  style={{ textAlign: 'center', margin: '20px' }} className="login">
      <form onSubmit={handleLogin}>
      <input
        style={{paddingLeft: "7px"}}
        className="login-child"
        value={username}
        placeholder=" Username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
      style={{paddingLeft: "7px"}}
        className="login-item"
        value={password}
        placeholder=" Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="username"></div>
      <div className="password"></div>
      <div className="log-in">Log in</div>
      {error && <p className="log-in" style={{  marginTop: '40px', marginLeft: '-23px', color: 'red', fontSize: '22px'}}>{error}</p>} {/* Render error message if present */}
      <div style={{left: "600px"}} className="dont-have-an">Not yet registered?</div>
      <Link style={{left: "745px"}} className="register" to="/user-type">Register Here</Link>
      <button className="button-wrapper" id="Login" type="submit">
        <div className="button">Log in</div>
      </button>
      </form>
    </div>
  );
};

export default Login;

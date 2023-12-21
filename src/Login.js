// Import the necessary dependencies
import { useCallback, useState, useEffect } from "react";
import styles from "./Login.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Initialize the navigate hook
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Login";
  }, []); 
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
  
    if (authToken) {
      try {
        // Attempt to parse the authTokenString
        const authTokenObj = JSON.parse(authToken);
        const userType = authTokenObj?.userType;
  
        if (!authTokenObj) {
          // If the authentication token is still not available, navigate to the login page
          navigate('/login');
        } else {
          // If the authentication token exists, navigate based on user type and pass userObject as state
          if (userType === 1) {
            const userObject = authTokenObj?.userObject;
            navigate('/home-recipient', { state: { userObject } });
          } else if (userType === 2) {
            const userObject = authTokenObj?.userObject;
            navigate('/home-caregiver', { state: { userObject } });
          } else if (userType === 3) {
            const userObject = authTokenObj?.userObject;
            navigate('/dashboard', { state: { userObject } });
          } else {
            // Handle unexpected userType
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error parsing authToken:', error);
        // Handle error if parsing fails, for example, navigate to the login page
        navigate('/login');
      }
    } else {
      // If the authentication token doesn't exist, navigate to the login page
      navigate('/login');
    }
  }, [navigate]);
  
  // Callback function to navigate to registration page
  const onRegisterHereClick = useCallback(() => {
    navigate('/register-recipient');
  }, [navigate]);

  // State variables for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('http://localhost:8080/account/login', {
        username,
        password,
      });
  
      // Log the entire response to inspect its structure
      console.log('Login API Response:', response);
  
      // Check if the response contains the necessary properties || !response.data.userObject
      if (!response.data.userType) {
        console.error('Invalid response from the server:', response.data);
        setError('Incorrect Username or Password');
        return;
      }
  
      // Store the authentication token securely (e.g., in cookies or local storage)
      // Example using localStorage:
      const authTokenString = JSON.stringify(response.data);
      localStorage.setItem('authToken', authTokenString);
  
      // Extract user type and object from the response
      const userType = response.data.userType;
      const userObject = response.data.userObject;
  
      // Navigate based on user type
      if (userType === 1) {
        navigate('/home-recipient', { state: { userObject } });
      } else if (userType === 2) {
        navigate('/home-caregiver', { state: { userObject } });
      } else if (userType === 3) {
        navigate('/dashboard', { state: { userObject } });
      } else {
        setError('Incorrect Username or Password');
      }
  
    } catch (error) {
      // Handle login failure
      console.error('Login Failed', error.response.data);
      setError('Incorrect Username or Password');
      console.log("Error: ", error);
    }
  };

  // JSX for the login form
  return (
    <div className={styles.login}>
      <div className={styles.logIn}>Log in</div>
      {error && <p className={styles.errorMessage} style={{ color: 'red', fontSize: '20px' }}>{error}</p>}
      <input
        className={styles.loginChild}
        value={username}
        placeholder=" Username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.loginItem}
        value={password}
        placeholder=" Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.buttonWrapper} id="Login" type="submit" onClick={handleLogin}>
        <div className={styles.button}>Log in</div>
      </button>
      <div className={styles.notYetRegistered}>Not yet Registered?</div>
      <a className={styles.registerHere} onClick={onRegisterHereClick}>
        Register Here
      </a>
      <div className={styles.nurturehubParent}>
        <div className={styles.nurturehub}>NurtureHub</div>
        <img
          className={styles.nurturehublogo4Icon}
          alt=""
          src="/nurturehublogo-4@2x.png"
        />
      </div>
    </div>
  );
};

export default Login;

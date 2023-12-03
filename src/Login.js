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

      // Handle successful login
      console.log(response.data);

      // Check the user type and navigate accordingly
      const userType = response.data.userType;
      const userObject = response.data.userObject;


      if (userType === 1) {
        navigate('/home-recipient', { state: { userObject } });
      } else if (userType === 2) {
        navigate('/home-caregiver', { state: { userObject } });
      } else if (userType === 3) {
        navigate('/dashboard');
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

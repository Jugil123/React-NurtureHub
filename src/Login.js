import { useCallback, useState } from "react";
import styles from "./Login.module.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const onRegisterHereClick = useCallback(() => {
     navigate('/register-recipient')
  }, []);

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
    <div className={styles.login}>
      <div className={styles.logIn}>Log in</div>
      <input
        className={styles.loginChild}
        value={username}
        placeholder="Username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.loginItem}
        value={password}
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.buttonWrapper} id="Login" type="submit">
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

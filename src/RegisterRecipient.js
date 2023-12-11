import React, { useState, useCallback, useEffect } from 'react';
import styles from './RegisterRecipient.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterRecipient = () => {
  const navigate = useNavigate();

  const onVectorIconClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    document.title = "NurtureHub | Register-recipient";
  }, []); 

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');

  const checkPasswordRequirements = () => {
    let errors = [];

    if (password.length < 8) {
      errors.push('Password should be at least 8 characters');
    }
    if (!/\d/.test(password)) {
      errors.push('Password should contain at least one number');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password should contain at least one lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password should contain at least one uppercase letter');
    }
    if (!/[^a-zA-Z\d\s:]/.test(password)) {
      errors.push('Password should contain at least one special character');
    }

    setPasswordErrors(errors);
    return errors.length === 0;
  }


  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate the password
    if (!checkPasswordRequirements()) {
      return; // Stop the registration process if password validation fails
    }

    const isConfirmed = window.confirm('Are you sure you want to register as Recipient?');

    if (!isConfirmed) {
      return; // Registration canceled by the user
    }
  

    try {
      // Step 1: Register the recipient
      const recipientResponse = await axios.post('http://localhost:8080/recipient/insertRecipient', {
        firstname,
        lastname,
        username,
        password,
        birth_date: birthDate,
        gender,
        contact_info: contactInfo,
        address,
        age,
      });

      // Assuming the recipient registration returns the recipient's ID
      const recipientData = recipientResponse.data;

      // Step 2: Create an account for the recipient
      const accountResponse = await axios.post('http://localhost:8080/account/insertAccount', {
        username,
        password,
        userType: 1, // Assuming usertype 1 corresponds to recipient
      });

      // Handle successful registration and account creation
      console.log('Registration and Account Creation Successful');
      console.log('Recipient Data:', recipientData);
      console.log('Account ID:', accountResponse.data.id);
      navigate('/home-recipient', { state: { userObject: recipientData } });
    } catch (error) {
      // Handle registration or account creation failure
      console.error('Registration or Account Creation Failed', error.response.data);
    }
  };
  


  return (
    <div className={styles.registerrecipient}>
    <div className={styles.headerChild} />
    <div className={styles.nurturehub}>NurtureHub</div>
    <img
      className={styles.nurturehublogo2Icon}
      alt=""
      src="/nurturehublogo-2@2x.png"
    />
      <div className={styles.standingRectangle}></div>
      <input
        className={styles.registerrecipientChild}
        value={firstname}
        placeholder=" Firstname"
        type="text"
        defaultValue={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        className={styles.registerrecipientItem}
        value={lastname}
        placeholder=" Lastname"
        type="text"
        defaultValue={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <input
        className={styles.registerrecipientInner}
        value={username}
        placeholder=" Username"
        type="text"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.rectangleInput}
        value={password}
        placeholder=" Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        onBlur={checkPasswordRequirements}
      />
      <div className={styles.errorText2}>
      {passwordErrors.map((error, index) => (
        <div key={index} className={styles.errorText}>
          {error}
        </div>
      ))}
      </div>

      {/* Other input fields... */}
      <input
        className={styles.registerrecipientChild1}
        value={birthDate}
        placeholder=" BirthDate"
        type="date"
        defaultValue={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
            
      <select
        className={styles.registerrecipientChild2}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="" disabled selected>
          Select Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        className={styles.registerrecipientChild3}
        value={contactInfo}
        placeholder=" Contact Information"
        type="text"
        pattern="^[0-9+\- ]+$"
        defaultValue={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
      />
      <input
        className={styles.registerrecipientChild4}
        value={age}
        placeholder=" Age"
        type="number"
        defaultValue={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        className={styles.registerrecipientChild5}
        value={address}
        placeholder=" Address"
        type="text"
        defaultValue={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className={styles.registerRecipient}>Register Recipient</div>
      <Link to="/" className={styles.vectorIconLink}>
      <img
        className={styles.vectorIcon}
        alt=""
        src="/vector.svg"
        onClick={onVectorIconClick}
      />
      </Link>
      <button className={styles.buttonWrapper} onClick={handleRegister}>
        <div className={styles.button}>Register</div>
      </button>
    </div>
  );
};

export default RegisterRecipient;

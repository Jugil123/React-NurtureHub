import { useCallback, useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./RegisterCaregiver.module.css";

const RegisterCaregiver = () => {
  const onVectorIconClick = useCallback(() => {
    // Please sync "Desktop - 12" to the project
  }, []);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [specializations, setSpecializations] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Register-caregiver";
  },[]);

  function is_valid_password(password) {
    if (password.length < 8) {
      return false;
    }
  
    let hasLowercase = false;
    let hasUppercase = false;
    let hasSpecialChar = false;
  
    for (let char of password) {
      if (char >= 'a' && char <= 'z') {
        hasLowercase = true;
      } else if (char >= 'A' && char <= 'Z') {
        hasUppercase = true;
      } else if ("!@#$%^&*()_-+=<>?/".includes(char)) {
        hasSpecialChar = true;
      }
    }
  
    return hasLowercase && hasUppercase && hasSpecialChar;
  }
  


  const handleRegister = async (e) => {
    e.preventDefault();

    if (!is_valid_password(password)) {
      alert('Password must be at least 8 characters with both lowercase and uppercase letters.');
      return;
    }

    // Show confirmation dialog
  const isConfirmed = window.confirm('Are you sure you want to register as Caregiver?');

  if (!isConfirmed) {
    // User canceled registration
    return;
  }

    try {
      const response = await axios.post('http://localhost:8080/caregiver/insertCaregiver', {
        firstname,
        lastname,
        username,
        password,
        birth_date: birthDate,
        gender,
        contact_information: contactInfo,
        address,
        specializations,
        hourlyRate,
      });

      const accountResponse = await axios.post('http://localhost:8080/account/insertAccount', {
        username,
        password,
        userType: 2, // Assuming usertype 1 corresponds to recipient
      });

      // Handle successful registration (e.g., show success message, redirect, etc.)
      console.log('Registration Successful', response.data);
      navigate('/dashboard');
      
    } catch (error) {
      // Handle registration failure (e.g., show error message)
      console.error('Registration Failed', error.response.data);
    }
  };


  return (
    <div className={styles.registercaregiver}>
    <div className={styles.headerChild} />
    <div className={styles.nurturehub}>NurtureHub</div>
    <img
      className={styles.nurturehublogo2Icon}
      alt=""
      src="/nurturehublogo-2@2x.png"
    />
       <form onSubmit={handleRegister}>
      <input
        className={styles.registercaregiverChild}
        value={firstname}
        placeholder="Firstname"
        type="text"
        defaultValue={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        className={styles.registercaregiverItem}
        value={birthDate}
        placeholder="Birth Date"
        type="date"
        defaultValue={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <select
        className={styles.registercaregiverInner}
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
        className={styles.rectangleInput}
        value={contactInfo}
        placeholder="Contact Information"
        type="text"
        defaultValue={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
      />
      <input
        className={styles.registercaregiverChild1}
        value={address}
        placeholder="Address"
        type="text"
        defaultValue={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className={styles.registercaregiverChild2}
        value={hourlyRate}
        placeholder="Hourly Rate"
        type="number"
        defaultValue={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
      />
      <input
        className={styles.registercaregiverChild4}
        value={specializations}
        placeholder="Specializations"
        type="text"
        defaultValue={specializations}
        onChange={(e) => setSpecializations(e.target.value)}
      />
      <input
        className={styles.registercaregiverChild5}
        value={lastname}
        placeholder="Lastname"
        type="text"
        defaultValue={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      {/* <input
        className={styles.registercaregiverChild6}
        value={lastname}
        placeholder="Lastname"
        type="text"
        defaultValue={lastname}
      /> */}
      <div className={styles.username}>Username</div>
      <input
        className={styles.registercaregiverChild6}
        value={username}
        placeholder="Username"
        type="text"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.registercaregiverChild8}
        value={password}
        placeholder="Password"
        type="password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />
<div className={styles.errorText2}>
<div className={styles.errorText}>
        {password && !is_valid_password(password) && (
          <p>Password must be at least 8 characters with both lowercase and uppercase letters and special characters.</p>
        )}
      </div>
      </div>
      <div className={styles.registerCaregiver}>Register Caregiver</div>
      <button className={styles.buttonWrapper} type="submit">
        <div className={styles.button}>Register</div>
      </button>
      <Link to="/dashboard" className={styles.vectorIconLink}>
        <img
          className={styles.vectorIcon}
          alt=""
          src="/vector.svg"
          onClick={onVectorIconClick}
        />
      </Link>
      </form>
    </div>
  );
};

export default RegisterCaregiver;

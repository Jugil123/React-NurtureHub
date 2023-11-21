import { useCallback, useState } from "react";
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
  const [availability, setAvailability] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();

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
        availability,
        hourlyRate,
      });

      const accountResponse = await axios.post('http://localhost:8080/account/insertAccount', {
        username,
        password,
        userType: 2, // Assuming usertype 1 corresponds to recipient
      });

      // Handle successful registration (e.g., show success message, redirect, etc.)
      console.log('Registration Successful', response.data);
      navigate('/home-caregiver');
      
    } catch (error) {
      // Handle registration failure (e.g., show error message)
      console.error('Registration Failed', error.response.data);
    }
  };


  return (
    <div className={styles.registercaregiver}>
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
        type="text"
        defaultValue={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <input
        className={styles.registercaregiverInner}
        value={gender}
        placeholder="Gender"
        type="text"
        defaultValue={gender}
        onChange={(e) => setGender(e.target.value)}
      />
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
        value={availability}
        placeholder="Availability"
        type="text"
        defaultValue={availability}
        onChange={(e) => setAvailability(e.target.value)}
      />
      <input
        className={styles.registercaregiverChild3}
        value={hourlyRate}
        placeholder="Hourly Rate"
        type="text"
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
      <div className={styles.registerCaregiver}>Register Caregiver</div>
      <button className={styles.buttonWrapper} type="submit">
        <div className={styles.button}>Register</div>
      </button>
      <img
        className={styles.vectorIcon}
        alt=""
        src="/vector.svg"
        onClick={onVectorIconClick}
      />
      </form>
    </div>
  );
};

export default RegisterCaregiver;

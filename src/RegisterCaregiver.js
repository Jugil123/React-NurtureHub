import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterCaregiver = () => {
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
    <div>
      <h2>Register Caregiver</h2>
      <form onSubmit={handleRegister}>
        <label>
          First Name:
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </label>
        <br />
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
        <label>
          Birth Date:
          <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br />
        <label>
          Contact Info:
          <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Specializations:
          <input type="text" value={specializations} onChange={(e) => setSpecializations(e.target.value)} />
        </label>
        <br />
        <label>
          Availability:
          <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} />
        </label>
        <br />
        <label>
          Hourly Rate:
          <input type="text" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterCaregiver;

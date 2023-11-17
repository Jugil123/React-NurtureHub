// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
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
      const recipientId = recipientResponse.data.id;
  
      // Step 2: Create an account for the recipient
      const accountResponse = await axios.post('http://localhost:8080/account/insertAccount', {
        username,
        password,
        userType: 1, // Assuming usertype 1 corresponds to recipient
      });
  
      // Handle successful registration and account creation
      console.log('Registration and Account Creation Successful');
      console.log('Recipient ID:', recipientId);
      console.log('Account ID:', accountResponse.data.id);
      navigate('/home-recipient');
    } catch (error) {
      // Handle registration or account creation failure
      console.error('Registration or Account Creation Failed', error.response.data);
    }
  };
  

  return (
    <div>
      <h2>Register Recipient</h2>
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
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

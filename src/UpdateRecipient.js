import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const UpdateRecipient = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [recipient, setRecipient] = useState({
    firstname: '',
    lastname: '',
    password: '',
    birth_date: '',
    gender: '',
    contact_info: '',
    address: '',
    age: 0,
  });

  useEffect(() => {
    const fetchRecipientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recipient/getRecipientById/${userId}`);
        setRecipient(response.data);
      } catch (error) {
        console.error('Error fetching recipient details', error);
      }
    };

    fetchRecipientDetails();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      if (
        recipient.firstname &&
        recipient.lastname &&
        recipient.password &&
        recipient.birth_date &&
        recipient.gender &&
        recipient.contact_info &&
        recipient.address &&
        recipient.age
      ) {
        // Step 1: Update the recipient
        await axios.put(`http://localhost:8080/recipient/updateRecipient/?rid=${userId}`, recipient);
  
        // Step 2: Update the associated account password
        const accountUpdateResponse = await axios.put(`http://localhost:8080/account/updateAccount/?username=${recipient.username}`, {
          password: recipient.password,
        });
  
        // Check the account update response if needed
        console.log('Account update response:', accountUpdateResponse.data);
  
        // Handle successful update
        navigate('/dashboard'); 
      } else {
        console.error('Incomplete recipient data');
        // Handle incomplete data
      }
    } catch (error) {
      console.error('Error updating recipient', error);
      // Handle update failure
    }
  };
  
  return (
    <div>
      {/* Display input fields with current recipient details */}
      <label>
        First Name:
        <input
          type="text"
          value={recipient.firstname}
          onChange={(e) => setRecipient({ ...recipient, firstname: e.target.value })}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={recipient.lastname}
          onChange={(e) => setRecipient({ ...recipient, lastname: e.target.value })}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={recipient.password}
          onChange={(e) => setRecipient({ ...recipient, password: e.target.value })}
        />
      </label>
      <label>
        Birth Date:
        <input
          type="text"
          value={recipient.birth_date}
          onChange={(e) => setRecipient({ ...recipient, birth_date: e.target.value })}
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          value={recipient.gender}
          onChange={(e) => setRecipient({ ...recipient, gender: e.target.value })}
        />
      </label>
      <label>
        Contact Info:
        <input
          type="text"
          value={recipient.contact_info}
          onChange={(e) => setRecipient({ ...recipient, contact_info: e.target.value })}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={recipient.address}
          onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          value={recipient.age}
          onChange={(e) => setRecipient({ ...recipient, age: e.target.value })}
        />
      </label>
      <button onClick={handleUpdate}>Update Recipient</button>
    </div>
  );
};

export default UpdateRecipient;

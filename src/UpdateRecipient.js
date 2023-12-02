import { useCallback, useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from "./UpdateRecipient.module.css";

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
  const onVectorIconClick = useCallback(() => {
    // Please sync "Desktop - 12" to the project
  }, []);

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

    const userConfirmed = window.confirm("Are you sure you want to update this recipient?");
    if (!userConfirmed) {
      // If the user cancels the update, do nothing
      return;
    }
    
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
    <div className={styles.updaterecipient}>
      <div className={styles.updateRecipient}>Update Recipient</div>
      <input
        className={styles.updaterecipientChild}
        value={recipient.firstname}
        placeholder="Firstname"
        type="text"
        onChange={(e) => setRecipient({ ...recipient, firstname: e.target.value })}
      />
      <input
        className={styles.updaterecipientItem}
        value={recipient.birth_date}
        placeholder="Birth Date"
        type="text"
        onChange={(e) => setRecipient({ ...recipient, birth_date: e.target.value })}
      />
      <input
        className={styles.updaterecipientInner}
        value={recipient.gender}
        placeholder="Gender"
        type="text"
        onChange={(e) => setRecipient({ ...recipient, gender: e.target.value })}
      />
      <input
        className={styles.rectangleInput}
        value={recipient.contact_info}
        placeholder="Contact Information"
        type="text"
        pattern="^[0-9+\- ]+$"
        onChange={(e) => setRecipient({ ...recipient, contact_info: e.target.value })}
      />
      <input
        className={styles.updaterecipientChild1}
        value={recipient.address}
        placeholder="Address"
        type="text"
        onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
      />
      <input
        className={styles.updaterecipientChild2}
        value={recipient.age}
        placeholder="Age"
        type="number"
        onChange={(e) => setRecipient({ ...recipient, age: e.target.value })}
      />
      <input
        className={styles.updaterecipientChild3}
        value={recipient.lastname}
        placeholder="Lastname"
        type="text"
        onChange={(e) => setRecipient({ ...recipient, lastname: e.target.value })}
      />
      <input
        className={styles.updaterecipientChild4}
        value={recipient.password}
        placeholder="Password"
        type="password"
        onChange={(e) => setRecipient({ ...recipient, password: e.target.value })}
      />
      <Link to="/dashboard" className={styles.vectorIconLink}>
      <img
        className={styles.vectorIcon}
        alt=""
        src="/vector.svg"
        onClick={onVectorIconClick}
      />
      </Link>
      <button className={styles.buttonWrapper} onClick={handleUpdate}>
        <div className={styles.button}>Update</div>
      </button>
    </div>
  );
};

export default UpdateRecipient;

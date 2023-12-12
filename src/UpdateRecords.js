import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from "./UpdateRecords.module.css";

const UpdateRecords = () => {
  const navigate = useNavigate();
  const { recipient } = useParams();
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [records, setRecords] = useState({
    allergies: '',
    medical_conditions: '',
    medications: '',
    past_surgeries: '',
    family_history: '',
  });
  const onVectorIconClick = useCallback(() => {
    // Please sync "Desktop - 12" to the project
  }, []);

  useEffect(() => {
    const fetchRecordsDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/record/getRecordByRecipient/${recipient}`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching recipient details', error);
      }
    };

    fetchRecordsDetails();
  }, [recipient]);

  const handleUpdate = async () => {

    const userConfirmed = window.confirm("Are you sure you want to update your medical records?");
    if (!userConfirmed) {
      // If the user cancels the update, do nothing
      return;
    }
    
    try {
      if (
        records.allergies &&
        records.medical_conditions &&
        records.medications &&
        records.past_surgeries &&
        records.family_history
      ) {
        // Step 1: Update the recipient
        await axios.put(`http://localhost:8080/record/updateRecord/?recipient=${recipient}`, records);
  
  
        // Handle successful update
        navigate(-1); 
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
      <div className={styles.updateRecipient}>Update Medical Records</div>
      <input
        className={styles.updaterecipientChild}
        value={records.allergies}
        placeholder="1"
        type="text"
        onChange={(e) => setRecords({ ...records, allergies: e.target.value })}
      />
     

      <input
        className={styles.rectangleInput}
        value={records.past_surgeries}
        placeholder="4"
        type="text"
        onChange={(e) => setRecords({ ...records, past_surgeries: e.target.value })}
      />
      <input
        className={styles.updaterecipientChild1}
        value={records.family_history}
        placeholder="5"
        type="text"
        onChange={(e) => setRecords({ ...records, family_history: e.target.value })}
      />
      <input
        className={styles.updaterecipientChild3}
        value={records.medical_conditions}
        placeholder="2"
        type="text"
        onChange={(e) => setRecords({ ...records, medical_conditions: e.target.value })}
      />
      <input
        className={styles.updaterecipientChild4}
        value={records.medications}
        placeholder="3"
        type="text"
        onChange={(e) => setRecords({ ...records, medications: e.target.value })}
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

export default UpdateRecords;

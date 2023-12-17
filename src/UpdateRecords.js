import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from "./UpdateRecords.module.css";

const UpdateRecord = () => {
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

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // If the authentication token doesn't exist, navigate to the login page
      navigate('/login');
    }
    else {
      const authTokenString = localStorage.getItem('authToken');
      const authToken = JSON.parse(authTokenString);
      const userType = authToken?.userType;
      console.log('adminside: ',userType)
      const userObject = authToken.userObject;

      if (userType === 2) {
        navigate('/home-caregiver', { state: { userObject } });
      }  else {
        
      }
    }  
  }, [navigate]);

  
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
    <div className={styles.updaterecord}>
      <div className={styles.updaterecordChild} />
      <div className={styles.nurturehublogo2Parent}>
        <img
          className={styles.nurturehublogo2Icon}
          alt=""
          src="/nurturehublogo-2@2x.png"
        />
        <div className={styles.nurturehub}>NurtureHub</div>
      </div>
      <div className={styles.updaterecordItem} />
      <div className={styles.updaterecordInner} />
      <div className={styles.textfield4}>
        <input
          className={styles.textfield4Child}
          value={records.family_history}
          placeholder="Family History"
          type="text"
          onChange={(e) => setRecords({ ...records, family_history: e.target.value })}
        />
      </div>
      <div className={styles.updateMedicalRecords}>Update Medical Records</div>
      <button onClick={handleUpdate} className={styles.buttonWrapper}>
        <div className={styles.button}>Update</div>
      </button>
      <img className={styles.x1Icon} alt="" src="/x-1@2x.png" />
      <div className={styles.textfield1}>
        <input
          className={styles.textfield1Child}
          value={records.allergies}
          placeholder="Update Allergies"
          type="text"
          onChange={(e) => setRecords({ ...records, allergies: e.target.value })}
        />
      </div>
      <div className={styles.textfield2}>
        <input
          className={styles.textfield1Child}
          value={records.medical_conditions}
          placeholder="Update Medical Conditions"
          type="text"
          onChange={(e) => setRecords({ ...records, medical_conditions: e.target.value })}
        />
      </div>
      <div className={styles.textfield3}>
        <input
          className={styles.textfield1Child}
          value={records.medications}
          placeholder="Update Medications"
          type="text"
          onChange={(e) => setRecords({ ...records, medications: e.target.value })}
        />
      </div>
      <div className={styles.textfield41}>
        <input
          className={styles.textfield4Child}
          value={records.past_surgeries}
          placeholder="Update Past Surgeries"
          type="text"
          onChange={(e) => setRecords({ ...records, past_surgeries: e.target.value })}
        />
      </div>
    </div>
  );
};

export default UpdateRecord;

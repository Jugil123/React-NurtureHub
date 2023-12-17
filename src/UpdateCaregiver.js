import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./UpdateCaregiver.module.css";
import { Link } from 'react-router-dom';

const UpdateCaregiver = () => {
  const onVectorIconClick = useCallback(() => {
    // Please sync "Desktop - 12" to the project
  }, []);
 
  const navigate = useNavigate();
  const { userId } = useParams();
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [caregiver, setCaregiver] = useState({
    firstname: '',
    lastname: '',
    password: '',
    birth_date: '',
    gender: '',
    contact_information: '',
    address: '',
    specializations: '',
    hourlyRate: 0,
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

      if (userType === 1) {
        navigate('/home-recipient', { state: { userObject } });
      }  else {
        
      }
    }  
  }, [navigate]);

  useEffect(() => {
    const fetchCaregiverDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/caregiver/getCaregiverById/${userId}`);
        setCaregiver(response.data);
      } catch (error) {
        console.error('Error fetching caregiver details', error);
      }
    };

    fetchCaregiverDetails();
  }, [userId]);

  const checkPasswordRequirements = () => {
    let errors = [];

    if (caregiver.password.length < 8) {
      errors.push('Password should be at least 8 characters');
    }
    if (!/\d/.test(caregiver.password)) {
      errors.push('Password should contain at least one number');
    }
    if (!/[a-z]/.test(caregiver.password)) {
      errors.push('Password should contain at least one lowercase letter');
    }
    if (!/[A-Z]/.test(caregiver.password)) {
      errors.push('Password should contain at least one uppercase letter');
    }
    if (!/[^a-zA-Z\d\s:]/.test(caregiver.password)) {
      errors.push('Password should contain at least one special character');
    }

    setPasswordErrors(errors);
    return errors.length === 0;
  }

  const handleUpdate = async () => {

    if (!checkPasswordRequirements()) {
      return; // Stop the registration process if password validation fails
    }

    const userConfirmed = window.confirm("Are you sure you want to update this caregiver?");
    if (!userConfirmed) {
      // If the user cancels the update, do nothing
      return;
    }
    
    try {
      if (
        caregiver.firstname &&
        caregiver.lastname &&
        caregiver.password &&
        caregiver.birth_date &&
        caregiver.gender &&
        caregiver.contact_information &&
        caregiver.address &&
        caregiver.specializations &&
        caregiver.hourlyRate
      ) {
        await axios.put(`http://localhost:8080/caregiver/updateCaregiver/?cid=${userId}`, caregiver);

        const accountUpdateResponse = await axios.put(`http://localhost:8080/account/updateAccount/?username=${caregiver.username}`, {
          password: caregiver.password,
        });

        // Handle successful update
        navigate(-1);
      } else {
        console.error('Incomplete caregiver data');
        // Handle incomplete data
      }
    } catch (error) {
      console.error('Error updating caregiver', error);
      // Handle update failure
    }
  };


  return (
    <div className={styles.updatecaregiver}>
      <input
        className={styles.updatecaregiverChild}
        value={caregiver.firstname}
        placeholder="Firstname"
        type="text"
        onChange={(e) => setCaregiver({ ...caregiver, firstname: e.target.value })}
        
      />
      <input
        className={styles.updatecaregiverItem}
        value={caregiver.birth_date}
        placeholder="Birth Date"
        type="date"
        onChange={(e) => setCaregiver({ ...caregiver, birth_date: e.target.value })}
      />
      <select
  className={styles.updatecaregiverInner}
  value={caregiver.gender}
  onChange={(e) => setCaregiver({ ...caregiver, gender: e.target.value })}
>
  <option value="" disabled selected>
    Select Gender
  </option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>
      <input
        className={styles.rectangleInput}
        value={caregiver.contact_information}
        placeholder="Contact Information"
        type="text"
        pattern="^[0-9+\- ]+$"
        onChange={(e) => setCaregiver({ ...caregiver, contact_information: e.target.value })}
      />
      <input
        className={styles.updatecaregiverChild1}
        value={caregiver.specializations}
        placeholder="Specializations"
        type="text"
        onChange={(e) => setCaregiver({ ...caregiver, specializations: e.target.value })}
      />
      <input
        className={styles.updatecaregiverChild2}
        value={caregiver.address}
        placeholder="Address"
        type="text"
        onChange={(e) => setCaregiver({ ...caregiver, address: e.target.value })}
      />
      {/* <input
        className={styles.updatecaregiverChild3}
       
      /> */}
      <input
        className={styles.updatecaregiverChild4}
        value={caregiver.hourlyRate}
        placeholder="Hourly Rate"
        type="number"
        onChange={(e) => setCaregiver({ ...caregiver, hourlyRate: e.target.value })}
      />
      <input
        className={styles.updatecaregiverChild5}
        value={caregiver.lastname}
        placeholder="Lastname"
        type="text"
        onChange={(e) => setCaregiver({ ...caregiver, lastname: e.target.value })}
      />
      <input
        className={styles.updatecaregiverChild6}
        value={caregiver.password}
        placeholder="Password"
        type="password"
        onChange={(e) => setCaregiver({ ...caregiver, password: e.target.value })}
        onBlur={checkPasswordRequirements}
      />

     <div className={styles.errorText2}>
      {passwordErrors.map((error, index) => (
        <div key={index} className={styles.errorText}>
          {error}
        </div>
      ))}
      </div>

      <div className={styles.updateCaregiver}>Update Caregiver</div>
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

export default UpdateCaregiver;

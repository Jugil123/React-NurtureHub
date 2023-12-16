import React, { useState, useEffect } from 'react';
import styles from './MyProfile.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const location = useLocation();
  const userObject = location.state ? location.state.userObject : null;
  const userType = location.state ? location.state.userType : null;

  const [selectedFile, setSelectedFile] = useState(null);
  const [caregiver, setCaregiver] = useState(null);
  const [recipient, setRecipient] = useState(null);

  console.log('MyProfile - userObject:', userObject);
  console.log('MyProfile - userType:', userType);

 
  

  useEffect(() => {
    // Fetch caregiver details only if userType is 'caregiver'
    if (userType === 'caregiver' && userObject) {
      fetchCaregiverDetails(userObject.caregiverId);
    }
    else if(userType === 'recipient' && userObject){
      fetchRecipientDetails(userObject.recipientId);
    }
  }, [userType, userObject]);

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Profile";
  }, []); 

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // If the authentication token doesn't exist, navigate to the login page
      navigate('/login');
    } 
  }, [navigate]);


  const fetchCaregiverDetails = async (caregiverId) => {
    try {
      const response = await axios.get(`http://localhost:8080/caregiver/getCaregiverById/${caregiverId}`);
      console.log('Caregiver Details123:', response.data);
      setCaregiver(response.data);
    } catch (error) {
      console.error('Error fetching caregiver details:', error);
    }
  };

  const fetchRecipientDetails = async (recipientId) => {
    try {
      const response = await axios.get(`http://localhost:8080/recipient/getRecipientById/${recipientId}`);
      console.log('Recipient Details123:', response.data);
      setRecipient(response.data);
    } catch (error) {
      console.error('Error fetching Recipient details:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateProfilePicture = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    const endpoint =
      userType === 'recipient'
        ? `http://localhost:8080/${userType}/${userType}s/${userObject.recipientId}/profile-picture`
        : `http://localhost:8080/${userType}/${userType}s/${userObject.caregiverId}/profile-picture`;
  
    try {
      await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Profile picture updated successfully');
  
      // Optionally, you can reload the user profile after a successful update
      window.location.reload();
    } catch (error) {
      console.error('Failed to update profile picture', error);
    }
  };

  const handleUpdateFields1 = async () => {
    navigate(`/update-caregiver/${caregiver.caregiverId}`);
   };

   const handleUpdateFields2 = async () => {
    navigate(`/update-recipient/${recipient.recipientId}`);
   };

   return (
    <div className={styles.profileContainer}>
      <div className={styles.profileSection}>
        {userType === 'caregiver' && caregiver && (
          <div className={styles.userProfileSection}>
            <img
              src={caregiver?.profilePicture ? `data:image/png;base64,${caregiver?.profilePicture}` : '/DefaultProfilePicture.webp'}
              alt="Profile"
              className={styles.userProfilePicture}
            />
            <div className={styles.userName}>
              <h2>{`${caregiver.firstname} ${caregiver.lastname}`}</h2>
            </div>
            <div className={styles.fileInputContainer}>
              <label className={styles.customFileInputLabel} htmlFor="profilePictureInput">
                Update Profile Picture
              </label>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.customFileInput}
              />
              {selectedFile && <span className={styles.fileName}>{selectedFile.name}</span>}
            </div>
            <br />
            {selectedFile && (
            <button className={styles.buttonprofile} onClick={handleUpdateProfilePicture}>
              Update
            </button>
          )}
          </div>
        )}
  
        {userType === 'recipient' && recipient && (
          <div className={styles.userProfileSection}>
            <img
              src={recipient?.profilePicture ? `data:image/png;base64,${recipient?.profilePicture}` : '/DefaultProfilePicture.webp'}
              alt="Profile"
              className={styles.userProfilePicture}
            />
            <div className={styles.userName}>
              <h2>{`${recipient.firstname} ${recipient.lastname}`}</h2>
            </div>
            <div className={styles.fileInputContainer}>
              <label className={styles.customFileInputLabel} htmlFor="profilePictureInput">
                Update Profile Picture
              </label>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.customFileInput}
              />
              {selectedFile && <span className={styles.fileName}>{selectedFile.name}</span>}
            </div>
            <br />
            {selectedFile && (
            <button className={styles.buttonprofile} onClick={handleUpdateProfilePicture}>
              Update
            </button>
          )}
          </div>
        )}
  
        <div className={styles.profileDetails}>
          {userType === 'caregiver' && caregiver && (
            <>
              <p><strong>Username:</strong> {caregiver.username}</p>
              <p><strong>Password:</strong> {caregiver.password}</p>
              <p><strong>Birth Date:</strong> {caregiver.birth_date}</p>
              <p><strong>Gender:</strong> {caregiver.gender}</p>
              <p><strong>Contact Information:</strong> {caregiver.contact_information}</p>
              <p><strong>Address:</strong> {caregiver.address}</p>
              <p><strong>Specializations:</strong> {caregiver.specializations}</p>
              <p><strong>Hourly Rate:</strong> {caregiver.hourlyRate}</p>
              <div className={styles.buttonContainerfields}>
            <button className={styles.buttonprofile} onClick={handleUpdateFields1}>
              Update Fields
            </button>
          </div>
            </>
          )}
  
          {userType === 'recipient' && recipient && (
            <>
              <p><strong>Username:</strong> {recipient.username}</p>
              <p><strong>Password:</strong> {recipient.password}</p>
              <p><strong>Birth Date:</strong> {recipient.birth_date}</p>
              <p><strong>Gender:</strong> {recipient.gender}</p>
              <p><strong>Contact Information:</strong> {recipient.contact_info}</p>
              <p><strong>Address:</strong> {recipient.address}</p>
              <p><strong>Age:</strong> {recipient.age}</p>
              <div className={styles.buttonContainerfields}>
            <button className={styles.buttonprofile} onClick={handleUpdateFields2}>
              Update Fields
            </button>
          </div>
            </>
          )}
  
         
        </div>
      </div>
    </div>
  );
  
  
};

export default MyProfile;
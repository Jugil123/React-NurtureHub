import React, { useState, useEffect } from 'react';
import styles from './MyProfile.module.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MyProfile = () => {
  const location = useLocation();
  const userObject = location.state ? location.state.userObject : null;
  const userType = location.state ? location.state.userType : null;

  const [selectedFile, setSelectedFile] = useState(null);
  const [caregiver, setCaregiver] = useState(null);

  console.log('MyProfile - userObject:', userObject);
  console.log('MyProfile - userType:', userType);

  useEffect(() => {
    // Fetch caregiver details only if userType is 'caregiver'
    if (userType === 'caregiver' && userObject) {
      fetchCaregiverDetails(userObject.caregiverId);
    }
  }, [userType, userObject]);

  const fetchCaregiverDetails = async (caregiverId) => {
    try {
      const response = await axios.get(`http://localhost:8080/caregiver/getCaregiverById/${caregiverId}`);
      console.log('Caregiver Details123:', response.data);
      setCaregiver(response.data);
    } catch (error) {
      console.error('Error fetching caregiver details:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateProfilePicture = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await axios.post(`http://localhost:8080/${userType}/${userType}s/${userObject.caregiverId}/profile-picture`, formData, {
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

  return (
    <div className={styles.myProfileContainer}>
     
      {userType === 'caregiver' && caregiver && (
        <div>
            {caregiver?.profilePicture ? (
              <img
                src={`data:image/png;base64,${caregiver?.profilePicture}`}
                alt="Profile"
                className={styles.userProfilePicture}
              />
            ) : (
              <img
                src="/DefaultProfilePicture.webp"
                alt="Profile"
                className={styles.userProfilePicture}
              />
            )}
        <p className={styles.profileInfo}>{`Name: ${caregiver.firstname} ${caregiver.lastname}`}</p>
        <p className={styles.profileInfo}>{`Address: ${caregiver.address}`}</p>
        <p className={styles.profileInfo}>{`Specialization: ${caregiver.specializations}`}</p>
        {/* Add other attributes here */}      
          </div>
        )}
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpdateProfilePicture}>Update Profile Picture</button>
    </div>
  );
};

export default MyProfile;

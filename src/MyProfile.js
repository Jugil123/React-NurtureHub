import React from 'react';
import styles from './MyProfile.module.css'; // Create a new CSS module for MyProfile if needed
import { useLocation } from 'react-router-dom';

const MyProfile = () => {
  const location = useLocation();
  const userObject = location.state ? location.state.userObject : null;

  console.log('MyProfile - userObject:', userObject); // Add this line

  if (!userObject) {
    // If userObject is not available, you can handle the loading state or redirect
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.myProfileContainer}>
      <img src={userObject.profilePicture} alt="Profile" className={styles.profilePicture} />
      <div>
        <p className={styles.profileInfo}>{`Name: ${userObject.firstname} ${userObject.lastname}`}</p>
        <p className={styles.profileInfo}>{`Address: ${userObject.address}`}</p>
        <p className={styles.profileInfo}>{`Age: ${userObject.age}`}</p>
        {/* Add other attributes here */}
      </div>
    </div>
  );
};

export default MyProfile;

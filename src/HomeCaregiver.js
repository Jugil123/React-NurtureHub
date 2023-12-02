import React, { useState, useEffect } from 'react';
import styles from './HomeCaregiver.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    // Perform any initial setup using userObject if needed
    console.log('userObject:', userObject);
  }, [userObject]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigateToMyProfile = () => {
    navigate('/my-profile', { state: { userObject } });
  };

  const navigateToMessageCaregiver = () => {
    navigate('/message-caregiver', { state: { userObject } });
  };

  const navigateToHistoryCaregiver= () => {
    navigate('/history-caregiver', { state: { userObject } });
  };

  const navigateToHomeCaregiver = () => {
    navigate('/home-caregiver', { state: { userObject } });
  };


  return (
    <div className={styles.homeContainer}>
      <div className={styles.navColumn}>
        <div className={styles.logoContainer}>
          <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
        </div>
        <div onClick={navigateToMyProfile} className={styles.userProfileContainer}>
          <img src="/sample.png" alt="Profile" className={styles.userProfilePicture} />
          <div>
            {userObject ? (
              <p className={styles.userProfileInfo}>{`${userObject.firstname} ${userObject.lastname}`}</p>
            ) : (
              <p className={styles.userProfileInfo}>Firstname Lastname</p>
            )}
          </div>
        </div>
        <div>
          <ul className={styles.navLinksContainer}>
            <li>
              <div className={`${styles.navLink} ${styles.activeNavLink}`} onClick={navigateToHomeCaregiver}>
                <img src="/home-icon.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Home
              </div>
            </li>
            <li>
              <div
                className={styles.navLink}
                onClick={navigateToMessageCaregiver}
              >
                <img src="/messages-icon.svg" alt="Messages" className={styles.navIcon} /> Messages
              </div>
            </li>
            <li>
              <div className={styles.navLink}  onClick={navigateToHistoryCaregiver}>
                <img src="/history-icon.svg" alt="Records" className={styles.navIcon} /> History
              </div>
            </li>
            <li>
              <a href="/login" className={styles.navLink}>
                <img src="/logout-icon.svg" alt="Logout" className={styles.navIcon} /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.contentColumn}>
        <p>Booking Requests</p>
      </div>
    </div>
  );
};

export default Home;

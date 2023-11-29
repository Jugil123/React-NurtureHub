import React, { useState, useEffect } from 'react';
import styles from './HomeRecipient.module.css';
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

  const handleSearch = async () => {
    setSearchResults([]);
    console.log('Search Term:', searchTerm);
    try {
      // Make an HTTP GET request to the backend API with the search term
      const response = await axios.get(`http://localhost:8080/caregiver/searchCaregiver?searchString=${searchTerm}`);
      setSearchResults(response.data); // Update search results with the data from the backend
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigateToMyProfile = () => {
    navigate('/my-profile', { state: { userObject } });
  };

  const navigateToViewCaregiver = (userId) => {
    navigate(`/view-caregiver/${userId}`, { state: { userObject } });
  };

  const navigateToMessageRecipient = () => {
    navigate('/message-recipient', { state: { userObject } });
  };

  const navigateToRecordsRecipient = () => {
    navigate('/records-recipient', { state: { userObject } });
  };

  const navigateToHomeRecipient = () => {
    navigate('/home-recipient', { state: { userObject } });
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
              <p className={styles.userProfileInfo}>Loading...</p>
            )}
          </div>
        </div>
        <div>
        <ul className={styles.navLinksContainer}>
            <li>
              <div className={styles.navLink} onClick={navigateToHomeRecipient}>
                <img src="/home-icon.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Home
              </div>
            </li>
            <li>
              <div
                className={styles.navLink}
                onClick={navigateToMessageRecipient}
              >
                <img src="/messages-icon.svg" alt="Messages" className={styles.navIcon} /> Messages
              </div>
            </li>
            <li>
              <div className={`${styles.navLink} ${styles.activeNavLink}`}  onClick={navigateToRecordsRecipient}>
                <img src="/records-icon.svg" alt="Records" className={styles.navIcon} /> Records
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
        <h2>Medical Records</h2>
      </div>
    </div>
  );
};

export default Home;

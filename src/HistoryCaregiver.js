import React, { useState, useEffect } from 'react';
import styles from './HomeCaregiver.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState(null);
  const userType = location.state ? location.state.userType : null;

  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

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

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigateToMyProfile = () => {
    navigate('/my-profile', { state: { userObject, userType: 'caregiver' } });
  };

  const navigateToMessageCaregiver = () => {
    navigate('/message-caregiver', { state: { userObject, userType: 'caregiver' } });
  };

  const navigateToHistoryCaregiver= () => {
    navigate('/history-caregiver', { state: { userObject, userType: 'caregiver' } });
  };

  const navigateToHomeCaregiver = () => {
    navigate('/home-caregiver', { state: { userObject, userType: 'caregiver' } });
  };


  return (
    <div className={styles.homeContainer}>
      {userType === 'caregiver' && caregiver && (
      <div className={styles.navColumn}>
        <div className={styles.logoContainer}>
          <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
        </div>
        <div onClick={navigateToMyProfile} className={styles.userProfileContainer}>
        {caregiver.profilePicture ? (
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
          <div>
            {userObject ? (
              <p className={styles.userProfileInfo}>{`${caregiver.firstname} ${caregiver.lastname}`}</p>
            ) : (
              <p className={styles.userProfileInfo}>Firstname Lastname</p>
            )}
          </div>
        </div>
        <div>
          <ul className={styles.navLinksContainer}>
            <li>
              <div className={styles.navLink} onClick={navigateToHomeCaregiver}>
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
              <div className={`${styles.navLink} ${styles.activeNavLink}`}  onClick={navigateToHistoryCaregiver}>
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
      )}
      <div className={styles.contentColumn}>
        <p>History</p>
      </div>
    </div>
  );
};

export default Home;

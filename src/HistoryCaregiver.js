import React, { useState, useEffect } from 'react';
import styles from './HistoryCaregiver.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Make sure to import useTheme from the correct location

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [caregiver, setCaregiver] = useState(null);
  const [serviceHistory, setServiceHistory] = useState([]);
  const userType = location.state ? location.state.userType : null;
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();useEffect(() => {
    document.title = "NurtureHub | History-caregiver";
  },[]);


  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    if (caregiver) {
      fetchServiceHistory(caregiver.username);
    }
  }, [caregiver]);

  const fetchServiceHistory = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/serviceHistory/getAllServiceHistory/${username}`);
      console.log('Service History:', response.data);
      setServiceHistory(response.data);
    } catch (error) {
      console.error('Error fetching service history:', error);
    }
  };

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
    <div className={`${styles.homeContainer} ${theme === 'dark' ? styles.dark : ''}`}>
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
                <img src="/history-icon2.svg" alt="Records" className={styles.navIcon} /> History
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
      <div className={`${styles.contentColumn} ${theme === 'dark' ? styles.darkContentColumn : ''}`}>
      <p className={`${styles.sectionTitle} ${theme === 'dark' ? styles.whiteText : ''}`}>History</p>
        {serviceHistory.length > 0 ? (
          <ul className={`${styles.historyList} ${theme === 'dark' ? styles.darkHistoryList : ''}`}>
            {serviceHistory.map((historyItem) => (
              <li key={historyItem.id} className={`${styles.historyItem} ${theme === 'dark' ? styles.darkHistoryItem : ''}`}>
                {/* Display relevant information from service history */}
                <p>{`Recipient: ${historyItem.recipient}`}</p>
                <p>{`Service Date: ${historyItem.start_date} - ${historyItem.end_date}`}</p>
                <p>{`Service Time: ${historyItem.start_time} - ${historyItem.end_time}`}</p>
                
                {/* Add more information as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p className={`${styles.noHistory} ${theme === 'dark' ? styles.whiteText : ''}`}>No service history available.</p>
        )}
      </div>


    </div>
  );
};

export default Home;

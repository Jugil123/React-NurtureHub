// ViewCaregiver.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ViewCaregiver.module.css'; // Import styles for ViewCaregiver

const ViewCaregiver = () => {
  const location = useLocation();
  const { userId } = useParams();
  const [caregiver, setCaregiver] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // New state variable
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const userObject = location.state ? location.state.userObject : null;

  const handleSearch = async () => {
    setSearchResults([]);
    console.log('Search Term:', searchTerm);
    try {
      const response = await axios.get(`http://localhost:8080/caregiver/searchCaregiver?searchString=${searchTerm}`);
      setSearchResults(response.data);
      setShowSearchResults(true); // Set showSearchResults to true after fetching search results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/caregiver/getCaregiverById/${userId}`);
        setCaregiver(response.data);
      } catch (error) {
        console.error('Error fetching caregiver details:', error);
      }
    };

    fetchCaregiver();
  }, [userId]);

  if (!caregiver) {
    return <p>Loading...</p>;
  }

  const navigateToMyProfile = () => {
    navigate('/my-profile', { state: { userObject } });
  };

  const navigateToViewCaregiver = (userId) => {
    navigate(`/view-caregiver/${userId}`, { state: { userObject } });
  };

  const handleSendMessage = () => {
    console.log('Sending a message to the caregiver');
  };

  const handleShowFeedbacks = () => {
    console.log('Showing feedbacks for the caregiver');
  };

  const handleBookCaregiver = () => {
    navigate(`/book-caregiver/${userId}`, { state: { userObject, caregiver } });
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
              <div className={`${styles.navLink} ${styles.activeNavLink}`} onClick={navigateToHomeRecipient}>
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
              <div className={styles.navLink}  onClick={navigateToRecordsRecipient}>
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
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search users..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <img src="/search-icon.svg" alt="Search" className={styles.searchIcon} />
          </button>
        </div>
        {showSearchResults ? (
          searchResults.map((user) => (
            <div
              key={user.id}
              className={styles.userProfileContainer}
              onClick={() => setShowSearchResults((prev) => {
                navigateToViewCaregiver(user.caregiverId);
                return false; // Set showSearchResults to false when clicking on a search result
              })}
            >
              <img src={user.profilePicture} alt="Profile" className={styles.userProfilePicture} />
              <div>
                <p className={styles.userProfileInfo}>{`${user.firstname} ${user.lastname}`}</p>
                <p className={styles.userProfileInfo}>{`Address: ${user.address}`}</p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.viewCaregiverContainer}>
            <div className={styles.caregiverDetailsColumn}>
              <div className={styles.caregiverDetails}>
                <h2 className={styles.caregiverName}>{`${caregiver.firstname} ${caregiver.lastname}`}</h2>
                <p className={styles.caregiverAddress}>{`Address: ${caregiver.address}`}</p>
                <div className={styles.caregiverInfo}>
                  <p>{`Contact Information: ${caregiver.contact_information}`}</p>
                  <p>{`Birthdate: ${caregiver.birth_date}`}</p>
                  <p>{`Specializations: ${caregiver.specializations}`}</p>
                  <p>{`Available: ${caregiver.availability}`}</p>
                  <p>{`Hourly Rate: ${caregiver.hourlyRate}`}</p>
                </div>
                <div className={styles.userProfileContainerButtons}>
                  <button onClick={handleSendMessage}>Message</button>
                  <button onClick={handleShowFeedbacks}>Show Feedbacks</button>
                  <button onClick={handleBookCaregiver}>Book</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCaregiver;
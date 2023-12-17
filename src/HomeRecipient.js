import React, { useState, useEffect } from 'react';
import styles from './HomeRecipient.module.css';
import { useTheme } from './ThemeContext'; // Adjust the import path as necessary
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipient, setRecipient] = useState(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme(); // Using useTheme hook
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Home";
  }, []); 


  // const toggleTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  //   localStorage.setItem('theme', newTheme);
  // };
  // useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);

  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    // Check if the 'authToken' key exists in localStorage
    if (!localStorage.hasOwnProperty('authToken')) {
      // If the authentication token doesn't exist, navigate to the login page
      navigate('/login');
      return; // Exit the useEffect to prevent further execution
    }
  
    // Retrieve the authTokenString from localStorage
    const authTokenString = localStorage.getItem('authToken');
    console.log('Auth Token String:', authTokenString);
  
    try {
      // Attempt to parse the authTokenString
      const authToken = JSON.parse(authTokenString);
      const userType = authToken?.userType;
      console.log("User Type2:", userType);
  
      if (!authToken) {
        // If the authentication token is still not available, navigate to the login page
        navigate('/login');
      } else {
        // If the authentication token exists, perform any initial setup using userObject if needed

        const userType = authToken.userType;
        const userObject = authToken.userObject;
      console.log("User Type123:", userObject);


      if (userType === 1) {
        // If the user is a recipient, perform any initial setup using userObject if needed
        if (userObject) {
          fetchRecipientDetails(userObject.recipientId);
        }
      } else if (userType === 2) {
        // Handle other user types if needed
        navigate('/home-caregiver', { state: { userObject } });
      } else {
        navigate('/dashboard', { state: { userObject } });
      }

      }
    } catch (error) {
      console.error('Error parsing authToken:', error);
      // Handle error if parsing fails, for example, navigate to the login page
      navigate('/login');
    }
  }, [userObject, navigate]);
  

  const fetchRecipientDetails = async (recipientId) => {
    try {
      const response = await axios.get(`http://localhost:8080/recipient/getRecipientById/${recipientId}`);
      console.log('Recipient Details:', response.data);

      setRecipient(response.data);
    } catch (error) {
      console.error('Error fetching Recipient details:', error);
    }
  };

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
  const handleLogout = () => {
    // Implement logout functionality, e.g., clear tokens
    localStorage.removeItem('authToken');
    // Then navigate to the login page
    navigate('/login');
  };

  const navigateToMyProfile = () => {
    navigate('/my-profile', { state: { userObject, userType: 'recipient' } });
  };

  const navigateToViewCaregiver = (userId) => {
    navigate(`/view-caregiver/${userId}`, { state: { userObject, userType: 'recipient' } });
  };

  const navigateToMessageRecipient = () => {
    navigate('/message-recipient', { state: { userObject, userType: 'recipient' } });
  };

  const navigateToRecordsRecipient = () => {
    navigate('/records-recipient', { state: { userObject, userType: 'recipient' } });
  };

  const navigateToHomeRecipient = () => {
    navigate('/home-recipient', { state: { userObject, userType: 'recipient' } });
  };


  return (
    <div className={`${styles.homeContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.navColumn}>
        <div className={styles.logoContainer}>
          <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
        </div>
        <div onClick={navigateToMyProfile} className={styles.userProfileContainer}>
          {recipient?.profilePicture ? (
            <img
              src={`data:image/png;base64,${recipient?.profilePicture}`}
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
              <p className={styles.userProfileInfo}>{`${recipient?.firstname} ${recipient?.lastname}`}</p>
            ) : (
              <p className={styles.userProfileInfo}>Loading...</p>
            )}
          </div>
        </div>
        <ul className={styles.navLinksContainer}>
          <li>
            <div className={`${styles.navLink} ${styles.activeNavLink}`} onClick={navigateToHomeRecipient}>
              <img src="/home-icon2.svg" alt="Home" className={styles.navIcon} /> Home
            </div>
          </li>
          <li>
            <div className={styles.navLink} onClick={navigateToMessageRecipient}>
              <img src="/messages-icon.svg" alt="Messages" className={styles.navIcon} /> Messages
            </div>
          </li>
          <li>
            <div className={styles.navLink} onClick={navigateToRecordsRecipient}>
              <img src="/records-icon.svg" alt="Records" className={styles.navIcon} /> Records
            </div>
          </li>
          <li>
            {/* Using a button for logout to handle the logic within React */}
            <div onClick={handleLogout} className={styles.navLink}>
              <img src="/logout-icon.svg" alt="Logout" className={styles.navIcon} /> Logout
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.contentColumn}>
        {/* Theme toggle button */}
        <button onClick={toggleTheme} className={styles.themeToggleButton}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search caregiver"
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <img src="/search-icon.svg" alt="Search" className={styles.searchIcon} />
          </button>
        </div>
        {searchResults.map((user) => (
          <div
            key={user.id}
            className={styles.userProfileContainer}
            onClick={() => navigateToViewCaregiver(user.caregiverId)}
          >
            {user.profilePicture ? (
              <img
                src={`data:image/png;base64,${user?.profilePicture}`}
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
              <p className={styles.userProfileInfo}>{`${user.firstname} ${user.lastname}`}</p>
              <p className={styles.userProfileInfo}>{`Address: ${user.address}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Home;

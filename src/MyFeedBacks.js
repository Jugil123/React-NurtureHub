// ViewCaregiver.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './CaregiverFeedbacks.module.css'; // Import styles for ViewCaregiver

const MyFeedBacks = () => {
  const location = useLocation();
  const { userId } = useParams();
  const [caregiver, setCaregiver] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // New state variable
  const [searchTerm, setSearchTerm] = useState('');
  const [recipient, setRecipient] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const userType = location.state ? location.state.userType : null;
  const navigate = useNavigate();
  

  const userObject = location.state ? location.state.userObject : null;

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
      } else if (userType === 3) {
        navigate('/dashboard', { state: { userObject } });
      } else {
        
      }
    } 
  }, [navigate]);


  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const caregiverId = 1; // Replace with the actual caregiverId
        const response = await axios.get(`http://localhost:8080/feedback/getFeedBackByCaregiver?caregiverId=${userId}`);
  
        // Assuming response.data is an array of feedbacks
        const feedbacksWithRecipientData = await Promise.all(
          response.data.map(async (feedback) => {
            const recipientResponse = await axios.get(`http://localhost:8080/recipient/getRecipientById/${feedback.recipientId}`);
            return { ...feedback, recipientData: recipientResponse.data };
          })
        );
  
        // Calculate average rating
        const averageRating = feedbacksWithRecipientData.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacksWithRecipientData.length;
  
        setFeedbacks(feedbacksWithRecipientData);
        setAverageRating(averageRating); // Set the average rating state
        console.log('Feedbacks with Recipient Data:', feedbacksWithRecipientData);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
  
    fetchFeedbacks();
  }, []);
  // ... (previous code remains unchanged)

  const handlegetFeedbacks = () => {
    // Use the feedbacks state to display feedbacks in your preferred way
    console.log('Feedbacks:', feedbacks);
    // You may want to navigate to a new page or display feedbacks in a modal, etc.
  };


  useEffect(() => {
    // Fetch recipient details only if userType is 'caregiver'
    if (userType === 'recipient' && userObject) {
      fetchRecipientDetails(userObject.recipientId);
    }
  }, [userType, userObject]);

  const fetchRecipientDetails = async (recipientId) => {
    try {
      const response = await axios.get(`http://localhost:8080/recipient/getRecipientById/${recipientId}`);
      console.log('Recipient Details123:', response.data);
      setRecipient(response.data);
    } catch (error) {
      console.error('Error fetching caregiver details:', error);
    }
  };


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

  

  const navigateToViewCaregiver = (userId) => {
    navigate(`/view-caregiver/${userId}`, { state: { userObject, userType: 'recipient' } });
  };

  const handleSendMessage = () => {
    console.log('Sending a message to the caregiver');
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

  const navigateToMyFeedBacks = () => {
    navigate(`/my-feedbacks/${caregiver.caregiverId}`, { state: { userObject, userType: 'caregiver' } });
  }
  const handleLogout = () => {
    // Implement logout functionality, e.g., clear tokens
    localStorage.removeItem('authToken');
    // Then navigate to the login page
    navigate('/login');
  };

  return (
    <div className={styles.homeContainer}>
       {userType === 'caregiver' && caregiver && (
      <div className={styles.navColumn}>
      <div className={styles.logoContainer}>
        <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
      </div>
      <div onClick={navigateToMyProfile} className={styles.userProfileContainer}>
        {/* Conditional rendering for profile picture */}
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
        <div>
          {userObject ? (
           <p className={styles.userProfileInfo}>{`${caregiver?.firstname} ${caregiver?.lastname}`}</p>
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
            <div className={styles.navLink}  onClick={navigateToHistoryCaregiver}>
              <img src="/history-icon.svg" alt="Records" className={styles.navIcon} /> History
            </div>
          </li>
          <li>
            <div className={`${styles.navLink} ${styles.activeNavLink}`}  onClick={navigateToMyFeedBacks}>
              <img src="/feedbacks-icon2.png" alt="Records" className={styles.navIcon} /> Feedbacks
            </div>
          </li>
          
          <li>
            <div onClick={handleLogout} className={styles.navLink}>
            <img src="/logout-icon.svg" alt="Logout" className={styles.navIcon} /> Logout
          </div>
          </li>
        </ul>
      </div>
    </div>
       )}
      <div className={styles.contentColumn}>
       
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
                <p className={styles.userProfileInfo}>{`Average: `}</p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.viewCaregiverContainer}>
  <div className={styles.caregiverDetailsColumn}>
    <div className={styles.caregiverDetails}>
      <div className={styles.leftColumn}>
        {caregiver.profilePicture ? (
          <img
            src={`data:image/png;base64,${caregiver?.profilePicture}`}
            alt="Profile"
            className={styles.userProfilePicture2}
          />
        ) : (
          <img
            src="/DefaultProfilePicture.webp"
            alt="Profile"
            className={styles.userProfilePicture2}
          />
        )}
        <h2 className={styles.caregiverName}>{`${caregiver.firstname} ${caregiver.lastname}`}</h2>
        <p style={{fontSize: '20px', fontWeight: 'bold'}}>{`Average Rating: ${averageRating.toFixed(2)}`}</p> {/* Display the average rating */}
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.caregiverInfo}>
          <p style={{fontSize: '20px', fontWeight: 'bold'}}>Feedbacks</p>
          <ul className={styles.feedbackList}>
    {feedbacks.map((feedback, index) => (
      <li key={index} className={styles.feedbackItem}>
        <div className={styles.feedbackProfile}>
          {feedback.recipientData.profilePicture ? (
            <img
              src={`data:image/png;base64,${feedback.recipientData.profilePicture}`}
              alt="Profile"
              className={styles.feedbackProfilePicture}
            />
          ) : (
            <img
              src="/DefaultProfilePicture.webp"
              alt="Profile"
              className={styles.feedbackProfilePicture}
            />
          )}
        </div>
        <div className={styles.feedbackContent}>
        <p className={styles.feedbackAuthor}>
          {`${feedback.recipientData.firstname} ${feedback.recipientData.lastname}: ${feedback.feedback}`}
         </p> 
        </div>
      </li>
    ))}
  </ul>
        </div>
      
      </div>
    </div>
  </div>
</div>
        )}
      </div>
    </div>
  );
};

export default MyFeedBacks;

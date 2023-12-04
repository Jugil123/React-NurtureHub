// ViewCaregiver.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './BookCaregiver.module.css'; // Import styles for ViewCaregiver

const ConfirmationModal = ({ onClose, caregiver, bookingData, userObject }) => {
  const navigate = useNavigate();
  // Format date and time
  const formattedStartDate = new Date(bookingData.start_date).toLocaleDateString();
  const formattedEndDate = new Date(bookingData.end_date).toLocaleDateString();
  const formattedStartTime = bookingData.start_time;
  const formattedEndTime = bookingData.end_time;

  const handleConfirm = () => {
    // Perform any additional actions if needed
    // Close the modal
    onClose();

    // Navigate to home-recipient
    navigate('/home-recipient', { state: { userObject } });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>
          Thank you for booking a caregiver!
          <br />
          We're delighted that you've taken this step to ensure the well-being of your loved one. Your booking is confirmed, and we've taken note of your preferences.
          <br />
          <br />
          <strong>Booking Details:</strong>
          <br />
          Caregiver: {`${caregiver.firstname} ${caregiver.lastname}`}
          <br />
          Date: {`${formattedStartDate} - ${formattedEndDate}`}
          <br />
          Time: {`${formattedStartTime} - ${formattedEndTime}`}
          <br />
          Hourly Rate: {caregiver.hourlyRate}
          <br />
          Contact Information: {caregiver.contact_information} {/* Replace with actual contact information */}
          <br />
          Your Address: {userObject.address}
          <br />
          <br />
          Please wait for the Caregiver's response. Thank you.
          <br />
          <br />
          We hope your loved one receives excellent care, and we're here to make sure the experience is seamless for you. Feel free to contact us if you need any further assistance.
          <br />
          <br />
          Thank you for choosing our app to find the right caregiver. Your peace of mind is our priority!
        </p>
        <button onClick={handleConfirm}>Close</button>
      </div>
    </div>
  );
};

const BookCaregiver = () => {
  const location = useLocation();
  const { userId } = useParams();
  const [caregiver, setCaregiver] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
  });
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const userObject = location.state ? location.state.userObject : null;

  const handleSearch = async () => {
    setSearchResults([]);
    console.log('Search Term:', searchTerm);
    try {
      const response = await axios.get(`http://localhost:8080/caregiver/searchCaregiver?searchString=${searchTerm}`);
      setSearchResults(response.data);
      setShowSearchResults(true);
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

  const handleBookCaregiver = async () => {
    const userConfirmed = window.confirm("Are you sure you want to book this caregiver?");
    if (!userConfirmed) {
      return;
    }
    try {
      const bookingDataToSend = {
        recipient: userObject.username,
        caregiver: caregiver.username,
        start_date: bookingData.start_date,
        end_date: bookingData.end_date,
        start_time: bookingData.start_time,
        end_time: bookingData.end_time,
      };

      const response = await axios.post('http://localhost:8080/booking/insertBooking', bookingDataToSend);

      if (response.status === 200) {
        setConfirmationModalVisible(true);
      } else {
        console.error('Booking failed:', response.data);
      }
    } catch (error) {
      console.error('Error booking caregiver:', error);
    }
  };

  const handleCloseModal = () => {
    setConfirmationModalVisible(false);
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

  const handleBookingInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              <div className={styles.navLink} onClick={navigateToRecordsRecipient}>
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
                return false;
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
          <div>
            <h1>Book Caregiver</h1>
            <div className={styles.caregiverInfo}>
              <img src={caregiver.profilePicture} alt="Profile" className={styles.userProfilePicture} />
              <p>{`${caregiver.firstname} ${caregiver.lastname}`}</p>
            </div>
            <label>Start Date:</label>
            <input type="date" name="start_date" value={bookingData.start_date} onChange={handleBookingInputChange} />
            <label>End Date:</label>
            <input type="date" name="end_date" value={bookingData.end_date} onChange={handleBookingInputChange} />
            <label>Start Time:</label>
            <input type="time" name="start_time" value={bookingData.start_time} onChange={handleBookingInputChange} />
            <label>End Time:</label>
            <input type="time" name="end_time" value={bookingData.end_time} onChange={handleBookingInputChange} />
            <button onClick={handleBookCaregiver}>Book</button>
          </div>
        )}
        {confirmationModalVisible && <ConfirmationModal onClose={handleCloseModal} caregiver={caregiver} bookingData={bookingData} userObject={userObject} />}
      </div>
    </div>
  );
};

export default BookCaregiver;

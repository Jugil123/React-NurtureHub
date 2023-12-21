import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './HomeCaregiver.module.css';
import axios from 'axios';
import { useTheme } from './ThemeContext'; // Make sure to import useTheme from the correct location

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userObject = location.state ? location.state.caregiver : null;
  const selectedBooking = location.state ? location.state.selectedBooking : null;
  const [recipientRecords, setRecipientRecords] = useState(null);
  const [showRecords, setShowRecords] = useState(false); 
  const [caregiver, setCaregiver] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const userType = location.state ? location.state.userType : null;

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

  useEffect(() => {
    const fetchRecipientRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/record/getRecordByRecipient/${selectedBooking.recipient.username}`);
        setRecipientRecords(response.data);
      } catch (error) {
        console.error('Error fetching recipient records:', error);
        // Handle the error as needed
      }
    };

    if (selectedBooking.recipient.username && showRecords) {
      fetchRecipientRecords();
    }
  }, [selectedBooking.recipient.username, showRecords]);

  if (!selectedBooking) {
    // Handle the case when there is no selected booking
    return <p>No booking details available.</p>;
  }

  const handleAccept = async () => {
    const userConfirmed = window.confirm(`Are you sure you want to accept booking request from ${selectedBooking.recipient.firstname}?`);
    if(userConfirmed){
    try {
      // Implement logic to accept the booking
      console.log(`Accepting booking with ID ${selectedBooking.booking.bookingId}`);

      console.log(`RecipientID ${selectedBooking.recipient.recipientId}`);

      console.log(`CaregiverID ${userObject.caregiverId}`);

      // Make API calls to update isBooked status for both recipient and caregiver
      await axios.put(`http://localhost:8080/recipient/updateRecipientBooked/?rid=${selectedBooking.recipient.recipientId}`, {
        isBooked: 1,
      });

      await axios.put(`http://localhost:8080/caregiver/updateCaregiverBooked/?cid=${userObject.caregiverId}`, {
        isBooked: 1,
      });

      // Code for deleting other booking requests sent by other recipient
      const bookingData = await axios.get(`http://localhost:8080/booking/getAllBookingRequest/${userObject.username}`);
      const bookings = bookingData.data.bookings;

      for (const bookingMap of bookings) {
        const booking = bookingMap.booking;
        const recipient = bookingMap.recipient;
      
        if (recipient.username !== selectedBooking.recipient.username) {
          await axios.delete(`http://localhost:8080/booking/deleteBooking/${booking.bookingId}`);
        }
      }

      //Code for deleting other booking requests sent by recipient
      const response = 
      await axios.get(`http://localhost:8080/booking/getAllBookingsByRecipient?recipient=${selectedBooking.recipient.username}`);
      const recipientRequests = response.data;

      for(const booking of recipientRequests){

        if(booking.caregiver !== userObject.username){
          await axios.delete(`http://localhost:8080/booking/deleteBooking/${booking.bookingId}`);
        }
      }

      // You can add your logic here to handle the acceptance
      // For example, make an API call to update the booking status
      // ...

      // After handling the acceptance, you can navigate back to the previous page or any other page
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error('Error accepting booking:', error);
      // Handle the error as needed
    }
   }
  };

  const handleDecline = async () => {
    const userConfirmed = window.confirm(`Are you sure you want to decline booking request from ${selectedBooking.recipient.firstname}?`);
    if(userConfirmed){
    try {
      // Implement logic to decline the booking
      console.log(`Declining booking with ID ${selectedBooking.booking.bookingId}`);

      // Make API call to delete the booking
      await axios.delete(`http://localhost:8080/booking/terminateBooking/${selectedBooking.booking.bookingId}`);

      // Make API calls to update isBooked status for both recipient and caregiver
      await axios.put(`http://localhost:8080/recipient/updateRecipientBooked/?rid=${selectedBooking.recipient.recipientId}`, {
        isBooked: 0,
      });

      await axios.put(`http://localhost:8080/caregiver/updateCaregiverBooked/?cid=${userObject.caregiverId}`, {
        isBooked: 0,
      });

      // You can add your logic here to handle the decline
      // For example, update the UI or perform additional actions

      // After handling the decline, you can navigate back to the previous page or any other page
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error('Error declining booking:', error);
      // Handle the error as needed
    }
   }
  };

  const handleEndService = async () => {
    const userConfirmed = window.confirm(`Are you sure you want to end service with ${selectedBooking.recipient.firstname}?`);

    if(userConfirmed){
    try {
      // Implement logic to end the service
      console.log(`Ending service for booking with ID ${selectedBooking.booking.bookingId}`);

      // Make API call to delete the booking
      await axios.delete(`http://localhost:8080/booking/terminateBooking/${selectedBooking.booking.bookingId}`);

      // Make API calls to update isBooked status for both recipient and caregiver
      await axios.put(`http://localhost:8080/recipient/updateRecipientBooked/?rid=${selectedBooking.recipient.recipientId}`, {
        isBooked: 0,
      });

      await axios.put(`http://localhost:8080/caregiver/updateCaregiverBooked/?cid=${userObject.caregiverId}`, {
        isBooked: 0,
      });

      const serviceHistoryData = {
        recipient: selectedBooking.recipient.username,
        caregiver: userObject.username,
        start_date: selectedBooking.booking.start_date,
        end_date: selectedBooking.booking.end_date,
        start_time: selectedBooking.booking.start_time,
        end_time: selectedBooking.booking.end_time
      }

      await axios.post('http://localhost:8080/serviceHistory/insertServiceHistory', serviceHistoryData);      

      // You can add your logic here to handle the end of service
      // For example, update the UI or perform additional actions

      // After handling the end of service, you can navigate back to the previous page or any other page
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error('Error ending service:', error);
      // Handle the error as needed
    }
   }
  };


  const handleRecords = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/record/getRecordByRecipient/${selectedBooking.recipient.username}`);
      setRecipientRecords(response.data);
      setShowRecords(true);
    } catch (error) {
      console.error('Error fetching or displaying recipient records:', error);
      // Handle the error as needed
      setShowRecords(false);
    }
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



  // Render the details of the selected booking
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
                <img src="/home-icon2.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Home
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
              <div className={styles.navLink} onClick={navigateToHistoryCaregiver}>
                <img src="/history-icon.svg" alt="Records" className={styles.navIcon} /> History
              </div>
            </li>
            <li>
              <div className={styles.navLink}  onClick={navigateToMyFeedBacks}>
                <img src="/feedbacks-icon.png" alt="Records" className={styles.navIcon} /> Feedbacks
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
      {/* Render the details of the selected booking */}
      <div className={styles.contentColumn}>
        <h2 className={styles.bookingDetailsTitle}>Booking Details</h2>
        {selectedBooking.recipient.profilePicture ? (
          <img
            src={`data:image/png;base64,${selectedBooking.recipient?.profilePicture}`}
            alt="Profile"
            className={styles.bookingDetailsProfilePicture}
          />
        ) : (
          <img
            src="/DefaultProfilePicture.webp"
            alt="Profile"
            className={styles.bookingDetailsProfilePicture}
          />
        )}
        <p className={styles.bookingDetailsText}>{`Recipient: ${selectedBooking.recipient.firstname} ${selectedBooking.recipient.lastname}`}</p>
        <p className={styles.bookingDetailsText}>{`Start & End Date: ${selectedBooking.booking.start_date} - ${selectedBooking.booking.end_date}`}</p>
        <p className={styles.bookingDetailsText}>{`Time: ${selectedBooking.booking.start_time} - ${selectedBooking.booking.end_time}`}</p>
        <p className={styles.bookingDetailsText}>{`Contact Info: ${selectedBooking.recipient.contact_info}`}</p>
        <p className={styles.bookingDetailsText}>{`Address: ${selectedBooking.recipient.address}`}</p>

        {showRecords ? (
          <div>
            <h3 className={styles.bookingDetailsRecordsTitle}>Recipient's Medical Records</h3>
            {recipientRecords ? (
              <>
                <p className={styles.bookingDetailsText}>{`Allergies: ${recipientRecords.allergies}`}</p>
                <p className={styles.bookingDetailsText}>{`Medical Conditions: ${recipientRecords.medical_conditions}`}</p>
                <p className={styles.bookingDetailsText}>{`Medications: ${recipientRecords.medications}`}</p>
                <p className={styles.bookingDetailsText}>{`Past Surgeries: ${recipientRecords.past_surgeries}`}</p>
                <p className={styles.bookingDetailsText}>{`Family History: ${recipientRecords.family_history}`}</p>
              </>
            ) : (
              <p className={styles.bookingDetailsMissingRecords}>{`Recipient ${selectedBooking.recipient.username} has not yet added his/her medical records.`}</p>
            )}
          </div>
        ) : null}

        {userObject.isBooked === 1 && selectedBooking.recipient.isBooked === 1 ? (
          <div className={styles.bookingDetailsButtons}>
            <button className={styles.endServiceBtn} onClick={handleEndService}>End Service</button>
            <button className={styles.viewBtn} onClick={handleRecords}>Records</button>
          </div>
        ) : (
          <div className={styles.bookingDetailsButtons}>
            {/* <p className={styles.bookingDetailsText}>Are you sure you want to accept this booking request?</p> */}
            <button className={styles.bookingDetailsButton1} onClick={handleAccept}>Accept</button>
            <button className={styles.bookingDetailsButton2} onClick={handleDecline}>Decline</button>
            <button className={styles.bookingDetailsButton3} onClick={handleRecords}>Records</button>
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingDetails;

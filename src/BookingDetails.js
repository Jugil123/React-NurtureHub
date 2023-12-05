import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './HomeCaregiver.module.css';
import axios from 'axios';

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userObject = location.state ? location.state.caregiver : null;
  const selectedBooking = location.state ? location.state.selectedBooking : null;
  const [recipientRecords, setRecipientRecords] = useState(null);
  const [showRecords, setShowRecords] = useState(false); 

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
      await axios.delete(`http://localhost:8080/booking/deleteBooking/${selectedBooking.booking.bookingId}`);

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
      await axios.delete(`http://localhost:8080/booking/deleteBooking/${selectedBooking.booking.bookingId}`);

      // Make API calls to update isBooked status for both recipient and caregiver
      await axios.put(`http://localhost:8080/recipient/updateRecipientBooked/?rid=${selectedBooking.recipient.recipientId}`, {
        isBooked: 0,
      });

      await axios.put(`http://localhost:8080/caregiver/updateCaregiverBooked/?cid=${userObject.caregiverId}`, {
        isBooked: 0,
      });

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
    navigate('/my-profile', { state: { userObject } });
  };

  const navigateToMessageCaregiver = () => {
    navigate('/message-caregiver', { state: { userObject } });
  };

  const navigateToHistoryCaregiver = () => {
    navigate('/history-caregiver', { state: { userObject } });
  };

  const navigateToHomeCaregiver = () => {
    navigate('/home-caregiver', { state: { userObject } });
  };

  // Render the details of the selected booking
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
              <div className={styles.navLink} onClick={navigateToHistoryCaregiver}>
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
        <h2>Booking Details</h2>
        <p>{`Recipient: ${selectedBooking.recipient.firstname} ${selectedBooking.recipient.lastname}`}</p>
        <p>{`Start & End Date: ${selectedBooking.booking.start_date} - ${selectedBooking.booking.end_date}`}</p>
        <p>{`Time: ${selectedBooking.booking.start_time} - ${selectedBooking.booking.end_time}`}</p>
        <p>{`Contact Info: ${selectedBooking.recipient.contact_info}`}</p>
        <p>{`Address: ${selectedBooking.recipient.address}`}</p>

        {showRecords ? (
          <div>
            <h3>Recipient's Medical Records</h3>
            {recipientRecords ? (
              <>
                <p>{`Allergies: ${recipientRecords.allergies}`}</p>
                <p>{`Medical Conditions: ${recipientRecords.medical_conditions}`}</p>
                <p>{`Medications: ${recipientRecords.medications}`}</p>
                <p>{`Past Surgeries: ${recipientRecords.past_surgeries}`}</p>
                <p>{`Family History: ${recipientRecords.family_history}`}</p>
              </>
            ) : (
              <p style={{ color: 'red' }}>{`Recipient ${selectedBooking.recipient.username} has not yet added his/her medical records.`}</p>
            )}
          </div>
        ) : null}

        {userObject.isBooked === 1 && selectedBooking.recipient.isBooked === 1 ? (
          <div>
            <button onClick={handleEndService}>End Service</button>
            <button onClick={handleRecords}>Records</button>
          </div>
        ) : (
          <div>
            <p>Are you sure you want to accept this booking request?</p>
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleDecline}>Decline</button>
            <button onClick={handleRecords}>Records</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;

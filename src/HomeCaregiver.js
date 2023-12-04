import React, { useState, useEffect } from 'react';
import styles from './HomeCaregiver.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingDetails from './BookingDetails';

//
const Home = () => {
  const [bookingRequests, setBookingRequests] = useState({ bookings: [] });
  const [userObject, setUserObject] = useState(null); // Added state for userObject
  const location = useLocation();
  const navigate = useNavigate();

  // Extract userObject from location state

  useEffect(() => {
    // Update userObject when the location state changes
    if (location.state && location.state.userObject) {
      const updatedUserObject = location.state.userObject;
      console.log('Updated userObject:', updatedUserObject);

      // Perform any additional logic or updates with the updatedUserObject

      // Update the userObject state
      setUserObject(updatedUserObject);

      // Fetch booking requests when the component mounts or userObject changes
      fetchBookingRequests(updatedUserObject.username);
    }
  }, [location.state]);

  const fetchBookingRequests = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/booking/getAllBookingRequest/${username}`);
      console.log('Full API Response:', response.data);
  
      const { bookings } = response.data;
      console.log('Bookings:', bookings);
  
      setBookingRequests({ bookings: bookings || [] }); // Ensure bookings is defined or set it to an empty array
    } catch (error) {
      console.error('Error fetching booking requests:', error);
    }
  };

  const handleAccept = (bookingId) => {
    // Implement logic to accept the booking
    console.log(`Accepting booking with ID ${bookingId}`);
  };

  const handleDecline = (bookingId) => {
    // Implement logic to decline the booking
    console.log(`Declining booking with ID ${bookingId}`);
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


  const handleView = (bookingId) => {
    const selected = bookingRequests.bookings.find((booking) => booking.booking.bookingId === bookingId);
    console.log('Selected Booking:', selected);

     // Navigate to BookingDetails and pass the selected booking as state
     navigate('/booking-details', { state: { userObject, selectedBooking: selected } });
  
  };
  
  
  const handleEndService = async (bookingId) => {
    try {
      // Find the selected booking
      const selected = bookingRequests.bookings.find(
        (booking) => booking.booking.bookingId === bookingId
      );

      // Implement logic to end the service
      console.log(`Ending service for booking with ID ${bookingId}`);

      // Make API call to delete the booking
      await axios.delete(`http://localhost:8080/booking/deleteBooking/${bookingId}`);

      // Make API calls to update isBooked status for both recipient and caregiver
      await axios.put(`http://localhost:8080/recipient/updateRecipientBooked/?rid=${selected.recipient.recipientId}`, {
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
        {bookingRequests.bookings.map((booking) => (
          <div key={booking.booking.bookingId} className={styles.bookingRequest}>
            <p>{`${booking.recipient.firstname} ${booking.recipient.lastname}`}</p>
            {/* Check conditions for rendering buttons */}
            {userObject.isBooked === 1 && booking.recipient.isBooked === 1 ? (
              <button onClick={() => handleEndService(booking.booking.bookingId)}>
                End Service
              </button>
            ) : (
              null
            )}
            <button onClick={() => handleView(booking.booking.bookingId)}>View</button>
           
          </div>
        ))}
        
      </div>

    
    </div>
  );
};

export default Home;
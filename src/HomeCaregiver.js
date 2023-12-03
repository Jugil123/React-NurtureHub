import React, { useState, useEffect } from 'react';
import styles from './HomeCaregiver.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingDetails from './BookingDetails';


const Home = () => {
  const [bookingRequests, setBookingRequests] = useState({ bookings: [] });
  const location = useLocation();
  const navigate = useNavigate();

  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    // Fetch booking requests when the component mounts
    if (userObject) {
      fetchBookingRequests(userObject.username);
    }
  }, [userObject]);

  const fetchBookingRequests = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/booking/getAllBookingRequest/${username}`);
      console.log('Full API Response:', response.data);

      const { bookings } = response.data;
      console.log('Bookings:', bookings);

      setBookingRequests({ bookings });
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
  
    if (selected) {
      console.log('SL', { booking: selected });
      navigate('/booking-details', { state: { booking: selected } });
    } else {
      console.error('Selected booking is undefined.');
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
            <button onClick={() => handleAccept(booking.bookingId)}>Accept</button>
            <button onClick={() => handleDecline(booking.bookingId)}>Decline</button>
            <button onClick={() => handleView(booking.booking.bookingId)}>View</button>
           
          </div>
        ))}
         {selected && <BookingDetails booking={selected} />}
      </div>

    
    </div>
  );
};

export default Home;
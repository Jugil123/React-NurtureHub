import React, { useState, useEffect } from 'react';
import styles from './HomeCaregiver.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingDetails from './BookingDetails';
import { useTheme } from './ThemeContext'; // Make sure to import useTheme from the correct location



//
const Home = () => {
  const [bookingRequests, setBookingRequests] = useState({ bookings: [] });
  const [caregiver, setCaregiver] = useState(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Home-caregiver";
  },[]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // If the authentication token doesn't exist, navigate to the login page
      navigate('/login');
    } 
  }, [navigate]);


  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;
  console.log('userObject:', userObject);

  useEffect(() => {
    // Fetch booking requests when the component mounts
    if (userObject) {
      fetchBookingRequests(userObject.username);
      fetchCaregiverDetails(userObject.caregiverId);
    }
  }, [userObject]);

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

  const fetchCaregiverDetails = async (caregiverId) => {
    try {
      const response = await axios.get(`http://localhost:8080/caregiver/getCaregiverById/${caregiverId}`);
      console.log('Caregiver Details:', response.data);

      setCaregiver(response.data);
    } catch (error) {
      console.error('Error fetching caregiver details:', error);
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

  const handleLogout = () => {
    // Implement logout functionality, e.g., clear tokens
    localStorage.removeItem('authToken');
    // Then navigate to the login page
    navigate('/login');
  };




  const handleView = (bookingId) => {
    const selected = bookingRequests.bookings.find((booking) => booking.booking.bookingId === bookingId);
    console.log('Selected Booking:', selected);

     // Navigate to BookingDetails and pass the selected booking as state
     navigate('/booking-details', { state: { caregiver, selectedBooking: selected, userType: 'caregiver' } });
  
  };
  
  
  const handleEndService = async (bookingId, firstname) => {
    const userConfirmed = window.confirm(`Are you sure you want to end service with ${firstname}?`);

    if (userConfirmed){
    try {
      // Find the selected booking
      const selected = bookingRequests.bookings.find(
        (booking) => booking.booking.bookingId === bookingId
      );

      // Implement logic to end the service
      console.log(`Ending service for booking with ID ${bookingId}`);

      // Make API call to delete the booking
      await axios.delete(`http://localhost:8080/booking/terminateBooking/${bookingId}`);

      // Make API calls to update isBooked status for both recipient and caregiver
      await axios.put(`http://localhost:8080/recipient/updateRecipientBooked/?rid=${selected.recipient.recipientId}`, {
        isBooked: 0,
      });

      await axios.put(`http://localhost:8080/caregiver/updateCaregiverBooked/?cid=${userObject.caregiverId}`, {
        isBooked: 0,
      });

      const serviceHistoryData = {
        recipient: selected.recipient.username,
        caregiver: userObject.username,
        start_date: selected.booking.start_date,
        end_date: selected.booking.end_date,
        start_time: selected.booking.start_time,
        end_time: selected.booking.end_time
      }

      await axios.post('http://localhost:8080/serviceHistory/insertServiceHistory', serviceHistoryData);      

      // You can add your logic here to handle the end of service
      // For example, update the UI or perform additional actions

      window.location.reload();
    } catch (error) {
      console.error('Error ending service:', error);
      // Handle the error as needed
    }
   }
  };



  return (
    <div className={`${styles.homeContainer} ${theme === 'dark' ? styles.dark : ''}`}>
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
              <div className={styles.navLink}  onClick={navigateToHistoryCaregiver}>
                <img src="/history-icon.svg" alt="Records" className={styles.navIcon} /> History
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
      <div className={styles.contentColumn}>
  <button onClick={toggleTheme} className={styles.themeSwitchBtn}>
    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
  </button>

  <h2 className={styles.sectionTitle}>Booking Requests</h2>

  {bookingRequests.bookings.map((booking) => (
    <div key={booking.booking.bookingId} className={styles.bookingRequest}>
      <img
        src={booking.recipient.profilePicture ?
          `data:image/png;base64,${booking.recipient.profilePicture}` :
          '/DefaultProfilePicture.webp'}
        alt="Profile"
        className={styles.userProfilePicture}
      />
      <div className={styles.bookingDetails}>
        <p className={styles.recipientName}>
          {`${booking.recipient.firstname} ${booking.recipient.lastname}`}
        </p>

        {booking.recipient.isBooked === 1 ? (
          <button
            onClick={() => handleEndService(booking.booking.bookingId, booking.recipient.firstname)}
            className={styles.endServiceBtn}
          >
            End Service
          </button>
        ) : (
          null
        )}

        <button
          onClick={() => handleView(booking.booking.bookingId)}
          className={styles.viewBtn}
        >
          View
        </button>
      </div>
    </div>
  ))}
</div>

    
    </div>
  );
};

export default Home;
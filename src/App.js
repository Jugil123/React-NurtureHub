// App.js
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext'; // Adjust this import based on where you've placed your ThemeContext file

// Import your components
import UserType from './UserType';
import LandingPage from './LandingPage';
import Login from './Login';
import RegisterRecipient from './RegisterRecipient';
import RegisterCaregiver from './RegisterCaregiver';
import HomeRecipient from './HomeRecipient';
import HomeCaregiver from './HomeCaregiver';
import DashboardAdmin from './DashboardAdmin';
import UpdateCaregiver from './UpdateCaregiver';
import UpdateRecipient from './UpdateRecipient';
import AboutUs from './About';
import ContactUs from './ContactUs';
import MessageCaregiver from './MessageCaregiver';
import HistoryCaregiver from './HistoryCaregiver';
import MyProfile from './MyProfile';
import ViewCaregiver from './ViewCaregiver';
import BookCaregiver from './BookCaregiver';
import MessageRecipient from './MessageRecipient';
import RecordsRecipient from './RecordsRecipient';
import FAQ from './FAQ';
import BookingDetails from './BookingDetails';
import UpdateRecords from './UpdateRecords'
import Feedback from "./Feedback";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider> {/* Wrap your entire application with ThemeProvider */}
          <div>
            <Helmet>
              <title>NurtureHub</title>
            </Helmet>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/user-type" element={<UserType />} />
              <Route path="/register-recipient" element={<RegisterRecipient />} />
              <Route path="/register-caregiver" element={<RegisterCaregiver />} />
              <Route path="/home-recipient" element={<HomeRecipient />} />
              <Route path="/home-caregiver" element={<HomeCaregiver />} />
              <Route path="/dashboard" element={<DashboardAdmin />} />
              <Route path="/update-recipient/:userId" element={<UpdateRecipient />} />
              <Route path="/update-caregiver/:userId" element={<UpdateCaregiver />} />
              <Route path="/message-caregiver" element={<MessageCaregiver />} />
              <Route path="/history-caregiver" element={<HistoryCaregiver />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/view-caregiver/:userId" element={<ViewCaregiver />} />
              <Route path="/book-caregiver/:userId" element={<BookCaregiver />} />
              <Route path="/message-recipient" element={<MessageRecipient />} />
              <Route path="/records-recipient" element={<RecordsRecipient />} />
              <Route path="/booking-details" element={<BookingDetails />} />
              <Route path="/update-records/:recipient" element={<UpdateRecords />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;

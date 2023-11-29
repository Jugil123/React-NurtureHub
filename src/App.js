// App.js
import React from 'react';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserType from './UserType';
import LandingPage from './LandingPage'
import Login from './Login';
import RegisterRecipient from './RegisterRecipient';
import RegisterCaregiver from './RegisterCaregiver';
import HomeRecipient from './HomeRecipient';
import HomeCaregiver from './HomeCaregiver';
import DashboardAdmin from './DashboardAdmin';
import UpdateCaregiver from './UpdateCaregiver';
import UpdateRecipient from './UpdateRecipient';
import AboutUs from './About'
import ContactUs from './ContactUs'
import MessageCaregiver from './MessageCaregiver';
import HistoryCaregiver from './HistoryCaregiver';
import MyProfile from './MyProfile';
import ViewCaregiver from './ViewCaregiver';


const App = () => {
  return (
    <HelmetProvider>
    <Router>
      <div>
          <Helmet>
            <title>NurtureHub</title>
          </Helmet>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/user-type" element={<UserType />} />
          <Route path="/register-recipient" element={<RegisterRecipient />} />
          <Route path="/register-caregiver" element={<RegisterCaregiver />} />
          <Route path="/home-recipient" element={<HomeRecipient  />} />
          <Route path="/home-caregiver" element={<HomeCaregiver />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/update-recipient/:userId" element={<UpdateRecipient />} />
          <Route path="/update-caregiver/:userId" element={<UpdateCaregiver />} />
          <Route path="/message-caregiver" element={<MessageCaregiver />} />
          <Route path="/history-caregiver" element={<HistoryCaregiver />} />
          <Route path="/my-profile" element={<MyProfile /> } />
          <Route path="/view-caregiver/:userId" element={<ViewCaregiver /> } />
          
        </Routes>
      </div>
    </Router>
    </HelmetProvider>
  );
};

export default App;

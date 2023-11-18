// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserType from './UserType';
import Login from './Login';
import RegisterRecipient from './RegisterRecipient';
import RegisterCaregiver from './RegisterCaregiver';
import HomeRecipient from './HomeRecipient';
import HomeCaregiver from './HomeCaregiver';
import DashboardAdmin from './DashboardAdmin';
import UpdateCaregiver from './UpdateCaregiver';
import UpdateRecipient from './UpdateRecipient';



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-type" element={<UserType />} />
          <Route path="/register-recipient" element={<RegisterRecipient />} />
          <Route path="/register-caregiver" element={<RegisterCaregiver />} />
          <Route path="/home-recipient" element={<HomeRecipient />} />
          <Route path="/home-caregiver" element={<HomeCaregiver />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/update-recipient/:userId" element={<UpdateRecipient />} />
          <Route path="/update-caregiver/:userId" element={<UpdateCaregiver />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

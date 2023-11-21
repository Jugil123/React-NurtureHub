import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const [recipients, setRecipients] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipients();
    fetchCaregivers();
  }, []);

  const fetchRecipients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/recipient/getAllRecipients');
      setRecipients(response.data);
    } catch (error) {
      console.error('Error fetching recipients', error);
    }
  };

  const fetchCaregivers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/caregiver/getAllCaregivers');
      setCaregivers(response.data);
    } catch (error) {
      console.error('Error fetching caregivers', error);
    }
  };

  const handleUpdate = (userType, userId) => {
    setUpdateData({ userType, userId });

    if (userType === 'Recipient') {
      navigate(`/update-recipient/${userId}`);
    } else if (userType === 'Caregiver') {
      navigate(`/update-caregiver/${userId}`);
    }
  };

  const handleDelete = async (userType, userId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/${userType.toLowerCase()}/delete${userType}/${userId}`);
      console.log(response.data); // Log the server response
      // Refresh the user list after deletion
      if (userType === 'Recipient') {
        fetchRecipients();
      } else if (userType === 'Caregiver') {
        fetchCaregivers();
      }
    } catch (error) {
      console.error(`Error deleting ${userType}`, error);
    }
  };

  const handleRegisterCaregiver = () => {
    // Use the navigate function to redirect to the desired route
    navigate('/register-caregiver');
  };

  const renderUserTable = (users, userType) => {
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleRegisterCaregiver}>
          Register Caregiver
        </button>
        <h2>{`${userType} List`}</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Password</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Address</th>
              <th>{userType === 'Recipient' ? 'Contact Info' : 'Contact Information'}</th>
              <th>{userType === 'Caregiver' ? 'Specializations' : 'Age'}</th>
              {userType === 'Caregiver' && <th>Hourly Rate</th>}
              {userType === 'Caregiver' && <th>Availability</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.password}</td>
                <td>{user.birth_date}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>{userType === 'Recipient' ? user.contact_info : user.contact_information}</td>
                <td>{userType === 'Caregiver' ? user.specializations : user.age || user.hourlyRate}</td>
                {userType === 'Caregiver' && <td>{user.hourlyRate}</td>}
                {userType === 'Caregiver' && <td>{user.availability}</td>}
                <td>
                  <button onClick={() => handleUpdate(userType, userType === 'Recipient' ? user.recipientId : user.caregiverId)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(userType, userType === 'Recipient' ? user.recipientId : user.caregiverId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {renderUserTable(recipients, 'Recipient')}
      {renderUserTable(caregivers, 'Caregiver')}
    </div>
  );
};

export default DashboardAdmin;

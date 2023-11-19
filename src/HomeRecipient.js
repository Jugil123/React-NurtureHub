// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/caregiver/getAllCaregivers');
      setCaregivers(response.data);
    } catch (error) {
      console.error('Error fetching caregivers', error);
    }
  };


  return (
    <div>
      <h1>Recipient HomePage</h1>
       {caregivers.map((user) => (
        <div key={user.id}>
          <p>{`${user.firstname} ${user.lastname}`}</p>
          <p>{user.address}</p>
        </div>
      ))}

    </div>
  );
};

export default Home

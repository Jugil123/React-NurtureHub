// ViewCaregiver.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewCaregiver = () => {
  const { userId } = useParams();
  const [caregiver, setCaregiver] = useState(null);

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        // Make an HTTP GET request to fetch caregiver details by ID
        const response = await axios.get(`http://localhost:8080/caregiver/getCaregiverById/${userId}`);
        setCaregiver(response.data);
      } catch (error) {
        console.error('Error fetching caregiver details:', error);
      }
    };

    fetchCaregiver();
  }, [userId]);

  if (!caregiver) {
    // If caregiver details are not available, you can handle the loading state or redirect
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{`${caregiver.firstname} ${caregiver.lastname}`}</h2>
      <p>{`Address: ${caregiver.address}`}</p>
     
      {/* Add other caregiver details here */}
    </div>
  );
};

export default ViewCaregiver;

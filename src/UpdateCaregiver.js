import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';



const UpdateCaregiver = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [caregiver, setCaregiver] = useState({
    firstname: '',
    lastname: '',
    password: '',
    birth_date: '',
    gender: '',
    contact_information: '',
    address: '',
    specializations: '',
    availability: '',
    hourlyRate: 0,
  });

  useEffect(() => {
    const fetchCaregiverDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/caregiver/getCaregiverById/${userId}`);
        setCaregiver(response.data);
      } catch (error) {
        console.error('Error fetching caregiver details', error);
      }
    };

    fetchCaregiverDetails();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      if (
        caregiver.firstname &&
        caregiver.lastname &&
        caregiver.password &&
        caregiver.birth_date &&
        caregiver.gender &&
        caregiver.contact_information &&
        caregiver.address &&
        caregiver.specializations &&
        caregiver.availability &&
        caregiver.hourlyRate
      ) {
        await axios.put(`http://localhost:8080/caregiver/updateCaregiver/?cid=${userId}`, caregiver);

        const accountUpdateResponse = await axios.put(`http://localhost:8080/account/updateAccount/?username=${caregiver.username}`, {
          password: caregiver.password,
        });

        // Handle successful update
        navigate('/dashboard');
      } else {
        console.error('Incomplete caregiver data');
        // Handle incomplete data
      }
    } catch (error) {
      console.error('Error updating caregiver', error);
      // Handle update failure
    }
  };

  return (
    <div>
      {/* Display input fields with current caregiver details */}
      <label>
        First Name:
        <input
          type="text"
          value={caregiver.firstname}
          onChange={(e) => setCaregiver({ ...caregiver, firstname: e.target.value })}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={caregiver.lastname}
          onChange={(e) => setCaregiver({ ...caregiver, lastname: e.target.value })}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={caregiver.password}
          onChange={(e) => setCaregiver({ ...caregiver, password: e.target.value })}
        />
      </label>
      <label>
        Birth Date:
        <input
          type="text"
          value={caregiver.birth_date}
          onChange={(e) => setCaregiver({ ...caregiver, birth_date: e.target.value })}
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          value={caregiver.gender}
          onChange={(e) => setCaregiver({ ...caregiver, gender: e.target.value })}
        />
      </label>
      <label>
        Contact Information:
        <input
          type="text"
          value={caregiver.contact_information}
          onChange={(e) => setCaregiver({ ...caregiver, contact_information: e.target.value })}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={caregiver.address}
          onChange={(e) => setCaregiver({ ...caregiver, address: e.target.value })}
        />
      </label>
      <label>
        Specializations:
        <input
          type="text"
          value={caregiver.specializations}
          onChange={(e) => setCaregiver({ ...caregiver, specializations: e.target.value })}
        />
      </label>
      <label>
        Availability:
        <input
          type="text"
          value={caregiver.availability}
          onChange={(e) => setCaregiver({ ...caregiver, availability: e.target.value })}
        />
      </label>
      <label>
        Hourly Rate:
        <input
          type="number"
          value={caregiver.hourlyRate}
          onChange={(e) => setCaregiver({ ...caregiver, hourlyRate: e.target.value })}
        />
      </label>
      <button onClick={handleUpdate}>Update Caregiver</button>
    </div>
  );
};

export default UpdateCaregiver;

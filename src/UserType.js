import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <h2>Choose User Type</h2>
      <button onClick={() => navigate('/register-recipient')}>Recipient</button>
      <button onClick={() => navigate('/register-caregiver')}>Caregiver</button>

      
    </div>
  );
};

export default UserType;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  return (
    <button className="usertype">
      <div className="are-you-caregiver">Are you Caregiver or Recipient?</div>
      <img
        className="vector-icon"
        alt=""
        src="/vector.svg"
        onClick={onVectorClick}
      />
      <div className="usertype-inner" onClick={onGroupContainerClick}>
        <div className="button-wrapper">
          <div className="button">Caregiver</div>
        </div>
      </div>
      <button className="button-container">
        <div className="button">Recipient</div>
      </button>
    </button>
  );
};

export default UserType;

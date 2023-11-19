import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./UserType.css";

const UserType = () => {
  return (
    <div className="usertype">
      <div className="are-you-caregiver">Are you Caregiver or Recipient?</div>
      <img
        className="vector-icon"
        alt=""
        src="/vector.svg"
      />
      <div className="button-container">
        {/* Use Link to navigate to the "RegisterCaregiver" route */}
        <Link to="/register-caregiver">
          <button className="button">Caregiver</button>
        </Link>
      </div>
      <div className="button-container">
        {/* Use Link to navigate to the "RegisterRecipient" route */}
        <Link to="/register-recipient">
          <button className="button">Recipient</button>
        </Link>
      </div>
    </div>
  );
};

export default UserType;

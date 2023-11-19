import { useCallback } from "react";
import "./UserType.css";
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const UserType = () => {
  const onVectorClick = useCallback(() => {
    // Please sync "Login" to the project
  }, []);

  const onGroupContainerClick = useCallback(() => {
    // Please sync "RegisterCaregiver" to the project
  }, []);

  return (
    <div className="usertype">
      <div className="are-you-caregiver">Are you Caregiver or Recipient?</div>
      <img
        className="vector-icon"
        alt=""
        src="/vector.svg"
        onClick={onVectorClick}
      />
      <div className="button-container" onClick={onGroupContainerClick
}>
      <button className="button-container">
      <Link to="/register-caregiver">
        <div className="button">Caregiver</div>
        </Link>
      </button>
    </div>
    <div className="button-container" onClick={onGroupContainerClick}></div>
      <button className="button-container">
      <Link to="/register-caregiver">
        <div className="button">Recipient</div>
        </Link>
      </button>
    </div>
  );
};

export default UserType;
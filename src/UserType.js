import { useCallback } from "react";
import "./UserType.css";

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
      <div className="button-container" onClick={onGroupContainerClick}>
        <button className="button-container">
          <div className="button">Caregiver</div>
        </button>
      </div>
      <button className="button-container">
        <div className="button">Recipient</div>
      </button>
    </div>
  );
};

export default UserType;

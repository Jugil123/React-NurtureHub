import { useCallback } from "react";
import "./RegisterCaregiver.css";

const RegisterCaregiver = () => {
  const onVectorClick = useCallback(() => {
    // Please sync "Desktop - 1" to the project
  }, []);

  return (
    <div className="registercaregiver">
      <input className="registercaregiver-child" type="text" />
      <input className="registercaregiver-item" type="text" />
      <div className="firstname">Firstname</div>
      <div className="lastname">Lastname</div>
      <input className="registercaregiver-inner" type="text" />
      <input className="rectangle-input" type="text" />
      <div className="birth-date">Birth Date</div>
      <div className="gender">Gender</div>
      <input className="registercaregiver-child1" type="text" />
      <input className="registercaregiver-child2" type="text" />
      <div className="contact-information">Contact Information</div>
      <div className="address">Address</div>
      <input className="registercaregiver-child3" type="text" />
      <input className="registercaregiver-child4" type="text" />
      <div className="specializations">Specializations</div>
      <div className="availability">Availability</div>
      <input className="registercaregiver-child5" type="text" />
      <div className="hourly-rate">Hourly Rate</div>
      <h1 className="register-caregiver">Register Caregiver</h1>
      <img
        className="vector-icon"
        alt=""
        src="/vector.svg"
        onClick={onVectorClick}
      />
      <button className="button-wrapper">
        <div className="button">Register</div>
      </button>
    </div>
  );
};

export default RegisterCaregiver;
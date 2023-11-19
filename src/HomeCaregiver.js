import { useCallback } from "react";
import "./HomeCaregiver.css";

const HomeCaregiver = () => {
  const onRecordsClick = useCallback(() => {
    // Please sync "Desktop - 10" to the project
  }, []);

  const onRectangleButton1Click = useCallback(() => {
    // Please sync "Desktop - 5" to the project
  }, []);

  const onRectangleButton2Click = useCallback(() => {
    // Please sync "Desktop - 5" to the project
  }, []);

  const onRectangleButton3Click = useCallback(() => {
    // Please sync "Desktop - 5" to the project
  }, []);

  const onMessagesClick = useCallback(() => {
    // Please sync "Desktop - 6" to the project
  }, []);

  const onGroupContainer1Click = useCallback(() => {
    // Please sync "Login" to the project
  }, []);

  return (
    <div className="homecaregiver">
      <div className="homecaregiver-child" />
      <button className="records" onClick={onRecordsClick}>
        Records
      </button>
      <button className="homecaregiver-item" />
      <input
        className="homecaregiver-inner"
        placeholder="Search Caregiver"
        type="text"
      />
      <img className="vector-icon" alt="" src="/vector.svg" />
      <div className="search-caregiver">Search Caregiver</div>
      <button className="rectangle-button" onClick={onRectangleButton1Click} />
      <div className="firstname-m-lastname">Firstname M. Lastname</div>
      <img className="image-1-icon" alt="" src="/image-1@2x.png" />
      <div className="address">Address</div>
      <button
        className="homecaregiver-child1"
        onClick={onRectangleButton2Click}
      />
      <div className="firstname-m-lastname1">Firstname M. Lastname</div>
      <img className="image-3-icon" alt="" src="/image-3@2x.png" />
      <div className="address1">Address</div>
      <button
        className="homecaregiver-child2"
        onClick={onRectangleButton3Click}
      />
      <div className="firstname-m-lastname2">Firstname M. Lastname</div>
      <img className="image-2-icon" alt="" src="/image-2@2x.png" />
      <div className="address2">Address</div>
      <img className="vector-icon1" alt="" src="/vector1.svg" />
      <div className="vector-parent">
        <img className="vector-icon2" alt="" src="/vector2.svg" />
        <button className="messages" onClick={onMessagesClick}>
          Messages
        </button>
      </div>
      <div className="home">Home</div>
      <img className="image-13-icon" alt="" src="/image-13@2x.png" />
      <div className="vector-group" onClick={onGroupContainer1Click}>
        <img className="vector-icon3" alt="" src="/vector3.svg" />
        <div className="log-out">Log Out</div>
      </div>
    </div>
  );
};

export default HomeCaregiver;

import { useCallback } from "react";
import styles from "./HomeRecipient.module.css";
import { Link, } from 'react-router-dom';

const HomeRecipient = () => {
  const onRectangleButtonClick = useCallback(() => {
    // Please sync "Desktop - 5" to the project
  }, []);

  const onRectangleButton1Click = useCallback(() => {
    // Please sync "Desktop - 5" to the project
  }, []);

  const onRectangleButton2Click = useCallback(() => {
    // Please sync "Desktop - 5" to the project
  }, []);

  const onMessagesClick = useCallback(() => {
    // Please sync "Desktop - 6" to the project
  }, []);

  const onRecordsClick = useCallback(() => {
    // Please sync "Desktop - 10" to the project
  }, []);

  const onGroupButton3Click = useCallback(() => {
    // Please sync "Login" to the project
  }, []);

  return (
    <div className={styles.homerecipient}>
      <div className={styles.homerecipientChild} />
      <input
        className={styles.homerecipientItem}
        placeholder="Search Caregiver"
        type="text"
      />
      
      <button
        className={styles.homerecipientInner}
        onClick={onRectangleButtonClick}
      />
      <div className={styles.firstnameMLastname}>Firstname M. Lastname</div>
      <img className={styles.image1Icon} alt="" src="/andrei.png" />
      <div className={styles.address}>Address</div>
      <button
        className={styles.rectangleButton}
        onClick={onRectangleButton1Click}
      />
      <div className={styles.firstnameMLastname1}>Firstname M. Lastname</div>
      <img className={styles.image3Icon} alt="" src="/britt.png" />
      <div className={styles.address1}>Address</div>
      <button
        className={styles.homerecipientChild1}
        onClick={onRectangleButton2Click}
      />
      <div className={styles.firstnameMLastname2}>Firstname M. Lastname</div>
      <img className={styles.image2Icon} alt="" src="/juspher.png" />
      <div className={styles.address2}>Address</div>
      <button className={styles.vectorParent}>
        <img className={styles.messageIcon1} alt="" src="/message.png" />
        
        <button className={styles.messages} onClick={onMessagesClick}>
          Messages
        </button>
      </button>
      <button className={styles.rectangleParent}>
        <button className={styles.groupChild} />
        <img className={styles.vectorIcon2} alt="" src="/25694.png" />
        <div className={styles.home}>Home</div>
      </button>
      <button className={styles.recordsParent}>
        <button className={styles.records} onClick={onRecordsClick}>
          Records
        </button>
        <img className={styles.image13Icon} alt="" src="/download.png" />
      </button>
      <Link to="/" className={styles.vectorIconLink}>
      <button className={styles.vectorGroup} onClick={onGroupButton3Click}>  
        <div className={styles.logOut}>Log Out</div>
      </button>
      </Link>
    </div>
    
  );
};

export default HomeRecipient;

import { useCallback } from "react";
import styles from "./HomeCaregiver.module.css";
import { Link, } from 'react-router-dom';

const HomeCaregiver = () => {
  const onMessagesTextClick = useCallback(() => {
    // Please sync "Messages" to the project
  }, []);

  const onGroupButton2Click = useCallback(() => {
    // Please sync "Login" to the project
  }, []);

  const onHistoryTextClick = useCallback(() => {
    // Please sync "Desktop - 11" to the project
  }, []);

  return (
    <div className={styles.homecaregiver}>
      <div className={styles.homecaregiverChild} />
      <div className={styles.homecaregiverItem} />
      <div className={styles.firstnameMLastname}>Firstname M. Lastname</div>
      <img className={styles.image1Icon} alt="" src="/andrei.png" />
      <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      <Link to="/message-caregiver" className={styles.vectorIconLink}>
      <button className={styles.vectorParent}>
        <img className={styles.vectorIcon1} alt="" src="/message.png" />
        <div className={styles.messages} onClick={onMessagesTextClick}>
          Messages
        </div>
      </button>
      </Link>
      <button className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img className={styles.vectorIcon2} alt="" src="/25694.png" />
        <div className={styles.home}>Home</div>
      </button>
      <Link to="/" className={styles.vectorIconLink}>
      <button className={styles.vectorGroup} onClick={onGroupButton2Click}>
        <div className={styles.logOut}>Log Out</div>
      </button>
      </Link>
      <Link to="/history-caregiver" className={styles.vectorIconLink}>
      <button className={styles.vectorContainer}>
        <img className={styles.vectorIcon4} alt="" src="/download.png" />
        <div className={styles.history} onClick={onHistoryTextClick}>
          History
        </div>
      </button>
      </Link>
      <div className={styles.bookingRequests}>Booking Requests</div>
      <div className={styles.homecaregiverInner} />
      <div className={styles.firstnameMLastname1}>Firstname M. Lastname</div>
      <img className={styles.image15Icon} alt="" src="/britt.png" />
      <div className={styles.rectangleDiv} />
      <div className={styles.firstnameMLastname2}>Firstname M. Lastname</div>
      <img className={styles.image14Icon} alt="" src="/juspher.png" />
      <button className={styles.buttonWrapper}>
        <div className={styles.button}>Accept</div>
      </button>
      <button className={styles.buttonContainer}>
        <div className={styles.button}>Accept</div>
      </button>
      <button className={styles.buttonFrame}>
        <div className={styles.button}>Accept</div>
      </button>
      <button className={styles.frameButton}>
        <div className={styles.button}>Decline</div>
      </button>
      <button className={styles.buttonWrapper1}>
        <div className={styles.button}>Decline</div>
      </button>
      <button className={styles.buttonWrapper2}>
        <div className={styles.button}>Decline</div>
      </button>
      <button className={styles.buttonWrapper3}>
        <div className={styles.button}>View Details</div>
      </button>
      <button className={styles.buttonWrapper4}>
        <div className={styles.button}>View Details</div>
      </button>
      <button className={styles.buttonWrapper5}>
        <div className={styles.button}>View Details</div>
      </button>
    </div>
  );
};

export default HomeCaregiver;

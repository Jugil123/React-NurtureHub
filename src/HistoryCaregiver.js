import { useCallback } from "react";
import styles from "./HistoryCaregiver.module.css";
import { Link, } from 'react-router-dom';

const HistoryCaregiver = () => {
  const onHomeTextClick = useCallback(() => {
    // Please sync "HomeCaregiver" to the project
  }, []);

  const onGroupContainerClick = useCallback(() => {
    // Please sync "Login" to the project
  }, []);

  return (
    <div className={styles.historycaregiver}>
      <div className={styles.serviceHistory}>Service History</div>
      <div className={styles.historycaregiverChild} />
      <Link to="/message-caregiver" className={styles.vectorIconLink}>
      <button className={styles.vectorParent}>
        <img className={styles.vectorIcon} alt="" src="/message.png" />
        <div className={styles.messages}>Messages</div>
      </button>
      </Link>
      <Link to="/message-caregiver" className={styles.vectorIconLink}>
      <button className={styles.vectorGroup}>
        <img className={styles.vectorIcon1} alt="" src="/25694.png" />
        <div className={styles.home} onClick={onHomeTextClick}>
          Home
        </div>
      </button>
      </Link>
      <button className={styles.historycaregiverItem} />
      <div className={styles.firstnameMLastname}>Firstname M. Lastname</div>
      <img className={styles.image1Icon} alt="" src="/ambos.png" />
      <div className={styles.address}>Address</div>
      <button className={styles.historycaregiverInner} />
      <div className={styles.firstnameMLastname1}>Firstname M. Lastname</div>
      <img className={styles.image3Icon} alt="" src="/xevery.jpg" />
      <div className={styles.address1}>Address</div>
      <button className={styles.rectangleButton} />
      <div className={styles.firstnameMLastname2}>Firstname M. Lastname</div>
      <img className={styles.image2Icon} alt="" src="/errol.jpg" />
      <div className={styles.address2}>Address</div>
      <button className={styles.groupButton}>
        <div className={styles.vectorContainer} onClick={onGroupContainerClick}>
          
          <div className={styles.logOut}>Log Out</div>
        </div>
      </button>
      <button className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img className={styles.vectorIcon3} alt="" src="/download.png" />
        <div className={styles.history}>History</div>
      </button>
    </div>
  );
};

export default HistoryCaregiver;

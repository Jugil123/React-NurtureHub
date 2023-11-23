import { useCallback } from "react";
import styles from "./MessageCaregiver.module.css";
import { Link, } from 'react-router-dom';

const MessageCaregiver = () => {
  const onGroupButton2Click = useCallback(() => {
    // Please sync "Login" to the project
  }, []);

  const onGroupButton3Click = useCallback(() => {
    // Please sync "HistoryCaregiver" to the project
  }, []);

  return (
    <div className={styles.messagecaregiver}>
      <div className={styles.messagecaregiverChild} />
      <div className={styles.messagecaregiverItem} />
      <div className={styles.messagecaregiverInner} />
      <input
        className={styles.rectangleInput}
        placeholder="Type a message"
        type="text"
      />
      <button className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img className={styles.vectorIcon} alt="" src="/message.png" />
        <div className={styles.messages}>Messages</div>
      </button>
      <Link to="/home-caregiver" className={styles.vectorIconLink}>
      <button className={styles.vectorParent}>
        <img className={styles.vectorIcon1} alt="" src="/25694.png" />
        <button className={styles.home}>Home</button>
      </button>
      </Link>
      <input className={styles.groupInput} placeholder="Search" type="text" />
      <a className={styles.rectangleA} />
      <img className={styles.image1Icon} alt="" src="/jugil.png" />
      
      <img className={styles.image8Icon} alt="" src="/isaiah.png" />
      {/* <img className={styles.image9Icon} alt="" src="/jugil.png" /> */}
      <img className={styles.image7Icon} alt="" src="/isaiah.png" />
      <div className={styles.firstnameMLastname}>Firstname M. Lastname</div>
      <div className={styles.hello}>Hello</div>
      <a className={styles.messagecaregiverChild1} />
      <img className={styles.image12Icon} alt="" src="/juspher.png" />
      <div className={styles.firstnameMLastname1}>Firstname M. Lastname</div>
      <div className={styles.hello1}>Hello</div>
      <a className={styles.messagecaregiverChild2} />
      <img className={styles.image11Icon} alt="" src="/britt.png" />
      <div className={styles.firstnameMLastname2}>Firstname M. Lastname</div>
      <div className={styles.hello2}>Hello</div>
      <a className={styles.messagecaregiverChild3} />
      <img className={styles.image10Icon} alt="" src="/andrei.png" />
      <div className={styles.firstnameMLastname3}>Firstname M. Lastname</div>
      <div className={styles.hello3}>Hello</div>
      <div className={styles.firstnameMLastname4}>Firstname M. Lastname</div>
      <div className={styles.rectangleDiv} />
      <div className={styles.hello4}>Hello</div>
      <div className={styles.messagecaregiverChild4} />
      {/* <div className={styles.hello5}>Hello!</div> */}
      <Link to="/" className={styles.vectorIconLink}>
      <button className={styles.vectorGroup} onClick={onGroupButton2Click}>
        <div className={styles.logOut}>Log Out</div>
      </button>
      </Link>
      <Link to="/history-caregiver" className={styles.vectorIconLink}>
      <button className={styles.vectorContainer} onClick={onGroupButton3Click}>
        <img className={styles.vectorIcon4} alt="" src="/download.png" />
        <div className={styles.history}>History</div>
      </button>
      </Link>
    </div>
  );
};

export default MessageCaregiver;

import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./UserType.module.css";

const UserType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };
  const onVectorIconClick = useCallback(() => {
    
  }, []);

  return (
    <div className={styles.usertype}>
      <div className={styles.areYouCaregiver}>
        Are you Caregiver or Recipient?
      </div>
      <img
        className={styles.vectorIcon}
        alt=""
        src="/vector.svg"
        onClick={onVectorIconClick}
      />
      <button className={styles.buttonWrapper}  onClick={() => navigate('/register-recipient')}>
        <div className={styles.button}>Recipient</div>
      </button>
      <button className={styles.buttonContainer} onClick={() => navigate('/register-caregiver')}>
        <div className={styles.button}>Caregiver</div>
      </button>
    </div>
  );
};

export default UserType;

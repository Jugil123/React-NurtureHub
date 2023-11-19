import { useCallback } from "react";
import styles from "./RegisterCaregiver.module.css";

const RegisterCaregiver = () => {
  const onVectorClick = useCallback(() => {
    // Please sync "Desktop - 1" to the project
  }, []);

  return (
    <div className={styles.registercaregiver}>
      <input className={styles.registercaregiverChild} type="text" />
      <input className={styles.registercaregiverItem} type="text" />
      <div className={styles.firstname}>Firstname</div>
      <div className={styles.lastname}>Lastname</div>
      <input className={styles.registercaregiverInner} type="text" />
      <input className={styles.rectangleInput} type="text" />
      <div className={styles.birthDate}>Birth Date</div>
      <div className={styles.gender}>Gender</div>
      <input className={styles.registercaregiverChild1} type="text" />
      <input className={styles.registercaregiverChild2} type="text" />
      <div className={styles.contactInformation}>Contact Information</div>
      <div className={styles.address}>Address</div>
      <input className={styles.registercaregiverChild3} type="text" />
      <input className={styles.registercaregiverChild4} type="text" />
      <div className={styles.specializations}>Specializations</div>
      <div className={styles.availability}>Availability</div>
      <input className={styles.registercaregiverChild5} type="text" />
      <div className={styles.hourlyRate}>Hourly Rate</div>
      <h1 className={styles.registerCaregiver}>Register Caregiver</h1>
      <img
        className={styles.vectorIcon}
        alt=""
        src="/vector.svg"
        onClick={onVectorClick}
      />
      <button className={styles.buttonWrapper}>
        <div className={styles.button}>Register</div>
      </button>
    </div>
  );
};

export default RegisterCaregiver;

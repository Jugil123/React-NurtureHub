import styles from "./Feedback.module.css";
import { useEffect } from "react";

const Feedback = () => {

    useEffect(() => {
        document.title = "NurtureHub | Feedback";
      }, []); 
    
  return (
    <div className={styles.feedback}>
      <div className={styles.feedbackChild} />
      <div className={styles.feedbackItem} />
      <img className={styles.x1Icon} alt="" src="/x-1@2x.png" />
      <div className={styles.nurturehubParent}>
        <div className={styles.nurturehub}>NurtureHub</div>
        <img
          className={styles.nurturehublogo2Icon}
          alt=""
          src="/nurturehublogo-2@2x.png"
        />
      </div>
      <div className={styles.feedbackInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.feedbackChild1} />
      <button className={styles.buttonWrapper}>
        <div className={styles.button}>Submit</div>
      </button>
      <div className={styles.feedback1}>Feedback</div>
      <input className={styles.rectangleInput}  placeholder="Feedback:" type="text" />
      <input className={styles.feedbackChild2}  placeholder="Rating: 1-5" type="number" />
    </div>
  );
};

export default Feedback;

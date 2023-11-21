import styles from "./LandinPage.module.css";
import { Link, useNavigate } from 'react-router-dom';

const LandinPage = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.landinpage}>
    <Link  className={styles.aboutUs} to="/about-us">About us</Link>
    <Link  className={styles.logIn} to="/Login">Log in</Link>
      <div className={styles.landinpageInner}>
        <button className={styles.rectangleParent} onClick={() => navigate('/user-type')}>
          <div className={styles.groupChild} />
          <div className={styles.register}>Register</div>
        </button>
      </div>
      <div className={styles.button}>
        <div className={styles.activeParent}>
          <div className={styles.active}>
            <div className={styles.button1}>BUTTON</div>
          </div>
          <div className={styles.property1inactive}>
            <div className={styles.button1}>BUTTON</div>
          </div>
        </div>
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.groupItem} />
        <b className={styles.theEasiestWay}>
          The easiest way to book caregiver
        </b>
        <div className={styles.withJustA}>
          With just a few taps, you can access a pool of qualified and
          compassionate caregivers who match your specific needs.
        </div>
        <img
          className={styles.caregiving21Icon}
          alt=""
          src="/caregiving2-1@2x.png"
        />
      </div>
      <button className={styles.rectangleContainer} onClick={() => navigate('/user-type')}>
        <div className={styles.groupInner} />
        <div className={styles.registerAndBook}>Register and book</div>
      </button>
      <div className={styles.nurturehubParent}>
        <div className={styles.nurturehub}>NurtureHub</div>
        <img
          className={styles.nurturehublogo2Icon}
          alt=""
          src="/nurturehublogo-2@2x.png"
        />
      </div>
    </div>
  );
};

export default LandinPage;

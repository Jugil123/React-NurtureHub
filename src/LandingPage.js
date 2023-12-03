import Footer from "./Footer";
import styles from "./LandinPage.module.css";
import { Link, useNavigate } from 'react-router-dom';

const LandinPage = () => {
    const navigate = useNavigate();

    const onRegisterClick = () => {
      document.title = "NurtureHub";
      navigate('/register-recipient');
  };
  return (
    <div className={styles.landinpage}>
      <Link className={styles.logIn} to="/Login">Log in</Link>
      <div className={styles.landinpageInner}>
                <button className={styles.rectangleParent} onClick={onRegisterClick}>
                    <div className={styles.groupChild} />
                    <div className={styles.register}>Register</div>
                </button>
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
      <button className={styles.rectangleContainer} onClick={() => navigate('/register-recipient')}>
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
      <Footer
        propTop="1074px"
      />
    </div>
  );
};

export default LandinPage;

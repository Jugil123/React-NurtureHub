import { useEffect } from "react";
import Footer from "./Footer";
import styles from "./Aboutus.module.css";
import { Link } from 'react-router-dom';

const Aboutus = () => {

  useEffect(() => {
    document.title = "NurtureHub | About Us";
  }, []); 

  return (
    <div className={styles.aboutus}>
      <div className={styles.nurturehublogo42x1Parent}>
        <img
          className={styles.nurturehublogo42x1Icon}
          alt=""
          src="/nurturehublogo42x-1@2x.png"
        />
        <div className={styles.nurturehub}>NURTUREHUB</div>
      </div>
      <div className={styles.vectorParent}>
        <img className={styles.groupChild} alt="" src="/rectangle-69.svg" />
        <div className={styles.welcomeToNurture}>
          Welcome to Nurture Hub, where compassionate care meets cutting-edge
          technology. Founded by Andrei Salinas, Nurture Hub is a vision brought
          to life by a team of dedicated individuals: Co-founders Jugil
          Cabuenas, Juspher Patent, Britt Caneda, and Isaiah Garciano. Together,
          we are driven by a shared commitment to redefine caregiving services
          in Cebu. Our platform connects individuals with skilled and reliable
          caregivers, offering a seamless and personalized experience. At
          Nurture Hub, we believe in the transformative power of nurturing care,
          and we are dedicated to providing a hub where trust, compassion, and
          excellence converge. Join us on this journey to make a positive impact
          on the way care is delivered and experienced.
        </div>
      </div>
      <div className={styles.aboutusChild} />
      <div className={styles.isaiah1Parent}>
        <img className={styles.isaiah1Icon} alt="" src="/isaiah-1@2x.png" />
        <img className={styles.britt1Icon} alt="" src="/britt-1@2x.png" />
        <img className={styles.juspher1Icon} alt="" src="/juspher-1@2x.png" />
        <img className={styles.jugil1Icon} alt="" src="/jugil-1@2x.png" />
        <img className={styles.andrei1Icon} alt="" src="/andrei-1@2x.png" />
      </div>
      <div className={styles.founderParent}>
        <b className={styles.founder}>FOUNDER</b>
        <b className={styles.coFounder}>CO-FOUNDER</b>
        <b className={styles.coFounder1}>CO-FOUNDER</b>
        <b className={styles.coFounder2}>CO-FOUNDER</b>
        <b className={styles.coFounder3}>CO-FOUNDER</b>
      </div>
      <div className={styles.nurturehubParent}>
        <div className={styles.nurturehub1}>NurtureHub</div>
        <img
          className={styles.nurturehublogo2Icon}
          alt=""
          src="/nurturehublogo-2@2x.png"
        />
      </div>
      <img className={styles.image16Icon} alt="" src="/image-16@2x.png" />
      <Footer />
      <Link to="/" className={styles.vectorIconLink}>
        <img
          className={styles.vectorIcon}
          alt=""
          src="/vector.svg"
        />
        </Link>
    </div>
  );
};

export default Aboutus;

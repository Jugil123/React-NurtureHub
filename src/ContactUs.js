import Footer from "./Footer";
import styles from "./ContactUs.module.css";
import { Link } from 'react-router-dom';

const ContactUs = () => {
  
  return (
    <div className={styles.contactUs}>
      <div className={styles.nurturehubParent}>
        <div className={styles.nurturehub}>NurtureHub</div>
        <img
          className={styles.nurturehublogo2Icon}
          alt=""
          src="/nurturehublogo-2@2x.png"
        />
      </div>
      <Link to="/" className={styles.vectorIconLink}>
      <img
        className={styles.vectorIcon}
        alt=""
        src="/vector.svg"
      />
      </Link>
      <img className={styles.image17Icon} alt="" src="/image-17@2x.png" />
      <Footer propTop="1140px" />
      <div className={styles.contactUs1}>CONTACT US</div>
      <div className={styles.contactUsChild} />
      <div className={styles.contactUsItem} />
      <div className={styles.phoneNumber1234567890Container}>
        <p className={styles.emailAddressNurturehubgmai}>
          Phone Number: 123-4567-890
        </p>
        <p className={styles.emailAddressNurturehubgmai}>
          Email Address: NurtureHub@gmail.com
        </p>
        <p className={styles.emailAddressNurturehubgmai}>
          We work 24/7 to answer your questions!
        </p>
      </div>
    </div>
  );
};

export default ContactUs;

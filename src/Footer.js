import { useMemo } from "react";
import { Link } from "react-router-dom";
import Property1Default3 from "./Property1Default3";
import Property1Default1 from "./Property1Default1";
import Property1Default from "./Property1Default";
import styles from "./Footer.module.css";

const Footer = ({ propTop }) => {
  const groupDivStyle = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div className={styles.groupParent} style={groupDivStyle}>
      <div className={styles.groupContainer}>
        <div className={styles.nurturehubParent}>
          <div className={styles.nurturehub}>NurtureHub</div>
          <div className={styles.empathyUnleashedCare}>
            Empathy Unleashed, Care Redefined: Nurture Hub, Where Hearts Connect
            and Lives Flourish
          </div>
          <Property1Default3
            dimension="/social-icons.svg"
            property1DefaultWidth="44px"
            property1DefaultHeight="45px"
            property1DefaultPosition="absolute"
            property1DefaultTop="109px"
            property1DefaultLeft="3px"
            socialIconsHeight="68.44%"
            socialIconsWidth="69.55%"
            socialIconsTop="15.78%"
            socialIconsRight="14.32%"
            socialIconsBottom="15.78%"
            socialIconsLeft="16.14%"
          />
          <img className={styles.groupChild} alt="" src="/group-65.svg" />
          <Property1Default1
            locationCoordinates="/social-icons1.svg"
            property1DefaultWidth="44px"
            property1DefaultHeight="45px"
            property1DefaultPosition="absolute"
            property1DefaultTop="109px"
            property1DefaultLeft="148px"
            socialIconsHeight="68.44%"
            socialIconsWidth="69.55%"
            socialIconsTop="15.78%"
            socialIconsRight="14.32%"
            socialIconsBottom="15.78%"
            socialIconsLeft="16.14%"
          />
          <Property1Default
            socialIcons="/social-icons2.svg"
            property1DefaultWidth="44px"
            property1DefaultHeight="45px"
            property1DefaultPosition="absolute"
            property1DefaultTop="109px"
            property1DefaultLeft="221px"
            socialIconsHeight="68.44%"
            socialIconsWidth="69.55%"
            socialIconsTop="15.78%"
            socialIconsRight="14.32%"
            socialIconsBottom="15.78%"
            socialIconsLeft="16.14%"
          />
        </div>
        <div className={styles.aboutUsParent}>
        <Link to="/about-us" className={styles.aboutUs}>
            About us
          </Link>
          <div className={styles.faq}> FAQ</div>
          <Link to="/contact-us" className={styles.contactUs}>
            Contact us
          </Link>
        </div>
      </div>
      <div className={styles.copyright2023}>
        Copyright © 2023 NurtureHub. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

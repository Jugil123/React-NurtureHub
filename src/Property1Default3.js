import { useMemo } from "react";
import styles from "./Property1Default3.module.css";

const Property1Default3 = ({
  dimension,
  property1DefaultWidth,
  property1DefaultHeight,
  property1DefaultPosition,
  property1DefaultTop,
  property1DefaultLeft,
  socialIconsHeight,
  socialIconsWidth,
  socialIconsTop,
  socialIconsRight,
  socialIconsBottom,
  socialIconsLeft,
}) => {
  const property1Default2Style = useMemo(() => {
    return {
      width: property1DefaultWidth,
      height: property1DefaultHeight,
      position: property1DefaultPosition,
      top: property1DefaultTop,
      left: property1DefaultLeft,
    };
  }, [
    property1DefaultWidth,
    property1DefaultHeight,
    property1DefaultPosition,
    property1DefaultTop,
    property1DefaultLeft,
  ]);

  const socialIcons2Style = useMemo(() => {
    return {
      height: socialIconsHeight,
      width: socialIconsWidth,
      top: socialIconsTop,
      right: socialIconsRight,
      bottom: socialIconsBottom,
      left: socialIconsLeft,
    };
  }, [
    socialIconsHeight,
    socialIconsWidth,
    socialIconsTop,
    socialIconsRight,
    socialIconsBottom,
    socialIconsLeft,
  ]);

  return (
    <div className={styles.property1default} style={property1Default2Style}>
      <div className={styles.property1defaultChild} />
      <img
        className={styles.socialIcons}
        alt=""
        src={dimension}
        style={socialIcons2Style}
      />
    </div>
  );
};

export default Property1Default3;

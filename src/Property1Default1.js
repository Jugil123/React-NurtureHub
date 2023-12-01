import { useMemo } from "react";
import styles from "./Property1Default1.module.css";

const Property1Default1 = ({
  locationCoordinates,
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
  const property1Default1Style = useMemo(() => {
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

  const socialIcons1Style = useMemo(() => {
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
    <div className={styles.property1default} style={property1Default1Style}>
      <div className={styles.property1defaultChild} />
      <img
        className={styles.socialIcons}
        alt=""
        src={locationCoordinates}
        style={socialIcons1Style}
      />
    </div>
  );
};

export default Property1Default1;

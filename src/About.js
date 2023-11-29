import { useCallback, useEffect } from "react";
import styles from "./Aboutus.module.css";
import { Link, useNavigate } from 'react-router-dom';

const Aboutus = () => {
  const navigate = useNavigate();

  const onVectorClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    document.title = "NurtureHub | About Us";
  }, []); 

  return (
    <div className={styles.aboutus}>
      <div className={styles.vectorParent}>
        <img className={styles.groupChild} alt="" src="/rectangle-67.svg" />
        <img className={styles.groupItem} alt="" src="/rectangle-63.svg" />
        <img className={styles.groupInner} alt="" src="/rectangle-61.svg" />
        <div className={styles.nameIsaiahJohn}>
          Name: Isaiah John G. Garciano
        </div>
        <div className={styles.mottoWhenYour}>
          Motto: When your heart is set on something, you get closer to your
          goal with each passing day.
        </div>
        <div className={styles.coFounder}>
          <span>CO</span>
          <span className={styles.founder}>-FOUNDER</span>
        </div>
        <img className={styles.isaiah1Icon} alt="" src="/isaiah-1@2x.png" />
      </div>
      <div className={styles.vectorGroup}>
        <img className={styles.groupChild} alt="" src="/rectangle-67.svg" />
        <img className={styles.groupItem} alt="" src="/rectangle-63.svg" />
        <img className={styles.groupInner} alt="" src="/rectangle-61.svg" />
        <div className={styles.nameIsaiahJohn}>
          Name: Britt Michaels B. Cañeda
        </div>
        <div className={styles.mottoWhenYour}>Motto: Stay Hard.</div>
        <div className={styles.coFounder}>
          <span>CO</span>
          <span className={styles.founder}>-FOUNDER</span>
        </div>
        <img className={styles.britt1Icon} alt="" src="/britt-1@2x.png" />
      </div>
      <div className={styles.rectangleParent}>
      <img className={styles.groupChild} alt="" src="/rectangle-67.svg" />
        <img className={styles.groupItem} alt="" src="/rectangle-63.svg" />
        <img className={styles.groupInner} alt="" src="/rectangle-61.svg" />
        <div className={styles.nameIsaiahJohn}>Name: Juspher A. Pateña</div>
        <div className={styles.mottoWhenYour}>
          Motto: Embrace mistakes as the tension that propels you towards
          growth.
        </div>
        <div className={styles.coFounder}>
          <span>CO</span>
          <span className={styles.founder}>-FOUNDER</span>
        </div>
        <img className={styles.britt1Icon} alt="" src="/juspher-1@2x.png" />
      </div>
      <div className={styles.rectangleGroup}>
      <img className={styles.groupChild} alt="" src="/rectangle-67.svg" />
        <img className={styles.groupItem} alt="" src="/rectangle-63.svg" />
        <img className={styles.groupInner} alt="" src="/rectangle-61.svg" />
        <div className={styles.nameIsaiahJohn}>Name: Jugil P. Cabuenas</div>
        <div className={styles.mottoWhenYour}>
          Motto: Persevere, persist, and emerge stronger.
        </div>
        <div className={styles.coFounder}>
          <span>CO</span>
          <span className={styles.founder}>-FOUNDER</span>
        </div>
        <img className={styles.britt1Icon} alt="" src="/jugil-1@2x.png" />
      </div>
      <div className={styles.rectangleContainer}>
      <img className={styles.groupChild} alt="" src="/rectangle-67.svg" />
        <img className={styles.groupItem} alt="" src="/rectangle-63.svg" />
        <img className={styles.groupInner} alt="" src="/rectangle-61.svg" />
        <div className={styles.nameAndreiVincent}>
          Name: Andrei Vincent A. Salinas
        </div>
        <div className={styles.mottoEncourageYourself}>
          Motto: Encourage yourself, believe in yourself, and love yourself.
          Never doubt of who you are.
        </div>
        <div className={styles.founder4}>
          <span>F</span>
          <span className={styles.founder}>OUNDER</span>
        </div>
        <img className={styles.andrei1Icon} alt="" src="/andrei-1@2x.png" />
      </div>
      <div className={styles.nurturehublogo42x1Parent}>
        <img
          className={styles.nurturehublogo42x1Icon}
          alt=""
          src="/nurturehublogo42x-1@2x.png"
        />
        <div className={styles.nurturehub}>NURTUREHUB</div>
        <Link to="/" className={styles.vectorIconLink}>
        <img
          className={styles.vectorIcon}
          alt=""
          src="/vector.svg"
          onClick={onVectorClick}
        />
        </Link>
        <div className={styles.aboutUs}>ABOUT US</div>
      </div>
    </div>
  );
};

export default Aboutus;

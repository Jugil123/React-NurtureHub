import Footer from "./Footer";
import styles from "./FAQ.module.css";
import { Link } from 'react-router-dom';

const FAQ = () => {
  return (
    <div className={styles.faq}>
      <Footer
        propTop="1779px"
        aboutUsCursor="unset"
        contactUsCursor="unset"
        copyright2023Display="inline-block"
        groupDivLeft="448px"
      />
      <div className={styles.faqChild} />
      <Link to="/">
      <img className={styles.x1Icon} alt="" src="/x-1@2x.png" />
      </Link>
      <div className={styles.nurturehubParent}>
        <div className={styles.nurturehub}>NurtureHub</div>
        <img
          className={styles.nurturehublogo2Icon}
          alt=""
          src="/nurturehublogo-2@2x.png"
        />
      </div>
      <div className={styles.frequentlyAskedQuestions}>
        Frequently Asked Questions:
      </div>
      <div className={styles.faqItem} />
      <div className={styles.faqInner} />
      <div className={styles.qIsNurturehubContainer}>
        <p className={styles.qIsNurturehubUserFriendly}>
          <b>Q: Is NurtureHub user-friendly and easy to navigate?</b>
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>
          A: Absolutely! NurtureHub is designed with user simplicity in mind.
          Our intuitive interface ensures a seamless experience for both Care
          Recipients and Caregivers. Easily browse profiles, initiate service
          requests, and leave reviews – NurtureHub makes caregiving accessible
          and hassle-free for everyone.
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>&nbsp;</p>
        <p className={styles.qIsNurturehubUserFriendly}>
          <b>Q: How does NurtureHub work for Care Recipients?</b>
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>
          A: NurtureHub allows Care Recipients to find and connect with skilled
          caregivers easily. Simply search for caregivers based on your needs,
          review profiles, and request caregiving services. NurtureHub
          streamlines the process, making it simple to receive quality care.
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>&nbsp;</p>
        <p className={styles.qIsNurturehubUserFriendly}>
          <b className={styles.qWhatTypes}>
            Q: What types of caregiving services are available on NurtureHub?
          </b>
          <span></span>
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>
          A: NurtureHub offers a variety of caregiving services, including but
          not limited to companionship, medical assistance, and personal care.
          Care Recipients can find caregivers with expertise in specific areas,
          ensuring a tailored and comprehensive range of caregiving support.
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>&nbsp;</p>
        <p className={styles.qIsNurturehubUserFriendly}>
          <b>Q: How do I leave a review for a caregiver?</b>
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>
          A: After receiving caregiving services, Care Recipients can leave
          reviews and ratings for their caregivers. Simply navigate to the
          caregiver's profile and use the provided feedback options. Your
          reviews contribute to the community by helping others make informed
          decisions.
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>&nbsp;</p>
        <p className={styles.qIsNurturehubUserFriendly}>
          <b>Q: Is NurtureHub available outside of Cebu?</b>
        </p>
        <p className={styles.qIsNurturehubUserFriendly}>
          A: Currently, NurtureHub operates in Cebu. However, we are actively
          exploring opportunities to expand our services to other locations.
          Stay tuned for updates as we work towards making NurtureHub accessible
          to a broader audience.
        </p>
      </div>
    </div>
  );
};

export default FAQ;

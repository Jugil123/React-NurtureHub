import { useCallback } from "react";
import styles from "./RegisterCaregiver.module.css";

const RegisterCaregiver = () => {
<<<<<<< Updated upstream
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [specializations, setSpecializations] = useState('');
  const [availability, setAvailability] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/caregiver/insertCaregiver', {
        firstname,
        lastname,
        username,
        password,
        birth_date: birthDate,
        gender,
        contact_information: contactInfo,
        address,
        specializations,
        availability,
        hourlyRate,
      });

      const accountResponse = await axios.post('http://localhost:8080/account/insertAccount', {
        username,
        password,
        userType: 2, // Assuming usertype 1 corresponds to recipient
      });

      // Handle successful registration (e.g., show success message, redirect, etc.)
      console.log('Registration Successful', response.data);
      navigate('/home-caregiver');
      
    } catch (error) {
      // Handle registration failure (e.g., show error message)
      console.error('Registration Failed', error.response.data);
    }
  };
  
=======
  const onVectorClick = useCallback(() => {
    // Please sync "Desktop - 1" to the project
  }, []);
 
>>>>>>> Stashed changes
  return (
    <div className={styles.registercaregiver}>
      <input className={styles.registercaregiverChild} type="text" />
      <input className={styles.registercaregiverItem} type="text" />
      <div className={styles.firstname}>Firstname</div>
      <div className={styles.lastname}>Lastname</div>
      <input className={styles.registercaregiverInner} type="text" />
      <input className={styles.rectangleInput} type="text" />
      <div className={styles.birthDate}>Birth Date</div>
      <div className={styles.gender}>Gender</div>
      <input className={styles.registercaregiverChild1} type="text" />
      <input className={styles.registercaregiverChild2} type="text" />
      <div className={styles.contactInformation}>Contact Information</div>
      <div className={styles.address}>Address</div>
      <input className={styles.registercaregiverChild3} type="text" />
      <input className={styles.registercaregiverChild4} type="text" />
      <div className={styles.specializations}>Specializations</div>
      <div className={styles.availability}>Availability</div>
      <input className={styles.registercaregiverChild5} type="text" />
      <div className={styles.hourlyRate}>Hourly Rate</div>
      <h1 className={styles.registerCaregiver}>Register Caregiver</h1>
      <img
        className={styles.vectorIcon}
        alt=""
        src="/vector.svg"
        onClick={onVectorClick}
      />
      <button className={styles.buttonWrapper}>
        <div className={styles.button}>Register</div>
      </button>
    </div>
  );
};

export default RegisterCaregiver;
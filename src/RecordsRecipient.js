import React, { useState, useEffect } from 'react';
import styles from './RecordsRecipient.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [medicalRecords, setMedicalRecords] = useState(null);
  const [addingRecord, setAddingRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    allergies: '',
    medical_conditions: '',
    medications: '',
    past_surgeries: '',
    family_history: '',
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    // Perform any initial setup using userObject if needed
    console.log('userObject:', userObject);
    // Fetch medical records when the component mounts
    if (userObject) {
      fetchMedicalRecords(userObject.username);
    }
  }, [userObject]);

  const fetchMedicalRecords = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/record/getRecordByRecipient/${username}`);
      setMedicalRecords(response.data);
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };

  const handleAddRecord = () => {
    setAddingRecord(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord({
      ...newRecord,
      [name]: value,
    });
  };

  const handleSaveRecord = async () => {
    try {
      // Add the new record to the backend
      await axios.post('http://localhost:8080/record/insertRecord', {
        recipient: userObject.username,
        ...newRecord,
      });

      // Refetch medical records after adding a new record
      fetchMedicalRecords(userObject.username);

      // Reset the form and exit the adding mode
      setNewRecord({
        allergies: '',
        medical_conditions: '',
        medications: '',
        past_surgeries: '',
        family_history: '',
      });
      setAddingRecord(false);
    } catch (error) {
      console.error('Error adding medical record:', error);
    }
  };

  const navigateToMyProfile = () => {
    navigate('/my-profile', { state: { userObject } });
  };

  const navigateToViewCaregiver = (userId) => {
    navigate(`/view-caregiver/${userId}`, { state: { userObject } });
  };

  const navigateToMessageRecipient = () => {
    navigate('/message-recipient', { state: { userObject } });
  };

  const navigateToRecordsRecipient = () => {
    navigate('/records-recipient', { state: { userObject } });
  };

  const navigateToHomeRecipient = () => {
    navigate('/home-recipient', { state: { userObject } });
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.navColumn}>
        <div className={styles.logoContainer}>
          <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
        </div>
        <div onClick={navigateToMyProfile} className={styles.userProfileContainer}>
          <img src="/sample.png" alt="Profile" className={styles.userProfilePicture} />
          <div>
            {userObject ? (
              <p className={styles.userProfileInfo}>{`${userObject.firstname} ${userObject.lastname}`}</p>
            ) : (
              <p className={styles.userProfileInfo}>Loading...</p>
            )}
          </div>
        </div>
        <div>
          <ul className={styles.navLinksContainer}>
            <li>
              <div className={styles.navLink} onClick={navigateToHomeRecipient}>
                <img src="/home-icon.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Home
              </div>
            </li>
            <li>
              <div
                className={styles.navLink}
                onClick={navigateToMessageRecipient}
              >
                <img src="/messages-icon.svg" alt="Messages" className={styles.navIcon} /> Messages
              </div>
            </li>
            <li>
              <div className={`${styles.navLink} ${styles.activeNavLink}`} onClick={navigateToRecordsRecipient}>
                <img src="/records-icon.svg" alt="Records" className={styles.navIcon} /> Records
              </div>
            </li>
            <li>
              <a href="/login" className={styles.navLink}>
                <img src="/logout-icon.svg" alt="Logout" className={styles.navIcon} /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.contentColumn}>
        <h2>Medical Records</h2>

        {medicalRecords ? (
          // Display medical records if available
          <div key={medicalRecords.recordId} className={styles.medicalRecord}>
          <p><strong>Allergies:</strong> {medicalRecords.allergies}</p>
          <p><strong>Medical Conditions:</strong> {medicalRecords.medical_conditions}</p>
          <p><strong>Medications:</strong> {medicalRecords.medications}</p>
          <p><strong>Past Surgeries:</strong> {medicalRecords.past_surgeries}</p>
          <p><strong>Family History:</strong> {medicalRecords.family_history}</p>
        </div>
        ) : (
          // Display a message if no medical records are available
          <div>
            <p>You did not add yet your medical records.</p>
            <button onClick={handleAddRecord}>Add Now</button>
          </div>
        )}

        {addingRecord && (
          <div>
            <h3>Add Medical Record</h3>
            <form>
              <label>
                Allergies:
                <input type="text" name="allergies" value={newRecord.allergies} onChange={handleInputChange} />
              </label>
              <label>
                Medical Conditions:
                <input type="text" name="medical_conditions" value={newRecord.medical_conditions} onChange={handleInputChange} />
              </label>
              <label>
                Medications:
                <input type="text" name="medications" value={newRecord.medications} onChange={handleInputChange} />
              </label>
              <label>
                Past Surgeries:
                <input type="text" name="past_surgeries" value={newRecord.past_surgeries} onChange={handleInputChange} />
              </label>
              <label>
                Family History:
                <input type="text" name="family_history" value={newRecord.family_history} onChange={handleInputChange} />
              </label>
              <button type="button" onClick={handleSaveRecord}>Save</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

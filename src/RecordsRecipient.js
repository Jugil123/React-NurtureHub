import React, { useState, useEffect } from 'react';
import styles from './RecordsRecipient.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Adjust the import path as necessary

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [medicalRecords, setMedicalRecords] = useState(null);
  const [addingRecord, setAddingRecord] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const userType = location.state ? location.state.userType : null;
  const { theme } = useTheme(); // Using useTheme hook
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Records";
  }, []); 

  const [newRecord, setNewRecord] = useState({
    allergies: '',
    medical_conditions: '',
    medications: '',
    past_surgeries: '',
    family_history: '',
  });
 

  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // If the authentication token doesn't exist, navigate to the login page
      navigate('/login');
    } 
  }, [navigate]);

  useEffect(() => {
    // Perform any initial setup using userObject if needed
    console.log('userObject:', userObject);
    // Fetch medical records when the component mounts
    if (userType === 'recipient' && userObject) {
      fetchRecipientDetails(userObject.recipientId);
      fetchMedicalRecords(userObject.username);
      
    }
  }, [userType, userObject]);

  const fetchRecipientDetails = async (recipientId) => {
    try {
      const response = await axios.get(`http://localhost:8080/recipient/getRecipientById/${recipientId}`);
      console.log('Recipient Details123:', response.data);
      setRecipient(response.data);
    } catch (error) {
      console.error('Error fetching caregiver details:', error);
    }
  };

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
    navigate('/my-profile', { state: { userObject, userType: 'recipient' } });
  };

  const navigateToViewCaregiver = (userId) => {
    navigate(`/view-caregiver/${userId}`, { state: { userObject, userType: 'recipient' } });
  };

  const navigateToMessageRecipient = () => {
    navigate('/message-recipient', { state: { userObject, userType: 'recipient' } });
  };

  const navigateToRecordsRecipient = () => {
    navigate('/records-recipient', { state: { userObject, userType: 'recipient' } });
  };

  const navigateToHomeRecipient = () => {
    navigate('/home-recipient', { state: { userObject, userType: 'recipient' } });
  };

  const handleUpdateRecords = async () => {
    navigate(`/update-records/${recipient.username}`);
   };

   const handleLogout = () => {
    // Implement logout functionality, e.g., clear tokens
    localStorage.removeItem('authToken');
    // Then navigate to the login page
    navigate('/login');
  };


  return (
    <div className={`${styles.homeContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      {userType === 'recipient' && recipient && (
      <div className={styles.navColumn}>
        <div className={styles.logoContainer}>
          <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
        </div>
        <div onClick={navigateToMyProfile} className={styles.userProfileContainer}>
        {recipient.profilePicture ? (
              <img
                src={`data:image/png;base64,${recipient?.profilePicture}`}
                alt="Profile"
                className={styles.userProfilePicture}
              />
            ) : (
              <img
                src="/DefaultProfilePicture.webp"
                alt="Profile"
                className={styles.userProfilePicture}
              />
            )}
          <div>
            {userObject ? (
              <p className={styles.userProfileInfo}>{`${recipient.firstname} ${recipient.lastname}`}</p>
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
                <img src="/records-icon2.svg" alt="Records" className={styles.navIcon} /> Records
              </div>
            </li>
            <li>
            <div onClick={handleLogout} className={styles.navLink}>
              <img src="/logout-icon.svg" alt="Logout" className={styles.navIcon} /> Logout
            </div>
            </li>
          </ul>
        </div>
      </div>
      )}
        <div className={`${styles.contentColumn} ${theme === 'dark' ? styles.dark : ''}`}>
          <h2 className={`${styles.sectionTitle} ${theme === 'dark' ? styles.whiteText : ''}`}>Medical Records</h2>


          {medicalRecords ? (
            <div key={medicalRecords.recordId} className={`${styles.medicalRecord} ${theme === 'dark' ? styles.dark : ''}`}>
              {/* Display medical records if available */}
              <h3 className={`${styles.recordTitle} ${theme === 'dark' ? styles.whiteText : ''}`}>Your Medical Record</h3>
              <ul className={styles.recordList}>
              <li>
                <strong className={styles.recordLabel}>Allergies:</strong> 
                <span className={`${styles.recordInfo} ${theme === 'dark' ? styles.whiteText : ''}`}>{medicalRecords.allergies}</span>
              </li>
              <li>
                <strong className={styles.recordLabel}>Medical Conditions:</strong> 
                <span className={`${styles.recordInfo} ${theme === 'dark' ? styles.whiteText : ''}`}>{medicalRecords.medical_conditions}</span>
              </li>
              <li>
                <strong className={styles.recordLabel}>Medications:</strong> 
                <span className={`${styles.recordInfo} ${theme === 'dark' ? styles.whiteText : ''}`}>{medicalRecords.medications}</span>
              </li>
              <li>
                <strong className={styles.recordLabel}>Past Surgeries:</strong> 
                <span className={`${styles.recordInfo} ${theme === 'dark' ? styles.whiteText : ''}`}>{medicalRecords.past_surgeries}</span>
              </li>
              <li>
                <strong className={styles.recordLabel}>Family History:</strong> 
                <span className={`${styles.recordInfo} ${theme === 'dark' ? styles.whiteText : ''}`}>{medicalRecords.family_history}</span>
              </li>
            </ul>
            <button type="button" className={`${styles.saveButton} ${theme === 'dark' ? styles.darkButton : ''}`} onClick={handleUpdateRecords}>Update</button>
          </div>

          ) : (
            // Display a message if no medical records are available
            <div className={`${styles.noRecordContainer} ${theme === 'dark' ? styles.whiteText : ''}`}>
              <p>You haven't added any medical records yet.</p>
              <button className={`${styles.addButton} ${theme === 'dark' ? styles.darkButton : ''}`} onClick={handleAddRecord}>
                Add Medical Record
              </button>
            </div>
          )}

          {addingRecord && (
            <div className={`${styles.addRecordContainer} ${theme === 'dark' ? styles.dark : ''}`}>
              <h3 className={styles.recordTitle}>Add Medical Record</h3>
              <form className={styles.addRecordForm}>
              <label>
                Allergies:
                <textarea
                  name="allergies"
                  value={newRecord.allergies}
                  onChange={handleInputChange}
                  className={styles.textarea2}
                  placeholder='Enter allergies'
                />
              </label>
              <label>
                Medical Conditions:
                <textarea
                  name="medical_conditions"
                  value={newRecord.medical_conditions}
                  onChange={handleInputChange}
                  className={styles.textarea2}
                  placeholder='Enter Medical Conditions'
                />
              </label>
              <label>
                Medications:
                <textarea
                  name="medications"
                  value={newRecord.medications}
                  onChange={handleInputChange}
                  className={styles.textarea2}
                  placeholder='Enter medications'
                />
              </label>
              <label>
                Past Surgeries:
                <textarea
                  name="past_surgeries"
                  value={newRecord.past_surgeries}
                  onChange={handleInputChange}
                  className={styles.textarea2}
                  placeholder='Enter Past Surgeries'
                />
              </label>
              <label>
                Family History:
                <textarea
                  name="family_history"
                  value={newRecord.family_history}
                  onChange={handleInputChange}
                  className={styles.textarea2}
                  placeholder='Enter family History'
                />
              </label>
              <button type="button" className={`${styles.saveButton} ${theme === 'dark' ? styles.darkButton : ''}`} onClick={handleSaveRecord}>Save</button>
              </form>
            </div>
          )}
        </div>
    </div>
  );
};

export default Home;

import styles from "./DashboardAdmin.module.css";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const DashboardAdmin = () => {
  const [recipients, setRecipients] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [striped, setStriped] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [showCareGiverTable, setShowCareGiverTable] = useState(false);
  const [showRecipientTable, setShowRecipientTable] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const caregiverRef = useRef();
  const recipientRef = useRef();

  const PrintableCareGiverTable = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <CareGiverTable {...props} />
    </div>
  ));
  
  const PrintableRecipientTable = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <RecipientTable {...props} />
    </div>
  ));

  const exportCaregiverToPdf = useReactToPrint({
    content: () => caregiverRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
    `,
  });

  const exportRecipientToPdf = useReactToPrint({
    content: () => recipientRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
    `,
  });

  const handleCaregiverLinkClick = (action) => {
    setShowCareGiverTable(true);
    setShowRecipientTable(false);
    setCurrentAction(action);
  };

  const handleRecipientLinkClick = (action) => {
    setShowCareGiverTable(false);
    setShowRecipientTable(true);
    setCurrentAction(action);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipients();
    fetchCaregivers();
  }, []);

  const getStripedStyle = (index) => {
    return index % 2 === 0 ? styles.stripedRow1 : styles.stripedRow2;
  };

  const fetchRecipients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/recipient/getAllRecipients');
      setRecipients(response.data);
    } catch (error) {
      console.error('Error fetching recipients', error);
    }
  };

  const fetchCaregivers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/caregiver/getAllCaregivers');
      setCaregivers(response.data);
    } catch (error) {
      console.error('Error fetching caregivers:', error);
    }
  };

  const handleRowClick = (userType, userId, username) => {
    if (currentAction === 'update') {
      handleUpdate(userType, userId);
    } else if (currentAction === 'delete') {
      handleDelete(userType, userId, username);
      handleDeleteAccount(username);
    }
  };

  const handleUpdate = (userType, userId) => {
    setUpdateData({ userType, userId });

    if (userType === 'Recipient') {
      navigate(`/update-recipient/${userId}`);
    } else if (userType === 'Caregiver') {
      navigate(`/update-caregiver/${userId}`);
    }
  };

  const handleDeleteAccount = async (username) => {
    try {
      const response = await axios.delete(`http://localhost:8080/account/deleteAccount/${username}`);
      console.log(response.data);
      fetchRecipients();
      fetchCaregivers();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleDelete = async (userType, userId, username) => {
    const userConfirmed = window.confirm(`Are you sure you want to delete the account with username: ${username}?`);

    if (userConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:8080/${userType.toLowerCase()}/delete${userType}/${userId}`);
        console.log(response.data);
        if (userType === 'Recipient') {
          fetchRecipients();
        } else if (userType === 'Caregiver') {
          fetchCaregivers();
        }
      } catch (error) {
        console.error(`Error deleting ${userType}`, error);
      }
    }
  };

  const handleRegisterCaregiver = () => {
    navigate('/register-caregiver');
  };

  const renderCareGiverTable = () => {
    return <PrintableCareGiverTable ref={caregiverRef} caregivers={caregivers} getStripedStyle={getStripedStyle} handleRowClick={handleRowClick} />;
  };

  const CareGiverTable = (props) => {
    const rowHeight = 60;
    const tableHeight = props.caregivers.length * rowHeight;

    return (
      <div>
        {currentAction ? (
          <div className={styles.caregivers} ref={props.caregiverRef}>
            {currentAction === 'update'
              ? 'Choose Caregiver to be Updated'
              : 'Choose Caregiver to be Deleted'}
          </div>
        ) : (<div className={styles.caregivers}>Caregivers</div>)}
        <table className={`${styles.rectangleParent} ${styles.tableContainer} ${styles.tableResponsive}`} style={{ height: `${tableHeight}px` }}>
          <thead className={`${styles.tableHeader}`}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Contact Info</th>
              <th>Address</th>
              <th>Specializations</th>
              <th>Hourly Rate</th>
            </tr>
          </thead>
          <tbody>
            {props.caregivers.map((caregiver, index) => (
              <tr key={caregiver.id} className={`${getStripedStyle(index)} ${styles.clickableRow} ${styles.row}`} onClick={() => handleRowClick('Caregiver', caregiver.caregiverId, caregiver.username)}>
                <td>{caregiver.firstname}</td>
                <td>{caregiver.lastname}</td>
                <td>{caregiver.username}</td>
                <td>{caregiver.password}</td>
                <td>{caregiver.birth_date}</td>
                <td>{caregiver.gender}</td>
                <td>{caregiver.contact_information}</td>
                <td>{caregiver.address}</td>
                <td>{caregiver.specializations}</td>
                <td>{caregiver.hourlyRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={`${styles.exportButton}`} onClick={exportCaregiverToPdf}>
          Export Caregiver Table to PDF
        </button>
      </div>
    );
  };

  const renderRecipientTable = () => {
    return <PrintableRecipientTable ref={recipientRef} recipients={recipients} getStripedStyle={getStripedStyle} handleRowClick={handleRowClick} />;
  };

  const RecipientTable = (props) => {
    const rowHeight = 60;
    const tableHeight = props.recipients.length * rowHeight;

    return (
      <div>
        {currentAction ? (
          <div className={styles.caregivers} ref={props.recipientRef}>
            {currentAction === 'update'
              ? 'Choose Recipient to be Updated'
              : 'Choose Recipient to be Deleted'}
          </div>
        ) : (<div className={styles.caregivers}>Recipients</div>)}
        <table className={`${styles.rectangleParent} ${styles.tableContainer} ${styles.tableResponsive}`} style={{ height: `${tableHeight}px` }}>
          <thead className={`${styles.tableHeader}`}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Contact Info</th>
              <th>Address</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {props.recipients.map((recipient, index) => (
              <tr key={recipient.id} className={`${getStripedStyle(index)} ${styles.clickableRow} ${styles.row}`} onClick={() => handleRowClick('Recipient', recipient.recipientId, recipient.username)}>
                <td>{recipient.firstname}</td>
                <td>{recipient.lastname}</td>
                <td>{recipient.username}</td>
                <td>{recipient.password}</td>
                <td>{recipient.birth_date}</td>
                <td>{recipient.gender}</td>
                <td>{recipient.contact_info}</td>
                <td>{recipient.address}</td>
                <td>{recipient.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={`${styles.exportButton} `} onClick={exportRecipientToPdf}>
          Export Recipient Table to PDF
        </button>
      </div>
    );
  };

  return (
    <div className={styles.dashboardadmin}>
      <div className={styles.dashboardadminChild} />
      <div className={styles.dashboardadminItem} />
      <div className={styles.dashboardadminInner} />
      <a className={styles.caregiver} onClick={() => handleCaregiverLinkClick(null)}>Caregiver</a>
      <a className={styles.recipient} onClick={() => handleRecipientLinkClick(null)}>Recipient</a>
      <a className={styles.vectorParent} onClick={() => handleRecipientLinkClick('update')}>
        <img className={styles.vectorIcon} alt="" src="/vector2.svg" />
        <div className={styles.update}>Update</div>
      </a>
      <Link to="/register-recipient" className={styles.addParent}>
        <div className={styles.add}>Add</div>
        <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
      </Link>
      <div className={styles.rectangleDiv} />
      <div className={styles.rectangleParent}>
        {/* <div className={styles.groupChild} />
        <div className={styles.groupItem} />
        <div className={styles.groupInner} />
        <div className={styles.groupChild1} />
        <div className={styles.groupChild2} /> */}
      </div>
      <a className={styles.vectorGroup} onClick={() => handleCaregiverLinkClick('update')}>
        <img className={styles.vectorIcon} alt="" src="/vector2.svg" />
        <div className={styles.update1}>Update</div>
      </a>
      <Link to="/register-caregiver" className={styles.addGroup}>
        <div className={styles.add}>Add</div>
        <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
      </Link>
      <a className={styles.vectorContainer} onClick={() => handleRecipientLinkClick('delete')}>
        <img className={styles.vectorIcon4} alt="" src="/vector3.svg" />
        <div className={styles.update}>Delete</div>
      </a>
      <a className={styles.groupA} onClick={() => handleCaregiverLinkClick('delete')}>
        <img className={styles.vectorIcon4} alt="" src="/vector3.svg" />
        <div className={styles.update1}>Delete</div>
      </a>
      <div className={styles.dashboard}>Dashboard</div>
      <div className={styles.nurturehub}>NurtureHub</div>
      <img
        className={styles.nurturehublogo2Icon}
        alt=""
        src="/nurturehublogo-2@2x.png"
      />
      <div className={styles.nurturehub1}>NurtureHub</div>
      <div className={styles.welcomeAdmin}>{`Welcome, Admin  `}</div>
      <Link to="/" className={styles.vectorIconLink}>
        <button className={styles.buttonWrapper}>
          <div className={styles.button}>Log Out</div>
        </button>
      </Link>
   
      {showCareGiverTable && renderCareGiverTable()}
      {showRecipientTable && renderRecipientTable()}
    </div>
  );
};

export default DashboardAdmin;

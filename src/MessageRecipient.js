import React, { useState, useEffect } from 'react';
import styles from './MessageRecipient.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const MessageRecipient  = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    // Perform any initial setup using userObject if needed
    console.log('userObject:', userObject);
  }, [userObject]);

  const handleSearch = async () => {
    setSearchResults([]);
    console.log('Search Term:', searchTerm);
    try {
      // Make an HTTP GET request to the backend API with the search term
      const response = await axios.get(`http://localhost:8080/caregiver/searchCaregiver?searchString=${searchTerm}`);
      setSearchResults(response.data); // Update search results with the data from the backend
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
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


  const Messages = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [conversations, setConversations] = useState({
      Admin: [
        { sender: 'Admin', text: 'Hi, how can I assist you?' },
        { sender: 'John Doe', text: 'Hello! I have a question.' },
        { sender: 'Admin', text: 'Sure, go ahead.' },
      ],
      'Caregiver 1': [
        { sender: 'Caregiver 1', text: 'Hi there, How can I help you?' },
      ],
      'Caregiver 2': [
        { sender: 'Caregiver 2', text: 'Greetings! How may I assist you?' },
      ],
    });
  
    const users = [
      { id: 1, name: 'Admin', messages: [] },
      { id: 2, name: 'Caregiver 1', messages: [] },
      { id: 3, name: 'Caregiver 2', messages: [] },
    ];
  
    const handleUserClick = (user) => {
      setSelectedUser(user);
    };
  
    const handleSendMessage = () => {
      if (selectedUser && messageInput.trim() !== '') {
        const newMessage = { sender: 'John Doe', text: messageInput };
        setConversations((prevConversations) => ({
          ...prevConversations,
          [selectedUser.name]: [...(prevConversations[selectedUser.name] || []), newMessage],
        }));
        setMessageInput('');
      }
    };
  
    return (
      <div className={styles.messageContainer}>
        <div className={styles.userList}>
          <h2>Conversations</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user)} className={selectedUser === user ? styles.selectedUser : ''}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.messageArea}>
          <h2>{selectedUser ? `Chat with ${selectedUser.name}` : 'Select a user to start chatting'}</h2>
          <div className={styles.messages}>
            {selectedUser &&
              (conversations[selectedUser.name] || []).map((message, index) => (
                <div key={index} className={styles.message}>
                  <strong>{message.sender}:</strong> {message.text}
                </div>
              ))}
          </div>
          {selectedUser && (
            <div className={styles.inputArea}>
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          )}
        </div>
      </div>
    );
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
              <div  className={styles.navLink}  onClick={navigateToHomeRecipient}>
                <img src="/home-icon.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Home
              </div>
            </li>
            <li>
              <div
                className={`${styles.navLink} ${styles.activeNavLink}`}
                onClick={navigateToMessageRecipient}
              >
                <img src="/messages-icon.svg" alt="Messages" className={styles.navIcon} /> Messages
              </div>
            </li>
            <li>
              <div className={styles.navLink}  onClick={navigateToRecordsRecipient}>
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
        <div className={styles.searchBarContainer}>
          <input type="text" placeholder="Search users..." className={styles.searchInput} value={searchTerm} onChange={handleSearchInputChange}/>
          <button className={styles.searchButton} onClick={handleSearch}>
            <img src="/search-icon.svg" alt="Search" className={styles.searchIcon} />
          </button>
        </div>
        {searchResults.map((user) => (
          <div
            key={user.id}
            className={styles.userProfileContainer}
            onClick={() => navigateToViewCaregiver(user.caregiverId)}
          >
            <img src={user.profilePicture} alt="Profile" className={styles.userProfilePicture} />
            <div>
              <p className={styles.userProfileInfo}>{`${user.firstname} ${user.lastname}`}</p>
              <p className={styles.userProfileInfo}>{`Address: ${user.address}`}</p>
            </div>
          </div>
        ))}
        <Messages />
      </div>
    </div>
  );
};

export default MessageRecipient ;
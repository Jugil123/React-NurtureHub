import React, { useState, useEffect } from 'react';
import styles from './MessageRecipient.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Adjust the import path as necessary

const MessageRecipient  = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [recipient, setRecipient] = useState(null);
  const userType = location.state ? location.state.userType : null;
  const { theme } = useTheme();
  const [conversations, setConversations] = useState([]);
  //   Admin: [
  //     { sender: 'Admin', text: 'Hi, how can I assist you?' },
  //     { sender: 'John Doe', text: 'Hello! I have a question.' },
  //     { sender: 'Admin', text: 'Sure, go ahead.' },
  //   ],
  //   'Caregiver 1': [
  //     { sender: 'Caregiver 1', text: 'Hi there, How can I help you?' },
  //   ],
  //   'Caregiver 2': [
  //     { sender: 'Caregiver 2', text: 'Greetings! How may I assist you?' },
  //   ],
  // });

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Messages";
  }, []); 

  const users = [
    { id: 1, name: 'Admin', messages: [] },
    { id: 2, name: 'Caregiver 1', messages: [] },
    { id: 3, name: 'Caregiver 2', messages: [] },
  ];

  const handleUserClick = (user) => {
    // Assuming that user.name is the property containing the user's name
    const userName = user.name || user.firstname || user.lastname;
  
    setSelectedUser({
      ...user,
      name: userName,
    });

    const usernames = [userName, userObject.firstname].sort();
    const messageKey = usernames.join('-');
    fetchPreviousMessages(messageKey);
  };

  const fetchPreviousMessages = async (messageKey) => {
    try {
      const response = await axios.get(`http://localhost:8080/message/getMessage?messageKey=${messageKey}`);
  
      const previousMessages = response.data;
      console.log(previousMessages);
  
      // Do something with the previousMessages, like updating the state
      setConversations(previousMessages);
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
  }

  const handleSendMessage = async () => {
    if (selectedUser && messageInput.trim() !== '') {
      const usernames = [selectedUser.name, userObject.firstname].sort();
      const messageKey = usernames.join('-');

      const newMessage = {
        messageKey: messageKey, 
        sender: userObject.firstname,
        receiver: selectedUser.name, 
        message: messageInput 
      };
      
      try { 
      const response = await axios.post('http://localhost:8080/message/insertMessage', newMessage);
      const savedMessage = response.data;
      console.log(savedMessage);

      setConversations((prevConversations) => ({
        ...prevConversations,
        [selectedUser.name]: [...(prevConversations[selectedUser.name] || []), savedMessage],
      }));
      setMessageInput('');
      handleUserClick(selectedUser);

    }catch (error){
      console.error('Error sending message:', error);
    }

    }
  };

  // Extract userObject from location state
  const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    // Fetch recipient details only if userType is 'caregiver'
    if (userType === 'recipient' && userObject) {
      fetchRecipientDetails(userObject.recipientId);
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



  const handleSearch = async () => {
    setSearchResults([]);
    console.log('Search Term:', searchTerm);
    try {
      // Make an HTTP GET request to the backend API with the search term
      const response = await axios.get(`http://localhost:8080/account/searchAccount?searchString=${searchTerm}`);
      setSearchResults(response.data); // Update search results with the data from the backend
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
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


  const Messages = () => {
    // console.log('Conversations:', conversations);
    // console.log('Selected User:', selectedUser);
    // console.log('Selected User Conversations:', conversations[selectedUser?.name]);
  
    return (
      <div className={styles.messageContainer}>
        <div className={styles.messageArea}>
          <h2>{selectedUser ? `Chat with ${selectedUser.name}` : 'Select a user to start chatting'}</h2>
          <div className={styles.messages}>
            {selectedUser && Array.isArray(conversations) && 
              (conversations.map((message, index) => (
                <div key={index} className={styles.message}>
                  <strong>{message.sender}:</strong> {message.message}
                </div>
              ))
            )}
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
              <div  className={styles.navLink}  onClick={navigateToHomeRecipient}>
                <img src="/home-icon.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Home
              </div>
            </li>
            <li>
              <div
                className={`${styles.navLink} ${styles.activeNavLink}`}
                onClick={navigateToMessageRecipient}
              >
                <img src="/message-icon2.svg" alt="Messages" className={styles.navIcon} /> Messages
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
      )}
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
            onClick={() => handleUserClick(user)}
          >
            <img src={user.profilePicture} alt="Profile" className={styles.userProfilePicture} />
            <div>
              <p className={styles.userProfileInfo}>{`${user.firstname} ${user.lastname}`}</p>
            </div>
          </div>
        ))}

          <h2>Conversations</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user)} className={selectedUser === user ? styles.selectedUser : ''}>
                {user.name}
              </li>
            ))}
          </ul>
          </div>
        <Messages />
    </div>
  );
};

export default MessageRecipient ;

import React, { useState, useEffect } from 'react';
import styles from './MessageCaregiver.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Make sure to import useTheme from the correct location

const MessageRecipient  = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [caregiver, setCaregiver] = useState(null);
  const userType = location.state ? location.state.userType : null;
  const { theme, toggleTheme } = useTheme();
  const [conversations, setConversations] = useState([]);
  const userObject = location.state ? location.state.userObject : null;
  const [recentConversations, setRecentConversations] = useState([]);
  const [uniqueUsernames, setUniqueUsernames] = useState([]);

  const fetchRecentConversations = async () => {
    try {

      const response = await axios.get('http://localhost:8080/message/getMessagebyPartialKey', {
        params: {
          messageKey: userObject.username,
        },
      });

    const fetchedRecentConversations = response.data;

      // Extract unique sender and receiver usernames
    const uniqueUsernames = new Set();
    fetchedRecentConversations.forEach((conversation) => {
      if (conversation.senderUsername !== userObject.username) {
        uniqueUsernames.add(conversation.senderUsername);
      }
      if (conversation.receiverUsername !== userObject.username) {
        uniqueUsernames.add(conversation.receiverUsername);
      }
    });

    setUniqueUsernames([...uniqueUsernames]);
    console.log('unique', uniqueUsernames);


    // Use Promise.all to wait for all requests to complete
      const fetchedConversations = await Promise.all(
      Array.from(uniqueUsernames).map(async (uniqueUsername) => {
        try {
          const response = await axios.get(`http://localhost:8080/account/searchAccountUsername?username=${uniqueUsername}`);

          // Assuming the response.data is an array of conversations
          console.log(`Data for ${uniqueUsername}:`, response.data);

          return response.data;
        } catch (error) {
          console.error(`Error fetching data for ${uniqueUsername}:`, error);
          return null;
        }
      })
      );

      // Log the fetchedConversations before updating the state
      console.log('Fetched Conversations:', fetchedConversations);

      // Flatten the array of arrays into a single array of conversations
      const flatConversations = fetchedConversations.flat();

      // Update the state with the fetched conversations
      setRecentConversations(flatConversations);
      console.log('final', recentConversations);

      } catch (error) {
        console.error('Error fetching recent conversations:', error);
      }
    };

  const handleUserClick = (user) => {
    // Assuming that user.name is the property containing the user's name
    const userName = user.username;
  
    setSelectedUser({
      ...user,
      name: user.firstname,
    });

    const usernames = [userName, userObject.username].sort();
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
      const usernames = [selectedUser.username, userObject.username].sort();
      const messageKey = usernames.join('-');

      const newMessage = {
        messageKey: messageKey, 
        sender: userObject.firstname,
        receiver: selectedUser.firstname,
        senderUsername: userObject.username,
        receiverUsername: selectedUser.username,
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

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Messages-caregiver";
    fetchRecentConversations();
  },[]);

  // Extract userObject from location state
  // const userObject = location.state ? location.state.userObject : null;

  
  useEffect(() => {
    // Fetch caregiver details only if userType is 'caregiver'
    if (userType === 'caregiver' && userObject) {
      fetchCaregiverDetails(userObject.caregiverId);
    }
  }, [userType, userObject]);

  const fetchCaregiverDetails = async (caregiverId) => {
    try {
      const response = await axios.get(`http://localhost:8080/caregiver/getCaregiverById/${caregiverId}`);
      console.log('Caregiver Details123:', response.data);
      setCaregiver(response.data);
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
    navigate('/my-profile', { state: { userObject, userType: 'caregiver' } });
  };

  const navigateToViewCaregiver = (userId) => {
    navigate(`/view-caregiver/${userId}`, { state: { userObject, userType: 'caregiver' } });
  };

  const navigateToMessageCaregiver = () => {
    navigate('/message-caregiver', { state: { userObject, userType: 'caregiver' } });
  };

  const navigateToHistoryCaregiver= () => {
    navigate('/history-caregiver', { state: { userObject, userType: 'caregiver' } });
  };

  const navigateToHomeCaregiver = () => {
    navigate('/home-caregiver', { state: { userObject, userType: 'caregiver' } });
  };
  const Messages = () => {
   
  
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
       {userType === 'caregiver' && caregiver && (
      <div className={styles.navColumn}>
        <div className={styles.logoContainer}>
          <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
        </div>
        <div onClick={navigateToMyProfile} className={styles.userProfileContainer}>
        {caregiver.profilePicture ? (
              <img
                src={`data:image/png;base64,${caregiver?.profilePicture}`}
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
              <p className={styles.userProfileInfo}>{`${caregiver.firstname} ${caregiver.lastname}`}</p>
            ) : (
              <p className={styles.userProfileInfo}>Firstname Lastname</p>
            )}
          </div>
        </div>
        <div>
        <ul className={styles.navLinksContainer}>
            <li>
              <div className={styles.navLink} onClick={navigateToHomeCaregiver}>
                <img src="/home-icon.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Home
              </div>
            </li>
            <li>
              <div
                className={`${styles.navLink} ${styles.activeNavLink}`}
                onClick={navigateToMessageCaregiver}
              >
                <img src="/message-icon2.svg" alt="Messages" className={styles.navIcon} /> Messages
              </div>
            </li>
            <li>
              <div className={styles.navLink}  onClick={navigateToHistoryCaregiver}>
                <img src="/history-icon.svg" alt="Records" className={styles.navIcon} /> History
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
              {console.log('Recent Conversations:', recentConversations)}
              {recentConversations.map((conversation, index) => (
                // Render li only if the name is not the logged-in user
                conversation.receiver !== userObject.firstname && (
                  <li
                    key={index}
                    onClick={() => handleUserClick(conversation)} // Pass a mock user object
                    className={selectedUser?.name === conversation.sender ? styles.selectedUser : ''}
                  >
                    {conversation.firstname}
                  </li>
                )
              ))}
            </ul>
          </div>
        <Messages />
    </div>
  );
};

export default MessageRecipient ;

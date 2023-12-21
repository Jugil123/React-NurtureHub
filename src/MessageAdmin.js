import React, { useState, useEffect } from 'react';
import styles from './MessageRecipient.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Adjust the import path as necessary

const MessageAdmin  = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [admin, setAdmin] = useState(null);
  const userType = location.state ? location.state.userType : null;
  const { theme } = useTheme();
  const [conversations, setConversations] = useState([]);
  const userObject = location.state ? location.state.userObject : null;
  const [recentConversations, setRecentConversations] = useState([]);
  const [uniqueUsernames, setUniqueUsernames] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NurtureHub | Messages";
    fetchRecentConversations();
  }, []); 

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // If the authentication token doesn't exist, navigate to the login page
      navigate('/login');
    } 
    else {
      const authTokenString = localStorage.getItem('authToken');
      const authToken = JSON.parse(authTokenString);
      const userType = authToken?.userType;
      console.log('adminside: ',userType)
      const userObject = authToken.userObject;

      if (userType === 1) {
        navigate('/home-recipient', { state: { userObject } });
      } else if (userType === 2) {
        navigate('/home-caregiver', { state: { userObject } });
      } else {
        
      }
    } 
  }, [navigate]);

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

  // const fetchRecentConversationsForUsers = async () => {
  //   try {
  //     const fetchedConversations = [];
  
  //     // Loop through uniqueUsernames and fetch recent conversations for each username
  //     for (const uniqueUsername of uniqueUsernames) {
  //       console.log('who is :',uniqueUsername);
  //       const response = await axios.get(`http://localhost:8080/account/searchAccount?searchString=${uniqueUsername}`);
  //       const user = response.data; // Assuming the API returns an array with a single user, adjust accordingly
        
  //       // Combine the conversations for each user into the fetchedConversations array
  //       fetchedConversations.push(user);
  //     }
  
  //     // Update the state with the fetched conversations
  //     setRecentConversations(fetchedConversations);
  //   } catch (error) {
  //     console.error('Error fetching recent conversations:', error);
  //   }
  // };
 

  const handleUserClick = (user) => {
    const userName = user.username;
  
    setSelectedUser({
      ...user,
      name: user.firstname,
    });

    const usernames = [userName, userObject.username].sort();
    const messageKey = usernames.join('-');
    fetchPreviousMessages(messageKey);
  };

  const handleUserClickOnConversation = (user) => {
    const messageKey = user.messageKey;
  
    setSelectedUser({
      ...user,
      name: user.receiver,
    });

    console.log('....',user.receiver);
    fetchPreviousMessages(messageKey);
  };

  const fetchPreviousMessages = async (messageKey) => {
    try {
      const response = await axios.get(`http://localhost:8080/message/getMessage?messageKey=${messageKey}`);
  
      const previousMessages = response.data;
  
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

  // Extract userObject from location state
  // const userObject = location.state ? location.state.userObject : null;

  useEffect(() => {
    // Fetch recipient details only if userType is 'caregiver'
    if (userType === 'admin' && userObject) {
      fetchAdminDetails(userObject.adminId);
    }
  }, [userType, userObject]);

  const fetchAdminDetails = async (adminId) => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/getAdminById/${adminId}`);
      console.log('Admin Details123:', response.data);
      setAdmin(response.data);
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

  const navigateToMessageAdmin = () => {
    navigate('/message-admin', { state: { userObject, userType: 'admin' } });
  };

  const navigateToDashboard = () => {
    navigate('/dashboard', { state: { userObject } });
  };

  const navigateToHomeRecipient = () => {
    navigate('/home-recipient', { state: { userObject, userType: 'recipient' } });
  };


  const Messages = () => {

  
    return (
     
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
        </div>
    
    );
  };
  

  const handleLogout = () => {
    // Implement logout functionality, e.g., clear tokens
    localStorage.removeItem('authToken');
    // Then navigate to the login page
    navigate('/login');
  };

  return (
    <div className={`${styles.homeContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      {userType === 'admin' && admin && (
      <div className={styles.navColumn}>
        <div className={styles.logoContainer}>
          <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
        </div>
        <div onClick={navigateToMyProfile} className={styles.userProfileContainer}>
       
              <img
                src="/DefaultProfilePicture.webp"
                alt="Profile"
                className={styles.userProfilePicture}
              />
        
          <div>
            {userObject ? (
              <p className={styles.userProfileInfo}>{`${admin.firstname} ${admin.lastname}`}</p>
            ) : (
              <p className={styles.userProfileInfo}>Loading...</p>
            )}
          </div>
        </div>
        <div>
        <ul className={styles.navLinksContainer}>
            <li>
              <div  className={styles.navLink}  onClick={navigateToDashboard  }>
                <img src="/home-icon.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Back to Dashboard
              </div>
            </li>
            <li>
              <div
                className={`${styles.navLink} ${styles.activeNavLink}`}
                onClick={navigateToMessageAdmin}
              >
                <img src="/message-icon2.svg" alt="Messages" className={styles.navIcon} /> Messages
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
            {user.profilePicture ? (
              <img
                src={`data:image/png;base64,${user?.profilePicture}`}
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
              <p className={styles.userProfileInfo}>{`${user.firstname} ${user.lastname}`}</p>
            </div>
          </div>
        ))}

            <h2>Conversations</h2>
            <div>
              {recentConversations.map((conversation, index) => (
                // Render div only if the name is not the logged-in user
                conversation.receiver !== userObject.firstname && (
                  <div
                    key={index}
                    onClick={() => handleUserClick(conversation)} // Updated the click handler
                    className={styles.userProfileContainer}
                  >
                      {conversation.profilePicture ? (
              <img
                src={`data:image/png;base64,${conversation?.profilePicture}`}
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
                    {conversation.firstname}
                  </div>
                )
              ))}
            </div>
          </div>
        <div className={styles.messageContainer}>
        <Messages />
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

export default MessageAdmin ;

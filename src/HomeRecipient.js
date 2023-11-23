// HomeRecipient.js
import React, { useState } from 'react';
import styles from './HomeRecipient.module.css';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const users = [
      { id: 1, firstName: 'Andrei Vincent', lastName: 'Salinas', address: 'Cebu City', profilePicture: '/andrei.png' },
      { id: 2, firstName: 'Britt', lastName: 'Cañeda', address: 'Cebu City', profilePicture: '/britt.png' },
      { id: 3, firstName: 'Jugil', lastName: 'Cabuenas', address: 'Cebu City', profilePicture: '/jugil.png' },
    ];

    setSearchResults(users);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.navColumn}>
        <div className={styles.logoContainer}>
          <img src="/nurturehublogo-2@2x.png" alt="App Logo" className={styles.appLogo} />
        </div>
        <div className={styles.userProfileContainer}>
          <img src="/juspher.png" alt="Profile" className={styles.userProfilePicture} />
          <div>
            <p className={styles.userProfileInfo}>Juspher Pateña</p>
          </div>
        </div>
        <div>
          <ul className={styles.navLinksContainer}>
            <li>
              <a href="/" className={`${styles.navLink} ${styles.activeNavLink}`}>
                <img src="/home-icon.svg" alt="Home" className={`${styles.navIcon} ${styles.activeNavLinkIcon}`} /> Home
              </a>
            </li>
            <li>
              <a href="/messages" className={styles.navLink}>
                <img src="/messages-icon.svg" alt="Messages" className={styles.navIcon} /> Messages
              </a>
            </li>
            <li>
              <a href="/records" className={styles.navLink}>
                <img src="/records-icon.svg" alt="Records" className={styles.navIcon} /> Records
              </a>
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
          <input type="text" placeholder="Search users..." className={styles.searchInput} />
          <button className={styles.searchButton} onClick={handleSearch}>
            <img src="/search-icon.svg" alt="Search" className={styles.searchIcon} />
          </button>
        </div>
        {searchResults.map((user) => (
          <div key={user.id} className={styles.userProfileContainer}>
            <img src={user.profilePicture} alt="Profile" className={styles.userProfilePicture} />
            <div>
              <p className={styles.userProfileInfo}>{`${user.firstName} ${user.lastName}`}</p>
              <p className={styles.userProfileInfo}>{`Address: ${user.address}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

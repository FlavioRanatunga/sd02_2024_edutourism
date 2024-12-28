import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DefaultPic from './assets/OIP.jpg';
import './profileSettings.css';

export default function SettingsModal({ isSettingsModalVisible, closeSettingsModal, username }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    country: '',
    username: '',
    password: '',
    profilePic: '',
  });
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (isSettingsModalVisible) {
      // Fetch user data when modal is visible
      fetch(`http://localhost:8080/settings/traveller/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setUser(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isSettingsModalVisible, username]);

  const handleProfilePicUpload = (file) => {
    setProfilePic(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();

    const updatedUser = { ...user };
    const formData = new FormData();

    for (let key in updatedUser) {
      formData.append(key, updatedUser[key]);
    }

    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    fetch('http://localhost:8080/settings/update', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        window.alert('Settings updated successfully!');
        setUser(data.user);
        closeSettingsModal();
      })
      .catch((error) => {
        window.alert('Failed to update settings.' + error);
        console.error('Error updating settings:', error);
      });
  };

  return (
    isSettingsModalVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        id="settingsModal-settings" className='settingsForm'
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
          className='settingsFormContent' style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}
        >
          <span className="close-button" onClick={closeSettingsModal}>&times;</span>
          <h2>Settings</h2>
          <form onSubmit={handleSaveSettings}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={user.name} onChange={handleInputChange} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange} />

            <label htmlFor="country">Country:</label>
            <input type="text" id="country" name="country" value={user.country} onChange={handleInputChange} />

            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={user.username} onChange={handleInputChange} />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} />

            <label htmlFor="profilePic">Profile Picture:</label>
            <input type="file" id="profilePic" name="profilePic" accept="image/*" onChange={handleProfilePicUpload} />

            {user.profilePic ? (
              <div>
                <img src={user.profilePic} alt="Profile" style={{ width: '100px', height: '100px' }} />
              </div>
            ) : (
              <div>
                <img src={DefaultPic} alt="Profile" style={{ width: '100px', height: '100px' }} />  <button type="submit">Save Settings</button>
              </div>
            )}

          
          </form>
        </motion.div>
      </motion.div>
    )
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './profileSettings.css';
import { useUserId } from './UserIdContext';

export default function SettingsModal({ isEditProfileModalVisible, closeEditProfileModal,refreshCounter,setRefreshCounter }) {

    const {id} = useUserId();

    const[username,setUsername] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const[serviceProviderDescription, setDescription] = useState();
    const [serviceType, setServiceType] = useState();
  
    useEffect(() => {
        const fetchServiceProvider = async () => {
          const response = await fetch(`http://localhost:8080/service-provider/${id}`);
          const data = await response.json();
          console.log(data);
     
          setUsername(data.username);
          setName(data.name);
          setEmail(data.email);
          setServiceType(data.serviceType)
          setDescription(data.serviceProviderDescription)
        };
    
        if (id) {
            fetchServiceProvider();
          }
        }, [id]);

        const handleEditProfile = (e) => {
            e.preventDefault();
            const updatedServiceProvider = { name, username, email, serviceType, serviceProviderDescription };
      
            fetch(`http://localhost:8080/service-provider/updateProfile/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedServiceProvider)
            }).then(response => {
                if (!response.ok) {
                  console.log('HTTP error! Status:',response.status);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(response);
                return response.text();  // assuming the server returns JSON
            }).then(data => {
              console.log(data);
                if (data === 'Service Provider not found!'||data==='Username already exists!'||data==='Email already exists!') {
                    window.alert(data);
                } else {
                    window.alert("Profile Updated Successfully");
                  closeEditProfileModal();
                }
            }).catch((error) => {
                window.alert("Error Updating Profile");
                console.error('Error updating service provider profile:', error);
            });
        };

  return (
    isEditProfileModalVisible && (
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
          <span className="close-button" onClick={closeEditProfileModal}>&times;</span>
          <h2>Edit Business Profile</h2>
          <form onSubmit={handleEditProfile}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>

            <label htmlFor="password">Service Provider Type:</label>
            <input type="text" id="password" name="password" value={serviceType}onChange={(e)=>setServiceType(e.target.value)} />

            <label htmlFor="profilePic">Service Provider Description:</label>
            <input type="text" id="profilePic" name="profilePic" value={serviceProviderDescription} onChange={(e)=>setDescription(e.target.value)} />

            <button type="submit">Update Profile</button>
          </form>
        </motion.div>
      </motion.div>
    )
  );
}

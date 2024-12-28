import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';

// import './home.css';
import './businessprofile.css';
import './assets/css/bootstrapMin.css';
import { useUserId } from './UserIdContext';

export default function BusinessProfile({refreshCounter}){

  
  const {id} = useUserId();
  const [serviceProvider, setServiceProvider] = useState({});

  const [isBussinessProfileVisible, setIsBussinessProfileVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const[username,setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const[serviceProviderDescription, setDescription] = useState();
  const [serviceType, setServiceType] = useState();

  const openEditProfile = () => {
    setIsBussinessProfileVisible(false);
    setIsVisible(true);
  };

  const closeEditProfile = () => {
    setIsVisible(false);
    setIsBussinessProfileVisible(true);
    
  }

useEffect(() => {
    const fetchServiceProvider = async () => {
      const response = await fetch(`http://localhost:8080/service-provider/${id}`);
      const data = await response.json();
      console.log(data);
      setServiceProvider(data);
      setIsBussinessProfileVisible(true);
      setUsername(data.username);
      setName(data.name);
      setEmail(data.email);
      setServiceType(data.serviceType)
      setDescription(data.serviceProviderDescription)
    };

    if (id) {
        fetchServiceProvider();
      }
    }, [id,refreshCounter]);


    return(
      
<section className='body'>
{isBussinessProfileVisible && (
    <div className="containerProfile">
    <h1>Business Profile</h1>
    <div className="row">
      <div className="column">
        <label htmlFor="serviceName">Service Provider Name:</label>
        <input
          type="text"
          id="serviceName"
          value={serviceProvider.name}
          readOnly
          className="readOnlyInput"
        />
      </div>
      <div className="column">
        <label htmlFor="serviceEmail">Service Provider Email:</label>
        <input
          type="email"
          id="serviceEmail"
          value={serviceProvider.email}
          readOnly
          className="readOnlyInput"
        />
      </div>
    </div>
    <div className="row">
      <div className="column">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={serviceProvider.username}
          readOnly
          className="readOnlyInput"
        />
      </div>
      <div className="column">
        <label htmlFor="serviceType">Service Type:</label>
        <input
          type="text"
          id="serviceType"
          value={serviceProvider.serviceType}
          readOnly
          className="readOnlyInput"
        />
      </div>
    </div>
    <div className="row">
      <label htmlFor="serviceDescription">Service Provider Description:</label>
      <textarea
        id="serviceDescription"
        rows="3"
        value={serviceProvider.serviceProviderDescription}
        readOnly
        className="description"
      />
    </div>
  </div>

)}
</section>

    )
  }
         
         

        



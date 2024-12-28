import './App.css';
/*import DemoAppBar from './appbar'
*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import React, { useState, useEffect } from 'react';

import './assets/css/font-awesome.min.css';
import './assets/css/linearicons.css';
import './assets/css/animate.css';
import './assets/css/flaticon.css';
import './assets/css/slick.css';
import './assets/css/slick-theme.css';
import './assets/css/bootstrapMin.css';
import './assets/css/bootsnav.css';
import './assets/css/style.css';
import { jwtDecode } from 'jwt-decode';

import tokenService from './TokenService'; 

import './assets/css/responsive.css';

import AdminDash from './AdminDash';
import ServiceProvider from './ServiceProvider';
import ClientBar from './Reviews';

import img from './assets/images/welcome-hero/banner.jpg';
import Services from './Services';
import Bookings from './MyBookings';
import ContactForm from './Contact';
import CommentsAndDiscussions from './CommentsAndDiscussions';
import FAQPage from './FAQPage';
import Bot from './Chatbot';
import { UserIdProvider } from './UserIdContext';
import Statistics from './Statistics';

function App() {
  const origin = 'Ja-Ela, Sri Lanka'; // Origin location name
  const destination = 'Colombo, Sri Lanka'; // Destination location name
  const stops = ['Nittambuwa, Sri Lanka', 'Kegalle, Sri Lanka','Nuwara Eliya, Sri Lanka', 'Ratnapura, Sri Lanka' ]; // Add any number of stops

  const [username, setUsername] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedID, setAuthenticatedID] = useState(null);
  const [homeSearchVal, setHomeSearchVal] = useState('');

 
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {

        const decodedToken = jwtDecode(token);
        const verifyTokenUserId = tokenService.verifyToken(token);
        if(verifyTokenUserId!=false)
        {
        setAuthenticatedID(decodedToken.id); // Extract the ID from the token
        const userNameFromToken = decodedToken.username;

        setUsername(userNameFromToken);
        setAuthenticated(true);
        }else{

          console.log(" Session Expired:");

        }

      } catch (error) {
        
        console.error("Invalid token:", error);
      }
    }

    // Update `items` based on authentication status

    // Optional: Log after updating state
    console.log("Auth status", authenticated);
    console.log("User ID:", authenticatedID);

  }, [authenticated]); 

  const handleLogout = () => {
   localStorage.removeItem('authToken');
    setAuthenticated(false);
    console.log("User logged out");
  };
  const handleHomeSearch = (searchVal) => {
    // localStorage.removeItem('authToken');
    setHomeSearchVal(searchVal);
    console.log('Main search input: app.js ', searchVal);
   //   console.log("User logged out");
    };
  
  const updateLogin = () => {
    const token = localStorage.getItem('authToken');
  //  localStorage.removeItem('authToken');
  const decodedToken = jwtDecode(token);
  const verifyTokenUserId = tokenService.verifyToken(token);
  if(verifyTokenUserId!=false)
  {

    const userIDFromToken = decodedToken.id;
  setAuthenticatedID(userIDFromToken); // Extract the ID from the token
  console.log("ID from APP.js"+authenticatedID);
  const userNameFromToken = decodedToken.username;

  setUsername(userNameFromToken);
  setAuthenticated(true);
  }
    console.log("User logged in");
  };
  
  

  return (
    <UserIdProvider>
    <Router>
      <div className="App">
        <Routes>
          {/* Main route for all main components */}
          <Route path="/" element={
            <>
<Home updateLogin={updateLogin} handleLogout={handleLogout} handleHomeSearch={handleHomeSearch}/>
<Statistics />
              <Services authenticated={authenticated} authenticatedID={authenticatedID} homeSearchVal= {homeSearchVal}/>
              <Bookings authenticated={authenticated} authenticatedID={authenticatedID}/>
              <CommentsAndDiscussions/>
              
              <ContactForm />
              <ClientBar /> 
              <Bot />
            </>
          } />

          {/* Separate route for admin dashboard */}
          <Route path="/admin" element={<AdminDash />} />

          {/* Separate route for service provider */}
          <Route path="/serviceprovider" element={<ServiceProvider />} />

          <Route path="/faqs" element={<FAQPage />} />

        </Routes>
      </div>
    </Router>
    </UserIdProvider>
    
    
  );
}

export default App;

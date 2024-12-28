import React, { useState, useEffect } from 'react';


import University from './assets/images/university.png';
import Destination from './assets/images/destination.png';
import Hotel from './assets/images/hotel.png';
import Tour from './assets/images/tour.png';
import './home.css';

import MenuIcon from '@mui/icons-material/Menu';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Link as Linkrout } from 'react-router-dom';
import { Dropdown } from 'rsuite';
import Notification from './Notification'; 
import { tailChase } from 'ldrs'
import SettingsModal from './ProfileSettings'
import { jwtDecode } from 'jwt-decode';
import { listClasses } from '@mui/material';
import Guide from './GuideSection';

import tokenService from './TokenService'; 

tailChase.register()

// Default values shown



export default function MainHeader({ updateLogin, handleLogout, handleHomeSearch }) {

  const [username, setUsername] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedID, setAuthenticatedID] = useState(null);
  const [items, setItems] = useState(['Signup', 'Login', 'Settings']);

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const travellerId = 1;

  const [notification, setNotification] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState('');
   
  const showNotification = (message) => {
    setNotification(message);
};


  const handleNotificationClose = () => {
      setNotification(null); // Clear the notification when it is closed
  };

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
        updateLogin();
        setAuthenticated(true);
        }else{
          showNotification("Session expired! Please login again to continue") 

          console.log(" Session Expired:");

        }

      } catch (error) {
        
        console.error("Invalid token:", error);
      }
    }

    // Update `items` based on authentication status
    if (authenticated) {
      setItems(['Logout', 'Settings']);
    } else {
      setItems(['Signup', 'Login', 'Settings']);
    }

    // Optional: Log after updating state
    console.log("Auth status", authenticated);
    console.log("User ID:", authenticatedID);

  }, [authenticated]); 

 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleItemClick = (item) => {
      setSelectedItem(item);
      setIsOpen(false);

      if(item =='Signup')
      {
        openSignupModal();
      }else if(item =='Login')
      {
         openLoginModal();
      }else if(item =='Settings')
      {
         openSettingsModal();
      }else if(item =='Logout')
        {
          //localStorage.removeItem('authToken');
          setAuthenticated(false);
          handleLogout();
          showNotification('You have successfully logged out of EduExplore!');
        }
    };
  
  
 

  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setSignupModalVisible] = useState(false);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);

  const [isVisible, setIsVisible] = useState(false);


  const openLoginModal = () => {
    setSignupModalVisible(false);
    setLoginModalVisible(true);
    setIsVisible(true);
  };

  const closeLoginModal = () => setLoginModalVisible(false);

  const openSignupModal = () => {
    setLoginModalVisible(false);
    setSignupModalVisible(true);
  };
  useEffect(() => {
    // Set visibility to true after component mounts to trigger the transition
    setLoginModalVisible(false);

  }, []);
  const closeSignupModal = () => setSignupModalVisible(false);
  const offset = -window.innerHeight * 0.25;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [password, setPassword] = useState();



  const handleSignup = (e) => {
    e.preventDefault();
    const newTraveller = { name, country, email, username, password };
    console.log(newTraveller);

    fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTraveller)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();  // assuming the server returns JSON
    })
    .then(data => {
      showNotification('Registration successful!');
        
        
        console.log("New Traveller added successfully", data);
        closeSignupModal();
        openLoginModal();
    })
    .catch(error => {
        showNotification("Registration failed!") 
        console.error("Error adding new traveller:", error);
    });
}

const handleLogin = (e) => {
  e.preventDefault();

  
  console.log(username, password);

  const loginData = {
      username: username,
      password: password
  };

  fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)  // Correctly stringify the object as JSON
  })
  .then(response => {
    // Read response text to debug
    return response.text().then(text => {
      console.log("Raw response:", text); // Log the raw response
      try {
        // Try parsing JSON
        return JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid JSON response");
      }
    });
  })
  .then(data => {
    console.log("Parsed response:", data); 
      if (data === 'Username or password is incorrect!') {  // Use 'data' instead of 'response.text'
          window.alert(data);  
          setLoginAttempts((prev) => prev + 1);

          if (loginAttempts >= 2) {
            setIsLocked(true);
            setTimer(30); // Set timer to 30 seconds
          }// Display the error message from the server
      } else {
        
          showNotification("Login Successful!")
        //  console.log("Login Successful", data);
          setAuthenticated(true);
          localStorage.setItem('authToken', data.token);

          const token = localStorage.getItem('authToken');
         
          const userId = tokenService.verifyToken(token);
          //setAuthenticatedID(token.id);
         // const authtokenID = tokenService.verifyToken(token);
          console.log("Login Successful ID", userId);
          setAuthenticatedID(userId);
          closeLoginModal();
          // Handle success: redirect or set logged-in state
      }
  })
  .catch(error => {
   
      showNotification("Login failed!") // Display a generic error message
      console.error("Error logging in:", error);
  });
};

const [isForgotPassword, setIsForgotPassword] = useState(false);
const [isOtpSent, setIsOtpSent] = useState(false);
const [isNewPw, seIsNewPw] = useState(false);
const [otp, setOtp] = useState();
  const [newPw, setNewPw] = useState();

const closeForgotPassword = () => setIsForgotPassword(false);
const closeForgotPasswordOtp = () => setIsOtpSent(false);
const closeNewPassword = () => seIsNewPw(false);

  const handleForgotPasswordClick = () => {
    closeLoginModal();
    setIsForgotPassword(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
    
  };

  const handleNewPwChange = (event) => {
    setNewPw(event.target.value);
  };



  const handleCancelClick = () => {
    setIsForgotPassword(false);
  };

  const handleCancelClickOtp = () => {
    setIsOtpSent(false);
  };

  const handleCancelClickNewPw = () => {
    seIsNewPw(false);
  };

  const handleSendOtp = (e) => {
   
    e.preventDefault();
   
   
    const emailInput = document.getElementById('OTPemail');
    const emailRequest = {
     
      email: emailInput.value
    };
   
    
    document.getElementById('loading').style.display = 'block';
    fetch("http://localhost:8080/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailRequest)
    })
    .then(response => {
     
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();  // assuming the server returns a plain text OTP
    })
    .then(data => {
     
      document.getElementById('loading').style.display = 'none';
      showNotification(`Your OTP is: ${data}`);
      console.log("OTP sent successfully!", data);
      setIsForgotPassword(false);
      setIsOtpSent(true);
      

    })
    .catch(error => {
     
      showNotification('Error sending OTP!');
      console.error("Error sending OTP:", error);
      setIsForgotPassword(true);

    });
  }

  const handleVerifyOtp = (e) => {
   
    e.preventDefault();
    
    const otpInput = document.getElementById('otp');
    const otpRequest = {
      email: email,
      otp: otpInput.value
    };
    handleCancelClickOtp();
    fetch("http://localhost:8080/Otp/Otp-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(otpRequest)
    })
    .then(response => {
     
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();  // assuming the server returns a plain text OTP
    })
    .then(data => {
     
      showNotification(`Your Message: ${data}`);
      console.log("OTP!!!", data);
      seIsNewPw(true);
     
      

    })
    .catch(error => {
     
      showNotification('Error verifying OTP!');
      console.error("Error verifying OTP:", error);
      setIsForgotPassword(true);
    
      

    });
  }

  const handleNewPassword = (e) => {
   
    e.preventDefault();
    
    const password = {newPw};
    const passwordRequest = {
      email: email,
      password: newPw // Use the state value correctly
    };
    showNotification(`Your new password: ${passwordRequest.newPw}`);
    closeNewPassword();
    
    fetch("http://localhost:8080/npw/NewPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordRequest)
    })
    .then(response => {
     
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        openLoginModal();
      }
      return response.text();  // assuming the server returns a plain text OTP
    })
    .then(data => {
     
      showNotification(`Your new password: ${data}`);
      console.log("NewPassword!!!", data);
     
      openLoginModal();
     
      

    })
    .catch(error => {
     
      showNotification('Error Setting NewPassword!');
      console.error("Error Setting NewPassword!:", error);
      setIsForgotPassword(true);

    });
  }


  const openSettingsModal = () => {
    setSettingsModalVisible(true);
  };
  
  const closeSettingsModal = () => {
    setSettingsModalVisible(false);
  };

  const [isServiceProviderModalVisible, setServiceProviderModalVisible] = useState(false);
 
const openServiceProviderModal = () => {
  setServiceProviderModalVisible(true);
}

const closeServiceProviderModal = () => {
setServiceProviderModalVisible(false);
}

const [serviceProviderType, setserviceProviderType] = useState();
const [serviceProviderDescription, setserviceProviderDescription] = useState();

const handleConfirmPassword = (e) => {
  e.preventDefault();

  // Check if passwords match
 
};

useEffect(() => {
  if ((password !== confirmPassword) && (password != null)) {
    showNotification('Passwords do not match!');
  } else if((password != null)) {
    showNotification('Passwords match!');
  }

}, [confirmPassword]); 

const handleServiceProviderSignup = (e) => {
  e.preventDefault();
  const newServiceProvider = { name, email, username, password, serviceType:serviceProviderType, serviceProviderDescription,approved:false };


  console.log(newServiceProvider);

  fetch("http://localhost:8080/auth/serviceProviderSignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newServiceProvider)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();  // assuming the server returns JSON
  })
  .then(data => {
    if(data==='Username already exists'){
      showNotification('Registration failed! Username is already in use');

    }
    if(data==='Email already exists'){
      showNotification('Registration failed! Email is already registered');

    }
    if(data==='ok'){
      showNotification('Registration successful!. Please wait for the approval');
      
      console.log("New Service Provider signed up successfully", data);
      closeServiceProviderModal();
    }
    
     
  })
  .catch(error => {
    showNotification('Registration failed!');
      console.error("Error adding new service provider:", error);
  });
}

const handleInputChange = async (event) => {
  const value = event.target.value;
  setInputValue(value);
  //console.log(value);
  if (value.length > 0) {
    const url = `http://localhost:8080/api/courses/personalizedSuggestions?travellerId=${authenticatedID}&searchString=${value}`;
    //console.log('Fetching URL:', url);
    try {
      //const response = await fetch("http://localhost:8080/api/courses/personalizedSuggestions?travellerId=${travellerId}&searchString=${value}")
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //const response = await fetch(`/api/courses/personalizedSuggestions?travellerId=${travellerId}&searchString=${value}`);
      //console.log('Fetching response: ', url)
      const responseText = await response.text();
      console.log('Suggestions:', responseText);
      
      try {
        const data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
        setSuggestions(data);

        if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
          setSuggestions(data);
        } else {
          console.error('Data does not have the expected structure:', data);
        }

      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  } else {
    setSuggestions([]);
  }
};

const [loginAttempts, setLoginAttempts] = useState(0);
const [isLocked, setIsLocked] = useState(false);
const [timer, setTimer] = useState(0);



useEffect(() => {
  let interval = null;
  if (isLocked && timer > 0) {
   
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  } else if (timer === 0) {
    setIsLocked(false);
    setLoginAttempts(0);
    clearInterval(interval);
  

  }
  return () => clearInterval(interval);
}, [isLocked, timer]);

const handleSuggestionClick = (suggestion) => {
  setInputValue(suggestion);
  setSuggestions([]);
};

const [listings, setListings] = useState({
  courses: 0,
  destinations: 0,
  hotels: 0,
  packages: 0,
});


useEffect(() => {
  fetch("http://localhost:8080/api/courses/listingcount", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  .then(response =>{
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
.then(data =>{
  setListings({
    courses: data.Courses,
    destinations: data.TravelLocations,
    hotels: data.Hotels,
    packages: data.Packages
  });
})
.catch(error => console.error('Error getting list count!',error));

}, []);

const handleHomeSearchClick = () => {
  const inputValue = document.getElementById('HomeSearchInputValue').value;
  console.log('Main search input: ', inputValue);
  handleHomeSearch(inputValue);
  //document.getElementById('searchTextHome').value = inputValue;
};


  return (
    <body>
    
  <div id="content">

  </div>
      <div>





        <section className="top-area">

          <div className="header-area">
       
          <nav className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000" style={{position:'fixed',width:'70%',height:'85px',borderRadius: '60px', padding: '0',marginTop: '10px',marginLeft:'15%', opacity:'0.9', backgroundColor:'#E6E6FA'}} >
           
          {authenticated && (
                  <p style={{position:'fixed',left:'20px',top:'20px',color:'white', fontSize: '15px', float:'left', fontFamily: "Lucida Console", marginLeft:'10px'}}>Welcome! {username}<br/>Happy Exploring!</p>
                )}
            <div className="navbar-header">
                
                <img src='../logo/logo.jpg' alt="clients" style={{ width: '79px', borderRadius: '60px', marginTop:'3px'}} />
                 
                </div>
              <div className="container" >
                

                <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu" style={{ marginTop:'5px'}} >
               
                  <ul className="nav navbar-nav navbar-right menu" data-in="fadeInDown" data-out="fadeOutUp">
                  
                    <li id='menu-home' > <Link className="scroll" to="home" smooth={true} duration={1500} offset={offset}>
                      Home 
                    </Link><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-works'> <Linkrout to="/faqs" >
                      About Us 
                    </Linkrout><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-explore'>        <Link to="explore" smooth={true} duration={1500} offset={offset}>
                      Explore 
                    </Link><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-blog'>        <Link to="blog" smooth={true} duration={1500} offset={offset}>
                      Blog 
                    </Link><span className='menu-divider'>|</span></li>


                    <li className="scroll" id='menu-contact'>        <Link to="contact" smooth={true} duration={1500} offset={offset}>
                      Contact
                    </Link><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-contact'>        <Link onClick={openServiceProviderModal} to="home" smooth={true} duration={1500} offset={offset}>
                      Join us!
                    </Link>   {authenticated && (<span className='menu-divider'>|</span> )}</li>
                    {authenticated && (
                            <li className="scroll" id='menu-contact'>        <Link  to="MyBookings" smooth={true} duration={1500} offset={offset}>
                            My Bookings
                            </Link><span className='menu-divider'></span></li>
                 )}

    <div className="dropdown" style={{display:'inline'}}>
      <button id="menu" onClick={toggleDropdown}>
      <MenuIcon style={{ fontSize: 35, color: 'red' }} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
          
        </ul>
      )}
    </div>
                  
                  </ul>
              
                </div>
               
              </div>
           
            </nav>
          </div>
          <div className="clearfix"></div>
        </section>
        <AnimatePresence>
                {notification && (
                    <Notification message={notification} onClose={handleNotificationClose} />
                )}
            </AnimatePresence>
            {isLoginModalVisible && (


<motion.div
  initial={{
    opacity: 0
  }}
  animate={{
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }}
  exit={{
    opacity: 0,

    transition: {
      duration: 0.5,
    },
  }}
  id="loginModal-login" class='loginForm' >
  <motion.div
    initial={{
      opacity: 0,
      y: -50,  // Start 50px above its initial position
    }}
    animate={{
      opacity: 1,
      y: 0,  // Move to its original position
      transition: {
        duration: 0.5,  // Duration of the animation
      },
    }}
    exit={{
      opacity: 0,
      y: -50,  // Slide back up when exiting
      transition: {
        duration: 0.5,
      },
    }}
    class='loginFormContent' style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}>
 <div>
 <span className="close-button" onClick={closeLoginModal}>&times;</span>
    <h2>Login  </h2>
    {isLocked && <p style={{color: '#000000'}}>Please wait {timer} seconds before retrying.</p>    }
  {isLocked &&      <div id="loginLoading" style={{display: 'block', zIndex: '100000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>}
    <form >
 
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" required
        onChange={(e) => setUsername(e.target.value)} disabled={isLocked} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required
        onChange={(e) => setPassword(e.target.value)} disabled={isLocked}/>
      <button type="submit" onClick={handleLogin} disabled={isLocked} >Submit</button>
      <a href="#">Not registered? <button className='formBut' type="button" onClick={openSignupModal}>Sign up</button></a>
      <a href="#">Forgot your password? <button className='formBut' type="button" onClick={handleForgotPasswordClick} style={{textDecoration: 'underline',fontStyle: 'italic'}}> Reset Password</button></a>
    </form>
    </div>
  </motion.div>
</motion.div>

)}



        {isSignupModalVisible && (

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5
              }
            }}
            exit={{
              opacity: 0,

              transition: {
                duration: 0.5,
              },
            }}
            id="loginModal-login" class='loginForm' >
            <motion.div
              initial={{
                opacity: 0,
                y: -50,  // Start 50px above its initial position
              }}
              animate={{
                opacity: 1,
                y: 0,  // Move to its original position
                transition: {
                  duration: 0.5,  // Duration of the animation
                },
              }}
              exit={{
                opacity: 0,
                y: -50,  // Slide back up when exiting
                transition: {
                  duration: 0.5,
                },
              }}
              class='loginFormContent' style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}>

<span className="close-button" onClick={closeSignupModal}>&times;</span>
              <h2>Sign up</h2>
             
              <form>
              
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required 
                onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required 
                onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="country">Country:</label>
                <input type="text" id="country" name="country" required 
                onChange={(e) => setCountry(e.target.value)} />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required 
                 onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required 
                 onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" onClick={handleSignup} >Submit</button>
                <a href="#">Already have an account? <button className='formBut' type="button" onClick={openLoginModal}>Log in</button></a>
              </form>
            </motion.div>
          </motion.div>

)}

{isForgotPassword && (

<motion.div
  initial={{
    opacity: 0
  }}
  animate={{
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }}
  exit={{
    opacity: 0,

    transition: {
      duration: 0.5,
    },
  }}
  id="loginModal-login" class='loginForm' >
  <motion.div
    initial={{
      opacity: 0,
      y: -50,  // Start 50px above its initial position
    }}
    animate={{
      opacity: 1,
      y: 0,  // Move to its original position
      transition: {
        duration: 0.5,  // Duration of the animation
      },
    }}
    exit={{
      opacity: 0,
      y: -50,  // Slide back up when exiting
      transition: {
        duration: 0.5,
      },
    }}
    class='loginFormContent' style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}>
                <div id="loading" style={{display: 'none', zIndex: '100000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>
    <span className="close-button" onClick={closeForgotPassword}>&times;</span>
    <h2>Password reset</h2>
    <form>
    <label htmlFor="OTPemail">Enter your email address:</label>
    <input type="email" id="OTPemail" name="email" value={email} onChange={handleEmailChange} required />
    <button type="submit" onClick={handleSendOtp}>Send OTP</button>
    
    </form>
  </motion.div>
</motion.div>

)}

{isOtpSent && (

<motion.div
  initial={{
    opacity: 0
  }}
  animate={{
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }}
  exit={{
    opacity: 0,

    transition: {
      duration: 0.5,
    },
  }}
  id="loginModal-login" class='loginForm' >
  <motion.div
    initial={{
      opacity: 0,
      y: -50,  // Start 50px above its initial position
    }}
    animate={{
      opacity: 1,
      y: 0,  // Move to its original position
      transition: {
        duration: 0.5,  // Duration of the animation
      },
    }}
    exit={{
      opacity: 0,
      y: -50,  // Slide back up when exiting
      transition: {
        duration: 0.5,
      },
    }}
    class='loginFormContent' style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}>

    <span className="close-button" onClick={closeForgotPasswordOtp}>&times;</span>
    <h2>Password reset</h2>
    <form>

    <label htmlFor="otp">Enter the OTP:</label>
    <input type="text" id="otp" name="otp" value={otp} onChange={handleOtpChange} required />
    <button type="submit" onClick={handleVerifyOtp} >Verify OTP</button>
   
    
    </form>
  </motion.div>
</motion.div>

)}

{isNewPw && (

<motion.div
  initial={{
    opacity: 0
  }}
  animate={{
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }}
  exit={{
    opacity: 0,

    transition: {
      duration: 0.5,
    },
  }}
  id="loginModal-login" class='loginForm' >
  <motion.div
    initial={{
      opacity: 0,
      y: -50,  // Start 50px above its initial position
    }}
    animate={{
      opacity: 1,
      y: 0,  // Move to its original position
      transition: {
        duration: 0.5,  // Duration of the animation
      },
    }}
    exit={{
      opacity: 0,
      y: -50,  // Slide back up when exiting
      transition: {
        duration: 0.5,
      },
    }}
    class='loginFormContent' style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}>

    <span className="close-button" onClick={closeNewPassword}>&times;</span>
    <h2>Password reset</h2>
    <form>

    <label htmlFor="newPw">Enter the New Password:</label>
    <input type="password" id="newPw" name="newPw" value={newPw} onChange={handleNewPwChange} required />
    
    <button type="submit" onClick={handleNewPassword} >Update</button>

    
    </form>
  </motion.div>
</motion.div>

)}

{isSettingsModalVisible && (
          <SettingsModal
            isSettingsModalVisible={isSettingsModalVisible}
            closeSettingsModal={closeSettingsModal}
            username={username}
          />
)}

{isServiceProviderModalVisible && (
          
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5
              }
            }}
            exit={{
              opacity: 0,

              transition: {
                duration: 0.5,
              },
            }}
            id="loginModal-login" class='loginForm' >
            <motion.div
              initial={{
                opacity: 0,
                y: -50,  // Start 50px above its initial position
              }}
              animate={{
                opacity: 1,
                y: 0,  // Move to its original position
                transition: {
                  duration: 0.5,  // Duration of the animation
                },
              }}
              exit={{
                opacity: 0,
                y: -50,  // Slide back up when exiting
                transition: {
                  duration: 0.5,
                },
              }}
              class='loginFormContent' style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}>

              <span className="close-button" onClick={closeServiceProviderModal}>&times;</span>
              <h2>Register as Service Provider</h2>
              <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required 
                onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required 
                onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required 
                 onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required 
                 onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required 
                 onChange={(e) => setConfirmPassword(e.target.value)} />
                 <label htmlFor="serviceProviderType">Service Type:</label>
                <select id="serviceProviderType" name="serviceProviderType" required onChange={(e) => setserviceProviderType(e.target.value)} >
                 <option value="">Select a service type</option>
                <option value="Course">Courses</option>
                <option value="Event">Events</option>
                <option value="Hotel">Hotels</option>
                <option value="Package">Packages</option>
                <option value="Transport">Transport</option>
                <option value="TravelLocation">Travel Locations(Guide)</option>

                </select>

                 <label htmlFor="serviceProviderDescription">Service Provider Description:</label>
                <input type="text" id="serviceProviderDescription" name="serviceProviderDescription" required 
                 onChange={(e) => setserviceProviderDescription(e.target.value)} />
                 
                <button type="submit" onClick={handleServiceProviderSignup} >Submit</button>
              </form>
            </motion.div>
          </motion.div>
        )}

<section id="home" className="welcome-hero">

  <div className="container">
    <div className="welcome-hero-txt">

      <h2>Best place to learn and explore <br /> Sri Lanka </h2>
      <p>
        Find Best Places to Travel, Learn, Stay and many more in just One click
      </p>
    </div>
    <div className="welcome-hero-serch-box">
      <div className="welcome-hero-form">
        <div className="single-welcome-hero-form">
          <form action="index.html">
          <input  id ="HomeSearchInputValue" type="text" placeholder="Enter Attractions/ Hotel/ Courses/ Travel Plans"
            value={inputValue}
            onChange={handleInputChange} 
            />
          </form>
          {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-item"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
        </div>
      </div>
      <div className="welcome-hero-serch"  ><Link to="explore" smooth={true} duration={1500} offset={offset}>
        <button className="welcome-hero-btn" onClick={() => {
    handleHomeSearchClick(); // Ensure the function gets called
  }} > 
                    search
                   
           <i data-feather="search"></i>
        </button>
        </Link>
      </div>
    </div>
  </div>
</section>
</div>

{/* <!--list-topics start -->  */}
<section id="list-topics" class="list-topics">
<div class="container">
  <div class="list-topics-content">
    <ul>
      <li>
        <div class="single-list-topics-content">

          <img class="services-icon" src={University} alt="uni image" />

          <h2><a href="#">Courses</a></h2>
          <p>{listings.courses} listings</p>
        </div>
      </li>
      <li>
        <div class="single-list-topics-content">
          <img class="services-icon" src={Destination} alt="travel image" />
          <h2><a href="#">Destinations</a></h2>
          <p>{listings.destinations} listings</p>
        </div>
      </li>
      <li>
        <div class="single-list-topics-content">
          <img class="services-icon" src={Hotel} alt="hotel image" />
          <h2><a href="#">Hotels</a></h2>
          <p>{listings.hotels} listings</p>
        </div>
      </li>
      <li>
        <div class="single-list-topics-content">
          <img class="services-icon" src={Tour} alt="tour image" />
          <h2><a href="#">Packages</a></h2>
          <p>{listings.packages} listings</p>
        </div>
      </li>

    </ul>
  </div>
</div>{/* <!--/.container--> */}



</section>{/* <!--/.list-topics--> */}
{/* <!--list-topics end--> */}

<section id="guide-section" className="guide-section">
        <div className="container">
        <Guide /> 
        </div>
      </section>

</body>
);
}
import React, { useState, useEffect } from 'react';
import University from './assets/images/university.png';
import Destination from './assets/images/destination.png';
import Hotel from './assets/images/hotel.png';
import Tour from './assets/images/tour.png';
import './home.css';
import './assets/css/bootstrapMin.css';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Dropdown } from 'rsuite';
import { useUserId } from './UserIdContext';
import Notification from './Notification'; 
import { AnimatePresence } from 'framer-motion';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, TextField,Typography, Box} from '@mui/material';
import axios from 'axios';
import ServiceEditModal from './ServiceEditModal';
import ChatManageAdmin from './ChatManageAdmin';


import { jwtDecode } from 'jwt-decode';
import tokenService from './TokenService'; 


const showAlert = () => {
  window.alert('This is an alert!');
};

export default function MainHeader() {
  const items = ['Manage Users', 'Manage services', 'View Inquiries', 'Settings', 'Manage Chat','Logout'];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [incorrectPwdCnt, setIncorrectPwdCnt] = useState(0);
  const [authenticated, setAuthenticated] = useState();
  const [otp, setOtp] = useState();
  const [services, setServices] = useState([]);
  const [previousServices, setPreviousServices] = useState([]);
  const [selectedService, setUpdatedCourse] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [authenticatedID, setAuthenticatedID] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [responseText, setResponseText] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  

  useEffect(() => {
    const token = localStorage.getItem('AdminAuthToken');

    if (token) {
      try {

        const decodedToken = jwtDecode(token);
        const verifyTokenUserId = tokenService.verifyToken(token);
        if(verifyTokenUserId!=false)
        {
        
        const userNameFromToken = decodedToken.username;
        setAuthenticatedID(decodedToken.id);
        setUsername(userNameFromToken);
       // updateLogin();
        setAuthenticated(true);
        setLoginModalVisible(false);
        console.log("Authenticated token ID Admin:"+ verifyTokenUserId);

        }else{
          showNotification("Session expired! Please login again to continue") 
         setAuthenticated(false);
         setLoginModalVisible(true);
          console.log(" Session Expired:");

        }

      } catch (error) {
        
        console.error("Invalid token:", error);
      }
    }else{
      openLoginModal();
    }

    // Update `items` based on authentication status
   
    // Optional: Log after updating state
    console.log("Auth status admin", authenticated);
    //console.log("User ID:", authenticatedID);

  }, [authenticated]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);

    if (item === 'Logout') {
      localStorage.removeItem('AdminAuthToken');
      setAuthenticated(false);

    } else if (item === 'Manage Users') {
      // Handle manage users action
    } else if (item === 'Manage services') {
      fetchServices();
    } else if (item === 'View Inquiries') {
      fetchInquiries();
      // Handle settings action
    }else if (item === 'Settings') {
      // Handle settings action
    }
  };

  const fetchServices = () => {
    fetch('http://localhost:8080/api/courses') // Adjust the URL according to your API
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log data to verify structure
        setServices(data);
      })
      .catch(error => console.error('Error fetching services:', error));
  };

  const fetchInquiries = () => {
    fetch('http://localhost:8080/api/inquiries') 
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log data to verify structure
        setInquiries(data);
      })
      .catch(error => console.error('Error fetching services:', error));
  };

  const handleRespondClick = (inquiry) => {
    setSelectedInquiry(inquiry);
    setResponseText('');
  };

  const handleResponseSubmit = async () => {
    if (!selectedInquiry) return;

    try {
      const response = await axios.post(`http://localhost:8080/api/inquiries/respond/${selectedInquiry.id}`, { response: responseText }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        showNotification('Response sent successfully');
        setSelectedInquiry(null);
        setResponseText('');
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('There was an error sending the response!', error);
    }
  };

  <DataGrid
  rows={inquiries}
  columns={[
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'message', headerName: 'Message', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
  ]}
  pageSize={10}
  checkboxSelection
/>

const serviceColumns = [
  { field: 'id', headerName: 'ID', width: 70 }, // ID column
  { field: 'title', headerName: 'Title', width: 130 }, // Title column
  { field: 'price', headerName: 'Price', width: 90 }, // Price column
  {
    field: 'image',
    headerName: 'Image',
    width: 180,
    renderCell: (params) => (
      <div>
        {Array.isArray(params.row.image) ? params.row.image.join(', ') : params.row.image}
      </div>
    )
  }, // Image column (displaying as comma-separated links)
  { field: 'type', headerName: 'Type', width: 130 }, // Type column
  {
    field: 'approved',
    headerName: 'Approval',
    width: 130,
    renderCell: (params) => (
      <Button
        variant={params.value ? "contained" : "outlined"}
        color={params.value ? "success" : "error"}
        onClick={() => handleApprovalToggle(params.id)} // Approval button logic remains the same
      >
        {params.value ? "Approved" : "Approve"}
      </Button>
    )
  }, // Approval button column
  {
    field: 'edit',
    headerName: 'Edit',
    width: 120,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handeledit(params.row.id)} // Edit button logic remains the same
      >
        Edit
      </Button>
    )
  } // Edit button column
];

const handleAddService = async (updatedService) => {
  try {
    // Prepare formData to match backend structure
    const formData = new URLSearchParams(); // Using URLSearchParams for x-www-form-urlencoded format

    // Append base fields
    formData.append('name', updatedService.title);
    formData.append('price', updatedService.price);
    formData.append('location', updatedService.location);
    formData.append('type', updatedService.type);
    formData.append('details', updatedService.details);
    formData.append('ratings', updatedService.ratings || 5);
    formData.append('reviews', updatedService.reviews || '');
    formData.append('paymentRefund', updatedService.paymentRefund);
    formData.append('contactNumber', updatedService.contactNumber);
    formData.append('email', updatedService.email);
    formData.append('numBookings', updatedService.numBookings || 0);

    // Append images as a list (multiple 'image' parameters)
    if (Array.isArray(updatedService.image)) {
      updatedService.image.forEach((imgUrl) => {
        formData.append('image', imgUrl); // Add each image URL as a separate form parameter
      });
    }

    // Switch case based on the service type
    switch (updatedService.type) {
      case 'Course':
        formData.append('educationalFocus', updatedService.educationalFocus);
        formData.append('eventDuration', updatedService.eventDuration);
        formData.append('learningOutcome', updatedService.learningOutcome);
        formData.append('startDate', updatedService.startDate);
        formData.append('endDate', updatedService.endDate);
        formData.append('prerequisites', updatedService.prerequisites);
        formData.append('courseLevel', updatedService.courseLevel);
        formData.append('courseCategory', updatedService.courseCategory);
        formData.append('courseAttendance', updatedService.courseAttendance);
        formData.append('maxParticipants', updatedService.maxParticipants);
        formData.append('instructorName', updatedService.instructorName);
        formData.append('isCertified', updatedService.isCertified ? 'true' : 'false');
        break;

      case 'TravelLocation':
        formData.append('destination', updatedService.destination);
        formData.append('travelDate', updatedService.travelDate);
        formData.append('travelers', updatedService.travelers);
        formData.append('guideName', updatedService.guideName);
        break;

      case 'Hotel':
        formData.append('luxRoomPrice', updatedService.luxRoomPrice);
      formData.append('normalRoomPrice', updatedService.normalRoomPrice);
      formData.append('availableLuxRooms', updatedService.availableLuxRooms);
      formData.append('availableNormalRooms', updatedService.availableNormalRooms);
      formData.append('hasParking', updatedService.hasParking ? 'true' : 'false');
      formData.append('hasBreakfastIncluded', updatedService.hasBreakfastIncluded ? 'true' : 'false');
      formData.append('isAllInclusive', updatedService.isAllInclusive ? 'true' : 'false'); 
      formData.append('checkInTime', updatedService.checkInTime);
      formData.append('checkOutTime', updatedService.checkOutTime);
      formData.append('checkInDate', updatedService.checkInDate); // Add check-in date
      formData.append('checkOutDate', updatedService.checkOutDate); // Add check-out date
      formData.append('rooms', updatedService.rooms); // Add number of rooms
      formData.append('hotelWeblink', updatedService.hotelWeblink || '');
        break;

      case 'Transport':
        formData.append('transportType', updatedService.transportType);
        formData.append('vehicleType', updatedService.vehicleType);
        formData.append('maxPassengers', updatedService.maxPassengers);
        formData.append('isSelfDrive', updatedService.isSelfDrive ? 'true' : 'false');
        break;

      case 'Package':
        formData.append('packageType', updatedService.packageType);
        formData.append('startDate', updatedService.startDate);
        formData.append('endDate', updatedService.endDate);
        formData.append('packageLocations', updatedService.packageLocations);
        break;

      case 'Event':
        formData.append('eventDate', updatedService.eventDate);
        formData.append('startTime', updatedService.startTime);
        formData.append('maxAttendees', updatedService.maxAttendees);
        formData.append('venue', updatedService.venue);
        formData.append('eventHost', updatedService.eventHost);
        break;

      default:
        console.error(`Unknown service type: ${updatedService.type}`);
        break;
    }

    // Send the POST request to the backend
    const response = await fetch("http://localhost:8080/api/courses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Use form-urlencoded for sending form data
      },
      body: formData.toString(), // Send the form data as a string
    });

    if (response.ok) {
      console.log("Service added successfully");
      showNotification("Service added successfully!");
    } else {
      throw new Error(`Failed to add service. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error adding service:", error.message || error);
    showNotification("Error adding service!");
  }
};


const notifyServiceProvider = async (programId) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/courses/notify/${programId}`);
    
    if (response.status === 200) {
      console.log("Notification sent to service provider successfully.");
    } else {
      throw new Error(`Failed to send notification. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending notification:', error.message || error);
  }
};



  const [sentOtp, setSentOtp] = useState(false);

  const [notification, setNotification] = useState(null);

   
    const showNotification = (message) => {
      setNotification(message);
  };

    const handleNotificationClose = () => {
        setNotification(null); // Clear the notification when it is closed
    };

  const openLoginModal = () => {
    setLoginModalVisible(true);
    setIsVisible(true);
  };

  const offset = -window.innerHeight * 0.25;

  const closeLoginModal = () => setLoginModalVisible(false);

  useEffect(() => {
    if(authenticated == false) 
    {
      setLoginModalVisible(true);
    }
   
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    document.getElementById('otploading').style.display = 'block';
    console.log(username, password);
  
    const loginData = {
        username: username,
        password: password
    };
  
    fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)  // Correctly stringify the object as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        return response.text();  // Parse the response body as JSON
    })
    .then(data => {
        if (data === 'Username or password is incorrect!') {  // Use 'data' instead of 'response.text'
          showNotification('Username or password is incorrect!');  // Display the error message from the server
            setLoginAttempts((prev) => prev + 1);
            document.getElementById('otploading').style.display = 'none';
            if (loginAttempts >= 2) {
              setIsLocked(true);
              setTimer(30); // Set timer to 30 seconds
            }// Display the error message from the server
            
        } else {
            //showNotification('Login Successful!');
            //onsole.log("Login Successful", data);
            //setAuthenticated(true);
          
           
            // Handle success: redirect or set logged-in state
            //setSentOtp(true);
            handleSendOtp(username);
        }
    })
    .catch(error => {
      showNotification('Login failed!');  // Display a generic error message
        console.error("Error logging in:", error);
    });
  };

  useEffect(() => {
    console.log('Incorrect password count:', incorrectPwdCnt);
    if (incorrectPwdCnt > 2) {
      window.alert('Too many failed login attempts. Please try again later.');
      // Lock the frontend
      setLoginModalVisible(false);
    }
    if (incorrectPwdCnt >= 3) {
      // Send a warning to the backend
      fetch("http://localhost:8080/admin/login-warning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          console.log("Warning sent to backend:", data);
        })
        .catch(error => {
          console.error("Error sending warning to backend:", error);
        });
    }
  }, [incorrectPwdCnt]);

  const handleCancelClickOtp = () => {
    setSentOtp(false);
  };

  const handleSendOtp = (username) => {

    const otpRequest = {
      username: username
    };
    console.log("OTP REQUEST", username);

    //handleCancelClick();
    fetch("http://localhost:8080/api/admin/sendOtp", {
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
     
      showNotification(`OTP sent successfully, check your email!`);
      console.log("OTP sent successfully!", data);
      document.getElementById('otploading').style.display = 'none';
      closeLoginModal();
      setSentOtp(true);
      
    })
    .catch(error => {
     
      showNotification('Error sending OTP!');
      console.error("Error sending OTP:", error);
      document.getElementById('otploading').style.display = 'none';
      handleCancelClickOtp();
      setLoginModalVisible(true);

    });
  }

  const handleVerifyOtp = (e) => {
   
    e.preventDefault();
    
    const otpInput = document.getElementById('otp');
    const otpRequest = {
      username: username,
      otp: otpInput.value
    };
    handleCancelClickOtp();
    fetch("http://localhost:8080/Otp/admin/Otp-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(otpRequest)
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
      if (data.message == 'OTP verification failed for admin!') {

        showNotification(`OTP Verifcation failed!`);
        console.log("OTP!!!", data);
       
        //seIsNewPw(true);
       // setAuthenticated(true);
        //loadTable();

      }else{

        showNotification("OTP Verified Successfully!")

        localStorage.setItem('AdminAuthToken', data.token);

        const token = localStorage.getItem('AdminAuthToken');
       
        const adminId = tokenService.verifyToken(token);

        showNotification(`OTP Verifcation successful!`);
        console.log("OTP!!!", adminId);
       
        //seIsNewPw(true);
        setAuthenticated(true);
        //loadTable();

      }
     

     

    })
    .catch(error => {
     
      showNotification('Error verifying OTP!');
      console.error("Error verifying OTP:", error);
      handleCancelClickOtp();
      setLoginModalVisible(true);
      

    });
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

const handleApprovalToggle = (id, approved) => {
  console.log(id);
  saveLog('info', `Service approval toggled for service ID: ${id}`);
  fetch(`http://localhost:8080/api/courses/${id}/approve`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.text();
    })
    .then(() => {
      console.log("Successfully approved");
      showNotification('Successfully approved');
      const updatedServices = services.map(service =>
        service.id === id ? { ...service, approved } : service
      );
      setServices(updatedServices);
    })
    .catch(error => {
      showNotification('Error updating approval status!');
      console.error('Error updating approval status:', error);
    });
};

const saveLog = (action, details) => {
  try {
    const logEntry = {
      action: action,
      details: details,
      timestamp: new Date().toISOString(), // Optional
    };

    // Retrieve existing logs or initialize an empty array
    const existingLogs = JSON.parse(localStorage.getItem('logs')) || [];
    existingLogs.push(logEntry);

    // Save updated logs back to localStorage
    localStorage.setItem('logs', JSON.stringify(existingLogs));

    console.log('Log saved successfully');
  } catch (error) {
    console.error('Error saving log:', error.message || error);
  }
};

const [saving, setSaving] = useState(false);

const handleSaveEdit = async () => {
  setSaving(true); // Optional: Show "Saving..." indicator
  
  try {
    // Check if `selectedService` has an `id` and is valid
    if (!selectedService || !selectedService.id) {
      throw new Error("Selected service or ID is missing");
    }

    // Step 1: Delete the existing program by ID
    const deleteResponse = await axios.delete(`http://localhost:8080/api/courses/delete/${selectedService.id}`);
    
    if (deleteResponse.status === 204) {
      console.log('Service deleted successfully');

      // Step 2: After deletion, call the add service method to add the updated program
      await handleAddService(selectedService);
      showNotification('Service updated successfully');

      // Step 3: Notify the service provider
      await notifyServiceProvider(selectedService.id+1);  // Call the notify function after adding the service

    } else {
      throw new Error(`Failed to delete service. Status: ${deleteResponse.status}`);
    }
  } catch (error) {
    console.error('Error during the edit process:', error.message || error);
    showNotification('Error saving edits!');
  } finally {
    setSaving(false); // Optional: Remove "Saving..." indicator
    setUpdatedCourse(null);
    setReviewModalOpen(false);
  }
};

const fetchEditService = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/courses/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch service with id ${id}. Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the service data (CourseDto)
  } catch (error) {
    console.error('Error fetching service:', error);
    return null; // Return null if there is an error
  }
};



  
const handeledit = async (id) => {
  const serviceToReview = await fetchEditService(id); // Fetch the specific service by id
  if (serviceToReview) {
    console.log(serviceToReview);
    setUpdatedCourse(serviceToReview); // Set the fetched service as the selected service to edit
    setReviewModalOpen(true); // Open the modal
  } else {
    console.error("Service not found or failed to fetch.");
  }
};



const rows = [
  { id: 1, approved: 0, email: 'sp1@example.com', name: 'Service Provider 1', otp: '1234', password: 'password1', service_provider_description: 'Description 1', service_type: 'Type A', username: 'sp1' },
  { id: 2, approved: 0, email: 'sp2@example.com', name: 'Service Provider 2', otp: '5678', password: 'password2', service_provider_description: 'Description 2', service_type: 'Type B', username: 'sp2' },
  // Add more rows as needed
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'otp', headerName: 'OTP', width: 100 },
  { field: 'password', headerName: 'Password', width: 150 },
  { field: 'service_provider_description', headerName: 'Description', width: 200 },
  { field: 'service_type', headerName: 'Service Type', width: 150 },
  { field: 'username', headerName: 'Username', width: 150 },
  {
    field: 'approved',
    headerName: 'Approved',
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color={params.row.approved ? 'error' : 'success'}
        onClick={() => handleApprovalToggle(params.row.id)}
      >
        {params.row.approved ? 'Lock' : 'Approve'}
      </Button>
    ),
  },
];


  return (
    <body>
    
  <div id="content">

  </div>
      <div>





        <section className="top-area">

          <div className="header-area">
        
          <nav className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000" style={{position:'fixed',width:'70%',height:'85px',borderRadius: '60px', padding: '0',marginTop: '10px',marginLeft:'15%', opacity:'0.9', backgroundColor:'#E6E6FA'}} >
            <div className="navbar-header">
                
                <img src='../logo/logo.jpg' alt="clients" style={{ width: '79px', borderRadius: '60px', marginTop:'3px'}} />
                 
                </div>
              <div className="container" >
                
                <div id="loading" style={{display: 'none', zIndex: '100000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>
                <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu" style={{ marginTop:'5px'}} >
               
                  <ul className="nav navbar-nav navbar-right menu" data-in="fadeInDown" data-out="fadeOutUp">
                  
                    <li id='menu-home' > <Link className="scroll" to="home" smooth={true} duration={1500} offset={offset}>
                      Users 
                    </Link><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-works'> <Link to="works" smooth={true} duration={1500} offset={offset}>
                      Service Providers 
                    </Link><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-explore'>        <Link to="explore" smooth={true} duration={1500} offset={offset}>
                      Posts 
                    </Link><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-blog'>        <Link to="blog" smooth={true} duration={1500} offset={offset}>
                      Blog 
                    </Link></li>


    

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


                  {authenticated && (
                  <p style={{ fontSize: '15px', float:'left', fontFamily: "Lucida Console", marginLeft:'10px'}}>Welcome! {username}<br/>Happy Exploring!</p>
                  
                )}

{authenticated && selectedItem === 'Manage services' && (
  <div style={{ height: 500, width: '100%', marginTop: '100px' }}>
    <DataGrid
      rows={services}
      columns={serviceColumns}
      pageSize={10}
      checkboxSelection
    />
  </div>
)}

{authenticated && selectedItem === 'Manage Chat' && (
  <div style={{
    display: 'flex',
    flexDirection: 'column', // Stacks children vertically
    height: '100vh',  // Makes the div take up the full vertical height of the screen
    width: '100%',    // Makes it take the full width of the container/screen
    padding: '20px',  // Adds padding for a little space around the content
    overflow: 'hidden', // Prevents unwanted scrolling
    boxSizing: 'border-box', // Ensures padding and borders are included in the element's total width/height
    backgroundColor: '#f5f5f5', // Optional: Adds a light background color for better visual appeal
    paddingBottom: '145px'
  }}>
    <div style={{ 
      flex: 1, // This makes the CommentsAndDiscussions container take up all available space except for the button area
      overflowY: 'auto' // Makes sure it scrolls if content overflows
    }}>
      <ChatManageAdmin/>
    </div>
  </div>
)}

{authenticated && selectedItem === 'View Inquiries' && (
  <div style={{ height: 450, width: '100%', marginTop: '100px' }}>
    <DataGrid
      rows={inquiries}
      columns={[
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'message', headerName: 'Message', width: 300 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
          field: 'respond',
          headerName: 'Respond',
          width: 150,
          renderCell: (params) => (
            params.row.status !== 'RESPONDED' ? (
              <Button variant="contained" color="primary" onClick={() => handleRespondClick(params.row)}>
                Respond
              </Button>
            ) : null
          ),
        },
      ]}
      pageSize={10}
      //checkboxSelection
    />
    {selectedInquiry && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Respond to Inquiry</Typography>
          <TextField
            label="Response"
            multiline
            rows={4}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            fullWidth
          />
          <Button onClick={handleResponseSubmit} sx={{ mt: 2 }} variant="contained" color="primary">
            Send
          </Button>
        </Box>
      )}
  </div>
)}

{authenticated && (
  <div style={{ height: 400, width: '85%', marginTop:'200px', marginLeft:'50px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>                  
                )}


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
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5 }
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5 }
            }}
            id="loginModal-login" className='loginForm'
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }}
              exit={{
                opacity: 0,
                y: -50,
                transition: { duration: 0.5 }
              }}
              className='loginFormContent' 
              style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}
            >
                                 <div id="otploading" style={{display: 'none', zIndex: '10000000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>    {isLocked && <p style={{color: '#000000'}}>Please wait {timer} seconds before retrying.</p>    }
  {isLocked &&      <div id="loginLoading" style={{display: 'block', zIndex: '100000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>}
              <h2>Login to Admin Portal</h2>
              <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} disabled={isLocked}/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} disabled={isLocked}/>
                <button type="submit" onClick={handleLogin} disabled={isLocked}>Submit</button>
              </form>
            </motion.div>
          </motion.div>
        )}

<ServiceEditModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        selectedService={selectedService}
        setUpdatedCourse={setUpdatedCourse}
        handleSaveEdit={handleSaveEdit}
      />

        {sentOtp && (

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

            <h2>2FA Authentication</h2>
          
                <form>
                  <label htmlFor="otp">Enter the OTP:</label>
                  <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                  <button type="submit" onClick={handleVerifyOtp}>Verify OTP</button>
                </form>
              
          </motion.div>
        </motion.div>

        )}


      </div>
    </body>

    

  );

  
}

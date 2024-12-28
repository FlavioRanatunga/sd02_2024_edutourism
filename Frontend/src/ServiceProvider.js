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
import { Dropdown } from 'rsuite';
import Notification from './Notification'; 
import { tailChase } from 'ldrs'
import SettingsModal from './ProfileSettings'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useUserId} from './UserIdContext';
import BusinessProfile from './BusinessProfile';
import EditBusinessProfileModal from './EditBusinessProfile';
import defualtimg from './assets/default.png';
import EditServicePosts from './EditServicePosts';
import EditServicePostsModal from './EditServicePostsModal';
import { useFirebaseUpload } from './ImageUpload';

import { jwtDecode } from 'jwt-decode';
import tokenService from './TokenService'; 
import ServiceProviderChatForum from './ServProChatForum';

tailChase.register()

// Default values shown



export default function MainHeader() {

  const [items, setItems] = useState(['Signup', 'Login', 'Settings']);
const [username, setUsername] = useState();

const [authenticated, setAuthenticated] = useState(false);
const [authenticatedID, setAuthenticatedID] = useState(false);
const [serviceType, setServiceType] = useState(null);

const [isServiceLoginModalVisible, setServiceLoginModalVisible] = useState(false);
const [isOtpModalVisible, setOtpModalVisible] = useState(false);

const [imageUrls, setImageUrls] = useState('');

let imageUrlArray = [];
const { uploadImage } = useFirebaseUpload();

  useEffect(() => {
    const token = localStorage.getItem('ServiceProviderAuthToken');

    if (token) {
      try {

        const decodedToken = jwtDecode(token);
        const verifyTokenUserId = tokenService.verifyToken(token);
        if(verifyTokenUserId!=false)
        {
        setGlobablId(decodedToken.id); // Extract the ID from the token
        const userNameFromToken = decodedToken.username;

        const servType = decodedToken.servType;
        const authenticatedID = decodedToken.id;
        setUsername(userNameFromToken);
        setAuthenticatedID(authenticatedID);
        setServiceType(servType);
       // updateLogin();
        setAuthenticated(true);
        setServiceLoginModalVisible(false);
        console.log("Authenticated token ID:"+ verifyTokenUserId);
        console.log("Authenticated token type:"+ servType);

        }else{
          showNotification("Session expired! Please login again to continue") 
          setServiceLoginModalVisible(true);
          console.log(" Session Expired:");

        }

      } catch (error) {
        
        console.error("Invalid token:", error);
      }
    }

    // Update `items` based on authentication status
    if (authenticated) {
      setItems(['Logout', 'Settings']);
    } 

    // Optional: Log after updating state
    console.log("Auth status", authenticated);
    //console.log("User ID:", authenticatedID);

  }, [authenticated]); 

 // const items = ['Signup', 'Login', 'Settings'];
 
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
      
      }else if(item =='Logout')
      {
        localStorage.removeItem('ServiceProviderAuthToken');
    setAuthenticated(false);
    setServiceLoginModalVisible(true);
  
      }else if(item =='Settings')
      {

      }
    };
  
    const [notification, setNotification] = useState(null);

     
    const showNotification = (message) => {
      setNotification(message);
  };

    const handleNotificationClose = () => {
        setNotification(null); // Clear the notification when it is closed
    };
    const offset = -window.innerHeight * 0.25;

    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
 

    const [isVisible, setIsVisible] = useState(false);
  
    
    const [password, setPassword] = useState();
  
    const [incorrectPasswordCount, setIncorrectPasswordCount] = useState(0);
  

  
    const { setId: setGlobablId } = useUserId();
    const { id: userId } = useUserId();
  
  useEffect (()=>{
    if (incorrectPasswordCount>=3){
      setIsForgotPassword(true);
    }
  })
  
  
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [newPw, setNewPw] = useState();
  const [confirmPw, setConfirmPw] = useState();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isNewPw, setIsNewPw] = useState(false);
  
  
    const handleForgotPasswordClick = () => {
      setServiceLoginModalVisible(false);
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
  
    const handleConfirmPwChange = (event) => {
      setConfirmPw(event.target.value);
    }
  
    const handleCancelClick = () => {
      setIsForgotPassword(false);
    };
  
    const handleCancelClickOtp = () => {
      setIsOtpSent(false);
    };
  
    const handleCancelClickNewPw = () => {
      setIsNewPw(false);
    };
  
  
    const handleSendOtp = (e) => {
     
      e.preventDefault();
      
      //const emailInput = document.getElementById('email');
      const emailRequest = {
        email: email
      };
      console.log(email);
      
      fetch("http://localhost:8080/api/serviceProvider/forgot-password", {
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
       
        showNotification(`Your OTP is: ${data}`);
        console.log("OTP sent successfully!", data);
       setEmail(email);
  
        setIsOtpSent(true);
        handleCancelClick();
        
  
      })
      .catch(error => {
       
        showNotification('Error sending OTP!');
        console.error("Error sending OTP:", error);
        
  
      });
    }
  
    const handleVerifyOtp = (e) => {
     
      e.preventDefault();
      
      const emailInput = document.getElementById('email');
      const otpInput = document.getElementById('otp');
      const otpRequest = {
        email:email,
        otp: otpInput.value
      };
    
      fetch("http://localhost:8080/Otp/serviceProvider/Otp-verify", {
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
        setIsNewPw(true);
        handleCancelClickOtp();
       
        
  
      })
      .catch(error => {
       
        showNotification('Error verifying OTP!');
        console.error("Error verifying OTP:", error);
        
  
      });
    }
  
    const handleNewPassword = (e) => {
     
      e.preventDefault();
      
      const emailInput = document.getElementById('email');
      const password = {newPw};
      
      const passwordRequest = {
        email: email,
        password: newPw, // Use the state value correctly
        confirmPassword: confirmPw
      };
    //  window.alert(`Your new entered password: ${passwordRequest.newPw}`);
  
      fetch("http://localhost:8080/npw/serviceProvider/NewPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordRequest)
      })
      .then(response => {
       
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();  // assuming the server returns a plain text OTP
      })
      .then(data => {
       if(data=="Password changed successfully!"){
        showNotification(`Your new password: ${data}`);
        console.log("NewPassword!!!", data);
        setIsNewPw(false);
        handleCancelClickNewPw();
        openServiceLoginModal();
       }
       else if(data=="Passwords don't match"){
        showNotification("Passwords don't match!.Please enter matching passwords");
        setIsNewPw(true);
       }
      })
      .catch(error => {
        showNotification('Error Setting NewPassword!');
        console.error("Error Setting NewPassword!:", error);
            });
    }
  
  
    //const [isSignupModalVisible, setSignupModalVisible] = useState(false);
   

  
    const openServiceLoginModal = () => {
      setLoginModalVisible(false);
    //  setSignupModalVisible(false);
      setServiceLoginModalVisible(true);
    };
    const closeOtpModal = () => {
       setOtpModalVisible(false);
       setServiceLoginModalVisible(true);
    //  setSignupModalVisible(false);
    };


    
    const closeServiceLoginModal = () => setServiceLoginModalVisible(false);
  
    useEffect(() => {
      if(authenticated == false) 
        {
      setServiceLoginModalVisible(true);
        }
  },[])
  
  
  
  const closeLoginModal = () => setServiceLoginModalVisible(false);
    
    const handleServiceLogin = (e) => {
      e.preventDefault();
      console.log(username, password);
      document.getElementById('otploading').style.display = 'block';
      const loginData = {
          username: username,
          password: password
      };
    
      fetch("http://localhost:8080/service-provider/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData)  // Correctly stringify the object as JSON
      })
      .then(response => {
        document.getElementById('otploading').style.display = 'none';
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();  // Parse the response body as JSON
      })
      .then(data => {
          if (data === 'Username or password is incorrect!') {  
            setLoginAttempts((prev) => prev + 1);
            document.getElementById('otploading').style.display = 'none';
            if (loginAttempts >= 2) {
              setIsLocked(true);
              setTimer(30); // Set timer to 30 seconds
            }
            // Use 'data' instead of 'response.text'
            showNotification('Username or password is incorrect!');
              
                // Display the error message from the server
          } else{
            showNotification('Login Successful! Please enter the OTP sent to your email.');
            console.log("Login Successful", data);
            setServiceLoginModalVisible(false);
            setOtpModalVisible(true);  // Open OTP modal on successful login
          }
      })
      .catch(error => {
        showNotification('Login failed!');  // Display a generic error message
          console.error("Error logging in:", error);
          setLoginAttempts((prev) => prev + 1);
          document.getElementById('otploading').style.display = 'none';
          if (loginAttempts >= 2) {
            setIsLocked(true);
            setTimer(30); // Set timer to 30 seconds
          }
      });
    }
  
    const handleOtpVerification = (e) => {
      e.preventDefault();  // Prevent default form submission
      const verifyOTPData = {
        otp: otp,
        username: username
        
    };
      fetch("http://localhost:8080/service-provider/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verifyOTPData),
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
          if (data.message == 'OTP verification failed!') {
            


            showNotification(`OTP verification failed!: ${data}`);
            
            setOtpModalVisible(false);
            setServiceLoginModalVisible(true);
          } else {
           
            
          showNotification("OTP Verified Successfully!")

          localStorage.setItem('ServiceProviderAuthToken', data.token);

          const token = localStorage.getItem('authToken');
         
          const userId = tokenService.verifyToken(token);

          console.log("OTP Verified Successfully!", userId);
          
        const servType = token.servType;
       
        setServiceType(servType);
          setAuthenticated(true);
          setOtpModalVisible(false);
          closeLoginModal();
          setGlobablId(userId);

        
          }
        })
        .catch(error => {
          showNotification('Error verifying OTP!');
          console.error("Error verifying OTP:", error);
          setOtpModalVisible(false);
          setServiceLoginModalVisible(true);
        });
    };
  
    const [refreshCounter, setRefreshCounter] = useState(0);
  
    const [isEditProfileModalVisible, setEditProfileModalVisible] = useState(false);
    
    const openEditProfileModal = () => {
      setEditProfileModalVisible(true)
    }
    const closeEditProfileModal = () => {
      setEditProfileModalVisible(false)
      setRefreshCounter(refreshCounter + 1);
  
    }
    

    const [loginAttempts, setLoginAttempts] = useState(0);
const [isLocked, setIsLocked] = useState(false);
const [timer, setTimer] = useState(0);
const [refreshPostsCounter ,setRefreshPostsCounter] = useState(0);



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

const clearForm = () => {
  document.getElementById("title").value='';
  document.getElementById("unitPrice").value='';
  document.getElementById("location").value='';
  document.getElementById("details").value='';
  document.getElementById("paymentRefund").checked='';
  document.getElementById("contactNumber").value='';
  document.getElementById("serviceProviderEmail").value='';
  document.getElementById("servImage").value='';

  setRefreshPostsCounter(refreshPostsCounter + 1);

  

};
  
const addImageUrl = (newUrl) => {
 // setImageUrls((prevImageUrls) => [...prevImageUrls, newUrl]);
  
 setImageUrls((prevImageUrls) => [...prevImageUrls, newUrl]);
  
 // Optionally push the URL to the external array if needed
// imageUrlArray.push(newUrl);
 
// console.log("Updated image URLs array:", [...imageUrls, newUrl]);
 // imageUrlArray.push(newUrl);
 

};

const handleAddService = (e, userId) => {
  
  e.preventDefault();
//  console.log("inside submit form for add new service "+userId);
  // Get form data
/*   const formData = {
      title: document.getElementById("name").value,
      price: document.getElementById("price").value,
      standard: document.getElementById("standard").value,
      location: document.getElementById("location").value,
      image:document.getElementById("servImage").value,
      educationalFocus: document.getElementById("educationalFocus").value,
      learningOutcome: document.getElementById("learningOutcome").value,
      eventDuration: document.getElementById("Duration").value,
      serviceProvider: String(userId)
  }; */
  let allFormData = new FormData();

  allFormData.append("image", imageUrls); // Convert image array to JSON string
  allFormData.append("name", document.getElementById("title").value);
  allFormData.append("price", document.getElementById("unitPrice").value);
  allFormData.append("location", document.getElementById("location").value);
  allFormData.append("type", serviceType);
  allFormData.append("details", document.getElementById("details").value);
  allFormData.append("paymentRefund", document.getElementById("paymentRefund").value);
  allFormData.append("contactNumber", document.getElementById("contactNumber").value);
  allFormData.append("email", document.getElementById("serviceProviderEmail").value);
  allFormData.append("servProvider", userId);

  // Conditional fields based on service type
  switch (serviceType) {
    case 'Course':
      allFormData.append("educationalFocus", document.getElementById("educationalFocus").value);
      allFormData.append("duration", document.getElementById("duration").value);
      allFormData.append("learningOutcome", document.getElementById("learningOutcome").value);
      allFormData.append("courseStartDate", document.getElementById("courseStartDate").value);
      allFormData.append("courseEndDate", document.getElementById("courseEndDate").value);
      allFormData.append("prerequisites", document.getElementById("prerequisites").value);
      allFormData.append("courseLevel", document.getElementById("courseLevel").value);
      allFormData.append("courseCategory", document.getElementById("courseCategory").value);
      allFormData.append("courseAttendance", document.getElementById("courseAttendance").value);
      allFormData.append("participants", document.getElementById("participants").value);
      allFormData.append("instructorName", document.getElementById("instructorName").value);
      allFormData.append("isCertified", document.getElementById("isCertified").checked);
      break;

    case 'TravelLocation':
      allFormData.append("destination", document.getElementById("destination").value);
      allFormData.append("travelDate", document.getElementById("travelDate").value);
      allFormData.append("travelers", document.getElementById("travelers").value);
      allFormData.append("guideName", document.getElementById("guideName").value);
      allFormData.append("travelType", document.getElementById("travelType").value);
      break;

    case 'Hotel':
      allFormData.append("luxRoomPrice", document.getElementById("luxRoomPrice").value);
      allFormData.append("normalRoomPrice", document.getElementById("normalRoomPrice").value);
      allFormData.append("availableLuxRooms", document.getElementById("availableLuxRooms").value);
      allFormData.append("availableNormalRooms", document.getElementById("availableNormalRooms").value);
      allFormData.append("hasParking", document.getElementById("hasParking").checked);
      allFormData.append("hasBreakfastIncluded", document.getElementById("hasBreakfastIncluded").checked);
      allFormData.append("checkInTime", document.getElementById("checkInTime").value);
      allFormData.append("checkOutTime", document.getElementById("checkOutTime").value);
      allFormData.append("hotelWeblink", document.getElementById("hotelWeblink").value);
      break;

    case 'Transport':
      allFormData.append("transportType", document.getElementById("transportType").value);
      allFormData.append("vehicleType", document.getElementById("vehicleType").value);
      allFormData.append("unitPrice", document.getElementById("unitPrice").value);
      allFormData.append("maxPassengers", document.getElementById("maxPassengers").value);
    
      break;

    case 'Package':
      allFormData.append("packageType", document.getElementById("packageType").value);
      allFormData.append("startDate", document.getElementById("startDate").value);
      allFormData.append("endDate", document.getElementById("endDate").value);
      allFormData.append("packageLocations", document.getElementById("packageLocations").value);
      allFormData.append("participantsPackage", document.getElementById("participantsPackage").value);
      break;

    case 'Event':
      allFormData.append("eventName", document.getElementById("title").value);
      allFormData.append("eventDate", document.getElementById("eventDate").value);
      allFormData.append("eventStartTime", document.getElementById("startTime").value);
      allFormData.append("maxAttendees", document.getElementById("attendees").value);
      allFormData.append("venue", document.getElementById("venue").value);
      allFormData.append("eventHost", document.getElementById("eventHost").value);
      break;

    default:
      break;
  }

  // Send a POST request to the backend
  fetch("http://localhost:8080/service-provider/addService", {  
    method: "POST",
    body: allFormData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();  
  })
  .then(data => {
      // Handle successful form submission
      console.log("Form submitted successfully:", data);
      showNotification("Form submitted successfully!");
      document.getElementById("addServiceForm").reset()
      // Clear the form or perform other success actions
      setRefreshPostsCounter(refreshPostsCounter+1);
  })
  .catch(error => {
      // Handle errors
      console.log(allFormData);

      console.error("Error submitting form:", error);
      showNotification("Form submission failed!");
  });
};

const handleFireBaseUpload = (e) => {
  document.getElementById('ImageLoading').style.display = 'block';
  const file = e.target.files[0];
  if (file) {
      uploadImage(file).then(url => {
          const uploadedUrl = url;
          document.getElementById('ServiceImageView').src = uploadedUrl; 
          document.getElementById('servImage').value= uploadedUrl;
          addImageUrl(uploadedUrl);
          console.log("Uploaded URL:", url);
          document.getElementById('ImageLoading').style.display = 'none';
      }).catch(err => {
          console.error("Upload failed:", err);
          document.getElementById('ImageLoading').style.display = 'none';
      });
  }
};


const handleImageUpload = async (e) => {
  document.getElementById('ImageLoading').style.display = 'block';
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = (event) => {
    document.getElementById('ServiceImageView').src = event.target.result; // Set the image src to the file data URL
  };
  reader.readAsDataURL(file);



  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:8080/upload/img', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    document.getElementById('servImage').value= data;
    
    document.getElementById('ImageLoading').style.display = 'none';
    
    console.log(data);
  } catch (error) {
    console.error('Error uploading file to backend:', error);
    document.getElementById('ImageLoading').style.display = 'none';
  }
};

const [isEditPostsModalVisible, setEditPostsModalVisible] = useState(false);
const[selectedCourseId, setSelectedCourseId] = useState();

const renderFieldsForProvider = () => {
  console.log('servicetype'+ serviceType);
  switch (serviceType) {
    case 'Course':
      return (
        <>
          <label htmlFor="educationalFocus">Educational Focus:</label>
          <input type="text" id="educationalFocus" name="educationalFocus" required />
          <label htmlFor="duration">Duration:</label>
          <input type="text" id="duration" name="duration" required />
          <label htmlFor="learningOutcome">Learning Outcome:</label>
          <input type="text" id="learningOutcome" name="learningOutcome" required />
          <label htmlFor="courseStartDate">Start Date:</label>
          <input type="date" id="courseStartDate" name="courseStartDate" required />
          <label htmlFor="courseEndDate">End Date:</label>
          <input type="date" id="courseEndDate" name="courseEndDate" required />
          <label htmlFor="prerequisites">Prerequisites:</label>
          <input type="text" id="prerequisites" name="prerequisites" />
          <label htmlFor="courseLevel">Course Level:</label>
          <select id="courseLevel" name="courseLevel" required>
        <option value="">Select a level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
          <label htmlFor="courseCategory">Course Category:</label>
          <input type="text" id="courseCategory" name="courseCategory" />
          <label htmlFor="courseAttendance">Attendance Type:</label>
          <select id="courseAttendance" name="courseAttendance" required>
        <option value="">Select attendance type</option>
        <option value="Fully Remote">Fully Remote</option>
        <option value="Physical">Physical</option>
        <option value="Hybrid">Hybrid</option>
      </select>
          <label htmlFor="participants">Max Participants:</label>
          <input type="number" id="participants" name="participants" required />
          <label htmlFor="instructorName">Instructor Name:</label>
          <input type="text" id="instructorName" name="instructorName" />
          <label htmlFor="isCertified">Certification Offered:</label>
          <input type="checkbox" id="isCertified" name="isCertified" />
        </>
      );
    case 'TravelLocation':
      return (
        <>
          <label htmlFor="destination">Destination:</label>
          <input type="text" id="destination" name="destination" required />
          <label htmlFor="travelDate">Travel Date:</label>
          <input type="date" id="travelDate" name="travelDate" required />
          <label htmlFor="travelers">Number of Travelers:</label>
          <input type="number" id="travelers" name="travelers" required />
          <label htmlFor="guideName">Guide Name:</label>
          <input type="text" id="guideName" name="guideName" />
          <label htmlFor="travelType">Travel Type:</label>
          <input type="text" id="travelType" name="travelType" />
        </>
      );
    case 'Hotel':
      return (
        <>
          <label htmlFor="luxRoomPrice">Luxury Room Price($):</label>
          <input type="number" id="luxRoomPrice" name="luxRoomPrice" required />
          <label htmlFor="normalRoomPrice">Normal Room Price($):</label>
          <input type="number" id="normalRoomPrice" name="normalRoomPrice" required />
          <label htmlFor="availableLuxRooms">No. of Luxury Rooms:</label>
          <input type="number" id="availableLuxRooms" name="availableLuxRooms" required />
          <label htmlFor="availableNormalRooms">No. of Normal Rooms:</label>
          <input type="number" id="availableNormalRooms" name="availableNormalRooms" required />
      
          <label htmlFor="checkInTime" style={{width:'16%'}}>Check-in Time:</label>
          <input type="time" id="checkInTime" name="checkInTime" required />
          <label htmlFor="checkOutTime">Check-out Time:</label>
          <input type="time" id="checkOutTime" name="checkOutTime" required />
          <label htmlFor="weblink">Link to website:</label>
          <input type="text" id="hotelWeblink" name="weblink" />
          <label style={{width:'15%'}} htmlFor="hasBreakfastIncluded">Breakfast Included:</label>
          <input style={{width:'2%'}} type="checkbox" id="hasBreakfastIncluded" name="hasBreakfastIncluded" />
          <label style={{width:'10%'}} htmlFor="hasParking">Has Parking:</label>
          <input style={{width:'2%'}} type="checkbox" id="hasParking" name="hasParking" />
          
       

    
        </>
      );
    case 'Transport':
      return (
        <>
          <label htmlFor="transportType">Transport Type:</label>
          <select id="transportType" name="transportType" required>
        <option value="">Select transport type</option>
        <option value="With driver">With driver</option>
        <option value="Without rent">Without rent</option>
        <option value="Both options">Both options</option>
      </select>
          <label htmlFor="vehicleType">Vehicle Type:</label>
        
          <select id="vehicleType" name="vehicleType" required>
        <option value="">Select vehicle type</option>
        <option value="Bike">Bike</option>
        <option value="Car">Car</option>
        <option value="SUV">SUV</option>
        <option value="Van">Van</option>
      </select>
          <label htmlFor="unitPrice">Price per Km:</label>
          <input type="number" id="unitPrice" name="unitPrice" required />
          <label htmlFor="maxPassengers">Max Passengers:</label>
          <input type="number" id="maxPassengers" name="maxPassengers" required />
       
        </>
      );
    case 'Package':
      return (
        <>
          <label htmlFor="packageType">Package Type:</label>
          <input type="text" id="packageType" name="packageType" required />
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" required />
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" required />
          <label htmlFor="packageLocations">Package Locations:</label>
          <input type="text" id="packageLocations" name="packageLocations" required />
          <label htmlFor="participantsPackage">No. of participants:</label>
          <input type="number" id="participantsPackage" name="participantsPackage" required />
        </>
      );
    case 'Event':
      return (
        <>
          <label htmlFor="eventDate">Event Date:</label>
          <input type="date" id="eventDate" name="eventDate" required />
          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" name="startTime" required />
          <label htmlFor="attendees">Max Attendees:</label>
          <input type="number" id="attendees" name="attendees" required />
          <label htmlFor="venue">Venue:</label>
          <input type="text" id="venue" name="venue" required />
          <label htmlFor="eventHost">Event Host:</label>
          <input type="text" id="eventHost" name="eventHost" required />
        </>
      );
    default:
      return null;
  }
};



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
                
                <div id="loading" style={{display: 'none', zIndex: '10000000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>
                <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu" style={{ marginTop:'5px'}} >
               
                  <ul className="nav navbar-nav navbar-right menu" data-in="fadeInDown" data-out="fadeOutUp">
                  
                  <li id='menu-home' > <Link className="scroll" to="home" smooth={true} duration={1500} offset={offset}>
                      My Posts 
                    </Link><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-works'> <Link to="works" smooth={true} duration={1500} offset={offset}>
                      Create new post 
                    </Link><span className='menu-divider'>|</span></li>

                    <li className="scroll" id='menu-explore'>        <Link to="explore" smooth={true} duration={1500} offset={offset}>
                      Blog 
                    </Link><span className='menu-divider'>|</span></li>


                    <li className="scroll" id='menu-contact'>        <Link to="contact" smooth={true} duration={1500} offset={offset}>
                      Contact
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
            
           
          
            {isServiceLoginModalVisible && (
              
                             
         <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          id="loginModal-service-login" className='loginForm'
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
            className='loginFormContent'
            style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}
          >
                       <div id="otploading" style={{display: 'none', zIndex: '10000000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>
    {isLocked && <p style={{color: '#000000'}}>Please wait {timer} seconds before retrying.</p>    }
  {isLocked &&      <div id="loginLoading" style={{display: 'block', zIndex: '100000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>}
            <h2>Service Provider Login</h2>
            <form>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} disabled={isLocked}/>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} disabled={isLocked}/>
              <button type="submit" onClick={handleServiceLogin} disabled={isLocked}>Submit</button>
              <a href="#" onClick={handleForgotPasswordClick} >Forgot Password? <button type="button" >Reset Password</button></a>
            </form>
          </motion.div>
        </motion.div>
      )}

        {/* OTP Modal */}
        {isOtpModalVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          id="otpModal" className='loginForm'
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
            className='loginFormContent'
            style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}
          >
            <span className="close-button" onClick={() => closeOtpModal()}>&times;</span>
            <h2>Verify OTP</h2>
            <form onSubmit={handleOtpVerification}>
              <label htmlFor="otp">OTP:</label>
              <input type="text" id="otp" name="otp" required onChange={(e) => setOtp(e.target.value)} />
              <button type="submit">Verify OTP</button>
              <a href="#" onClick={closeOtpModal}><button type="button" ><ArrowBackIosIcon style={{paddingTop:'8px'}}/>Back to login</button></a>

            </form>
          </motion.div>
        </motion.div>
      )}
       {isForgotPassword && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          id="otpModal" className='loginForm'
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
            className='loginFormContent'
            style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}
          >
            <span className="close-button" onClick={handleCancelClick}>&times;</span>
            <h2>Enter Email Address</h2>
            <form onSubmit={handleSendOtp}>
              <label htmlFor="otp">Email:</label>
              <input type="text" id="otp" name="otp" required onChange={handleEmailChange} />
              <button type="submit">Send Otp</button>
            </form>

      
          </motion.div>
        </motion.div>
      )}
      {isOtpSent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          id="otpModal" className='loginForm'
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
            className='loginFormContent'
            style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}
          >
            <span className="close-button" onClick={handleCancelClickOtp}>&times;</span>
            <h2>Enter OTP sent to email address</h2>
            <form onSubmit={handleVerifyOtp}>
              <label htmlFor="otp">OTP:</label>
              <input type="text" id="otp" name="otp" required onChange={handleOtpChange} />
              <button type="submit">Send Otp</button>
            </form>
      
          </motion.div>
        </motion.div>
      )}
         {isNewPw && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          id="otpModal" className='loginForm'
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
            className='loginFormContent'
            style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}
          >
            <span className="close-button" onClick={handleCancelClickNewPw}>&times;</span>
            <h2>Enter new password and confirm.</h2>
            <form onSubmit={handleNewPassword}>
              <label htmlFor="otp">Enter Password:</label>
              <input type="text" id="otp" name="otp" required onChange={handleNewPwChange} />
              <label htmlFor="otp">Confirm Password:</label>
              <input type="text" id="otp" name="otp" required onChange={handleConfirmPwChange} />

              <button type="submit">Change Password</button>
            </form>
          </motion.div>
        </motion.div>
      )}

{isEditProfileModalVisible &&(
  <EditBusinessProfileModal isEditProfileModalVisible={isEditProfileModalVisible}
  closeEditProfileModal={closeEditProfileModal}
  />
)
}

{isEditPostsModalVisible &&(
  <EditServicePostsModal setEditPostsModalVisible={setEditPostsModalVisible} 
  isEditPostsModalVisible={isEditPostsModalVisible} selectedCourseId={selectedCourseId } 
  setRefreshPostsCounter={setRefreshPostsCounter} refreshPostsCounter={refreshPostsCounter}
  />
  )}



<section id="home" className="welcome-hero">

  <div className="container">
    <div className="welcome-hero-txt">

      <h2>Best place to learn and explore <br /> Sri Lanka </h2>
      {/* <p>
        Find Best Places to Travel, Learn, Stay and many more in just One click
      </p> */}
      <BusinessProfile refreshCounter={refreshCounter}/>
              <button className="editprofilebutton" onClick={openEditProfileModal}>
                Edit Profile
                </button> 
    </div>
    
  </div>
</section>
</div>

{/* <!--list-topics start -->  */}

{/* <!--list-topics end--> */}

<div >

<h2 style={{ margin:'15px auto' }}>Create New Post</h2>
            <div id='create_form' style={{ width: '80%', background: '#ffffff', color: 'black' }}>

             
              <form id="addServiceForm" onSubmit={(e) => handleAddService(e,authenticatedID)}>
              
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" required />
  
              <label htmlFor="unitPrice">Unit Price:</label>
               <input type="text" id="unitPrice" name="unitPrice" required />
  
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" name="location" required />

              <label htmlFor="details">Details:</label>
              <textarea id="details" name="details" required></textarea>

              <label htmlFor="paymentRefund">Refundable: </label>
              <input type="checkbox" id="paymentRefund" name="paymentRefund" />
              <label htmlFor="contactNumber">Contact Number:</label>
              <input type="tel" id="contactNumber" name="contactNumber" required />

               <label htmlFor="serviceProviderEmail">Email:</label>
              <input type="email" id="serviceProviderEmail" name="email" required />                
              
              <label htmlFor="ServiceImage">Image:</label>
                <input type="hidden" id="servImage" name="servImage" />
                <input type="file" id="ServiceImage" name="ServiceImage" accept="image/*" onChange={handleFireBaseUpload} />

                {renderFieldsForProvider()}
                <div>
                <img id = "ServiceImageView" src={defualtimg} alt="Profile" style={{ width: '20%', marginBottom: '15px', marginTop: '15px' }} />
              </div>
                <button type="submit" >Submit</button>
                <div id="ImageLoading" style={{display: 'none', zIndex: '100000'}} >
    <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  </div>

              </form>
            </div>
          </div>
          <EditServicePosts refreshPostsCounter={refreshPostsCounter} setSelectedCourseId={setSelectedCourseId} setEditPostsModalVisible={setEditPostsModalVisible}/>
          <ServiceProviderChatForum serviceType={serviceType} username={username} ></ServiceProviderChatForum>

</body>
);
}
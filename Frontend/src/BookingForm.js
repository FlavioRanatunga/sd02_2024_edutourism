import React, { useEffect, useState } from 'react';
import './BookingForms.css'; // Import the CSS file where the styles are defined
import Notification from './Notification'; 


const BookingForm = ({ type, onClose, authenticatedID, selectedCourseBooking}) => {
  console.log("selected id and user in bookingform.js"+ authenticatedID+selectedCourseBooking.id + "price"+ selectedCourseBooking.price);

  const [isActive, setIsActive] = useState(false);

  const [authID, setAuthID] = useState(null);

  const [selectedID, setSelectedID] = useState(null);

  const [selectedCourse, setselectedCourse] = useState(null);

  const [totalCost, setTotalCost] = useState(0); 

  const [hoteltotalCost, setHotelTotalCost] = useState(0); 
  const [participants, setParticipants] = useState(1);
  const [notification, setNotification] = useState(null);

  const [luxuryRooms, setLuxuryRooms] = useState(0);
  const [luxuryTripleRooms, setLuxuryTripleRooms] = useState(0);
  const [normalRooms, setNormalRooms] = useState(0);
  const [familyRooms, setFamilyRooms] = useState(0);

  const showNotification = (message) => {
    setNotification(message);
};

  const handleNotificationClose = () => {
      setNotification(null); // Clear the notification when it is closed
  };
  const handleRoomsChange = (e, roomType) => {
    const value = parseInt(e.target.value, 10) || 0; // Ensure a valid number is used
    let newCost = 0;
  
    switch (roomType) {
      case 'luxury':
        setLuxuryRooms(value);
        newCost = value * (selectedCourse.luxRoomPrice || 0);
        break;
      case 'luxuryTriple':
        setLuxuryTripleRooms(value);
        newCost = value * (selectedCourse.luxTripleRoomPrice || 0);
        break;
      case 'normal':
        setNormalRooms(value);
        newCost = value * (selectedCourse.normalRoomPrice || 0);
        break;
      case 'family':
        setFamilyRooms(value);
        newCost = value * (selectedCourse.familyRoomPrice || 0);
        break;
      default:
        break;
    }
  
    // Recalculate the total hotel cost based on updated state values
    setHotelTotalCost(
      (luxuryRooms * (selectedCourse.luxRoomPrice || 0)) +
      (luxuryTripleRooms * (selectedCourse.luxTripleRoomPrice || 0)) +
      (normalRooms * (selectedCourse.normalRoomPrice || 0)) +
      (familyRooms * (selectedCourse.familyRoomPrice || 0)) +
      newCost
    );
  };
  
    // Function to handle changes in the number of participants
    const handleParticipantsChange = (e) => {
      const value = parseInt(e.target.value, 10);
      
      // Ensure participants are at least 1
      const updatedParticipants = value > 0 ? value : 1;
      setParticipants(updatedParticipants);
      console.log("Participants"+ participants);

 
      const formattedprice = parseFloat(selectedCourse.price.replace(/,/g, ''));
      // Calculate total cost using the updated participants and format the cost
      const totalCost = formattedprice * updatedParticipants;
      const formattedCost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalCost);
      console.log("Total"+ totalCost);
      setTotalCost(formattedCost);
    };
  // Trigger the transition animation after the component is mounted
  useEffect(() => {

    setIsActive(true); // Activate the animation once the component is mounted
    setAuthID(authenticatedID);
    setSelectedID(selectedCourseBooking.id);
    setselectedCourse(selectedCourseBooking);
console.log("selected id and user in bookingform.js"+ authID+selectedCourseBooking.id);
    // Clean up function to handle animation when closing the form
    return () => setIsActive(false);
  }, []);

  useEffect(() => {
    console.log("Updated authID and selectedID:", authID, selectedID);
  }, [authID, selectedID]);

  const renderFormFields = () => {
    console.log();
    switch (type) {
      case 'Course':
        return (
          <div>
            <h2>Book a Course</h2>
            <p style={{color:'#000000', padding:'1%'}}>Total Cost: {totalCost}</p>
            <input type="text" placeholder="ID/Passsport no." required />
            <input type="number"             
             placeholder="Number of Participants"
              value={participants}
              onChange={handleParticipantsChange} required />
    
            <textarea placeholder="Additional Notes"></textarea>
          </div>
        );
      case 'Travel Location':
        return (
          <div>
            <h2>Book a Travel Location</h2>
            <p style={{color:'#000000', padding:'1%'}}>Total Cost: {totalCost}</p>
            <input type="text" placeholder="ID/Passsport no." required />
            <input type="number" placeholder="Number of Travelers" required />
            <textarea placeholder="Additional Notes"></textarea>
          </div>
        );
      case 'Hotel':
        return (
          <div>
            <h2>Book a Hotel</h2>
            <p style={{color:'#000000', padding:'1%'}}>Total Cost: {hoteltotalCost}</p>
            <input type="text" placeholder="ID/Passsport no." required />
            <input type="date" placeholder="Check-in Date" required />
            <input type="date" placeholder="Check-out Date" required />
            <input type="number" 
             value={luxuryRooms}
            onChange={(e) => handleRoomsChange(e, 'luxury')} 
            placeholder="Number of Luxury Rooms(2 adults)" />

            <input type="number" 
              value={luxuryTripleRooms}
              onChange={(e) => handleRoomsChange(e, 'luxuryTriple')} 
            placeholder="Number of Luxury triple Rooms (3 adults)" />

            <input type="number" 
                 value={normalRooms}
                 onChange={(e) => handleRoomsChange(e, 'normal')} 
            placeholder="Number of Normal Rooms(2 adults)" />
            <input type="number" 
             value={familyRooms}
             onChange={(e) => handleRoomsChange(e, 'family')} 
            placeholder="Number of family Rooms(2 adults 2 children)" />

            <input type="number" placeholder="Number of Adults (13+)" required />
            <input type="number" placeholder="Number of Children " required />

            <textarea placeholder="Additional Notes"></textarea>
          </div>
        );
      case 'Package':
        return (
          <div>
            <h2>Book a Package</h2>
            <p style={{color:'#000000', padding:'1%'}}>Total Cost: {totalCost}</p>
            <input type="text" placeholder="ID/Passsport no." required />
            <input type="date" placeholder="Start Date" required />
            <input type="number" placeholder="Number of Participants" required />
      
            <textarea placeholder="Additional Notes"></textarea>
          </div>
        );
      case 'Transport':
        return (
          <div>
            <h2>Book Transport</h2>
            <p style={{color:'#000000', padding:'1%'}}>Total Cost: {totalCost}</p>
            <input type="text" placeholder="ID/Passsport no." required />
            <input type="date" placeholder="Date" required />
            <input type="time" placeholder="Pickup Time" required />
            <input type="text" placeholder="Pickup Location" required />
            <input type="text" placeholder="Drop-off Location" required />
            <input type="number" placeholder="Number of Passengers" required />
            <textarea placeholder="Additional Notes"></textarea>
          </div>
        );
      case 'Event':
        return (
          <div>
            <h2>Book an Event</h2>
            <p style={{color:'#000000', padding:'1%'}}>Total Cost: {totalCost}</p>
            <input type="text" placeholder="ID/Passsport no." required />
            <input type="number" placeholder="Number of Attendees" required />
            <textarea placeholder="Additional Notes"></textarea>
          </div>
        );
      default:
        return <div>Please select a valid booking type.</div>;
    }
  };

  const createPreBooking = async () => {
    try {
        const travelerID = authID;
        const serviceID = selectedID;

        // Collect form data based on booking type
        let bookingDetails = {
            travelerID,
            serviceID,
            type,
            userIdentification: document.querySelector('input[placeholder="ID/Passsport no."]').value,
            additionalNotes: document.querySelector('textarea[placeholder="Additional Notes"]').value,
        };

        if (type === 'Course' || type === 'Package') {
            bookingDetails.participants = document.querySelector('input[placeholder="Number of Participants"]').value;
            if (type === 'Package') {
                bookingDetails.packageDate = document.querySelector('input[placeholder="Start Date"]').value;
            }
        } else if (type === 'Hotel') {
            bookingDetails.checkInDate = document.querySelector('input[placeholder="Check-in Date"]').value;
            bookingDetails.checkOutDate = document.querySelector('input[placeholder="Check-out Date"]').value;
            bookingDetails.numLuxRooms = document.querySelector('input[placeholder="Number of Luxury Rooms(2 adults)"]').value;
            bookingDetails.numLuxTripleRooms = document.querySelector('input[placeholder="Number of Luxury triple Rooms (3 adults)"]').value;
            bookingDetails.numNormalRooms = document.querySelector('input[placeholder="Number of Normal Rooms(2 adults)"]').value;
            bookingDetails.numFamilyRooms = document.querySelector('input[placeholder="Number of family Rooms(2 adults 2 children)"]').value;
            bookingDetails.numAdults = document.querySelector('input[placeholder="Number of Adults (13+)"]').value;
            bookingDetails.numChildren = document.querySelector('input[placeholder="Number of Children "]').value;
        } else if (type === 'Transport') {
            bookingDetails.transportDate = document.querySelector('input[placeholder="Date"]').value;
            bookingDetails.transportPickupTime = document.querySelector('input[placeholder="Pickup Time"]').value;
            bookingDetails.transportPickupLocation = document.querySelector('input[placeholder="Pickup Location"]').value;
            bookingDetails.transportDropLocation = document.querySelector('input[placeholder="Drop-off Location"]').value;
        }

        const response = await fetch('http://localhost:8080/booking/prebooking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify(bookingDetails),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        console.log(result.message);
        alert(`${type} pre booked successfully!`);

    } catch (error) {
        console.error('Error booking:', error);
        alert('Error occurred while booking.');
    }
};


  const confirmBooking = async () => {
    try {
      createPreBooking();

      const travelerID = authID;
      const serviceID = selectedID;
      const bookCriteria = {
        travelerID,
        serviceID
      };
      const response = await fetch('http://localhost:8080/booking/bookService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookCriteria),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      console.log(result.message); // "Course booked successfully!"
      onClose();
      alert("Course booked successfully!") 
     

    } catch (error) {
      console.error('Error booking course:', error);
    }

    const itinerary = {
      stop: selectedCourse.title,
      location: selectedCourse.location, // Use the course location
      description: "Enjoy this amazing travel experience", // Common description
      date: new Date().toISOString().split('T')[0], // Set today's date (YYYY-MM-DD)
    };
  
    try {
      console.log("Booking course for user ID:", authID);
      console.log("Booking course for course title:", selectedCourse.title);
  
      console.log("Booking course for course location:", selectedCourse.location);
  
  
      // Send the itinerary object to the backend
      const response = await fetch(`http://localhost:8080/api/travellers/${authID}/itinerary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itinerary), // Send the full itinerary object
      });
  
      if (response.ok) {
        console.log("Course booked successfully");
        alert(`Course "${selectedCourseBooking.title}" booked successfully!`);
      } else {
        const errorData = await response.json();
        console.error("Failed to book course:", errorData);
        alert(`Failed to book course: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error booking course:', error);
      alert('An error occurred while booking the course.');
    }

  };

  return (
    <div className={`booking-form-wrapper ${isActive ? 'active' : ''}`}>
      <div className="booking-form">
        <button className="book-close-button" onClick={onClose}>×</button>

       
        {renderFormFields()}
      
        <button type="submit" onClick={confirmBooking}>Submit</button>
      
      </div>
   
    </div>
  );
};

export default BookingForm;

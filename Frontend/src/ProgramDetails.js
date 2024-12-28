import React, { Component } from 'react';
import CourseLocationMap from './CourseLocationMap'; // Import the new map component

class ProgramDetails extends Component {
  render() {
    console.log('Program: In');
    const { program } = this.props;
    console.log('Program:', program);

    if (!program) {
        console.log('no program');
      return null;
    }

        

    switch (program.type) {
      case 'Course':
        console.log('Program:', program);
        return (
          <div className="course-details">
            <p><strong>Title:</strong> {program.title}</p>
            <p><strong>Duration:</strong> {program.duration}</p>
            <p><strong>Participants:</strong> {program.participants}</p>
            <p><strong>Prerequisites:</strong> {program.prerequisites}</p>
            <p><strong>Course Start Date:</strong> {program.courseStartDate}</p>
            <p><strong>Course End Date:</strong> {program.courseEndDate}</p>
            <p><strong>Course Level:</strong> {program.courseLevel}</p>
            <p><strong>Category:</strong> {program.courseCategory}</p>
            <p><strong>Attendance:</strong> {program.courseAttendance}</p>
            <p><strong>Instructor:</strong> {program.instructorName}</p>
            <p><strong>Certification:</strong> {program.isCertified ? 'Yes' : 'No'}</p>
            <p><strong>Price:</strong> {program.price}</p>
            <p><strong>Location:</strong> {program.location}</p>
            <p><strong>Ratings:</strong> {program.ratings} / 5</p>
            <p><strong>Reviews:</strong> {program.reviews}</p>
          </div>
        );
    
      case 'Hotel':
        console.log('Program:', program);
        return (
          <div className="hotel-details">
            <p><strong>Title:</strong> {program.title}</p>
            <p><strong>Check-in Date:</strong> {program.checkInDate}</p>
            <p><strong>Check-out Date:</strong> {program.checkOutDate}</p>
            <p><strong>Lux Room Price:</strong> {program.luxRoomPrice}</p>
            <p><strong>Normal Room Price:</strong> {program.normalRoomPrice}</p>
            <p><strong>Available Lux Rooms:</strong> {program.availableLuxRooms}</p>
            <p><strong>Available Normal Rooms:</strong> {program.availableNormalRooms}</p>
            <p><strong>Has Parking:</strong> {program.hasParking ? 'Yes' : 'No'}</p>
            <p><strong>Breakfast Included:</strong> {program.hasBreakfastIncluded ? 'Yes' : 'No'}</p>
            <p><strong>All Inclusive:</strong> {program.isAllInclusive ? 'Yes' : 'No'}</p>
            <p><strong>Check-in Time:</strong> {program.checkInTime}</p>
            <p><strong>Check-out Time:</strong> {program.checkOutTime}</p>
            <p><strong>Location:</strong> {program.location}</p>
            <p><strong>Ratings:</strong> {program.ratings} / 5</p>
            <p><strong>Reviews:</strong> {program.reviews}</p>
          </div>
        );
    
      case 'TravelLocation':
        console.log('Program:', program);
        return (
          <div className="travel-location-details">
            <p><strong>Title:</strong> {program.title}</p>
            <p><strong>Travel Date:</strong> {program.travelDate}</p>
            <p><strong>Travelers:</strong> {program.travelers}</p>
            <p><strong>Guide Name:</strong> {program.guideName}</p>
            <p><strong>Accommodation:</strong> {program.accommodation}</p>
            <p><strong>Travel Type:</strong> {program.travelType}</p>
            <p><strong>Location:</strong> {program.location}</p>
            <p><strong>Ratings:</strong> {program.ratings} / 5</p>
            <p><strong>Reviews:</strong> {program.reviews}</p>
          </div>
        );
    
      case 'Package':
        return (
          <div className="package-details">
            <p><strong>Title:</strong> {program.title}</p>
            <p><strong>Start Date:</strong> {program.startDate}</p>
            <p><strong>End Date:</strong> {program.endDate}</p>
            <p><strong>Package Type:</strong> {program.packageType}</p>
            <p><strong>Locations Covered:</strong> {program.packageLocations}</p>
            <p><strong>Participants:</strong> {program.participants}</p>
            <p><strong>Price:</strong> {program.price}</p>
            <p><strong>Location:</strong> {program.location}</p>
            <p><strong>Ratings:</strong> {program.ratings} / 5</p>
            <p><strong>Reviews:</strong> {program.reviews}</p>
          </div>
        );
    
      case 'Transport':
        return (
          <div className="transport-details">
            <p><strong>Title:</strong> {program.title}</p>
            <p><strong>Transport Type:</strong> {program.transportType}</p>
            <p><strong>Vehicle Type:</strong> {program.vehicleType}</p>
            <p><strong>Unit Price:</strong> {program.unitPrice}</p>
            <p><strong>Date:</strong> {program.date}</p>
            <p><strong>Pickup Location:</strong> {program.pickupLocation}</p>
            <p><strong>Drop-off Location:</strong> {program.dropoffLocation}</p>
            <p><strong>Number of Passengers:</strong> {program.passengers}</p>
            <p><strong>Self Drive:</strong> {program.isSelfDrive ? 'Yes' : 'No'}</p>
            <p><strong>Location:</strong> {program.location}</p>
            <p><strong>Ratings:</strong> {program.ratings} / 5</p>
            <p><strong>Reviews:</strong> {program.reviews}</p>
          </div>
        );
    
      case 'Event':
        return (
          <div className="event-details">
            <p><strong>Title:</strong> {program.title}</p>
            <p><strong>Event Date:</strong> {program.eventDate}</p>
            <p><strong>Start Time:</strong> {program.startTime}</p>
            <p><strong>Attendees:</strong> {program.attendees}</p>
            <p><strong>Venue:</strong> {program.venue}</p>
            <p><strong>Event Host:</strong> {program.eventHost}</p>
            <p><strong>Price:</strong> {program.price}</p>
            <p><strong>Location:</strong> {program.location}</p>
            <p><strong>Ratings:</strong> {program.ratings} / 5</p>
            <p><strong>Reviews:</strong> {program.reviews}</p>
          </div>
        );
    
      default:
        return (
          <div>
            <p><strong>Description: Default</strong></p>
          </div>
        );
    }
    
    }
  }


export default ProgramDetails;

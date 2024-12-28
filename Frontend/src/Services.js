// Services.js
import React, { useState, useEffect } from 'react';
import './services.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import CourseLocationMap from './CourseLocationMap'; // Import the new map component
import { Widgets } from '@mui/icons-material';
import BookingForm from './BookingForm'; 
import defualtimg from './assets/default.png';
import ProgramDetails from './ProgramDetails';  // Import the new component
import Itinerary from './Itinerary'; // Import Itinerary component





const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function RecipeReviewCard({authenticated, authenticatedID, homeSearchVal}) {
 
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [educationalFocus, setEducationalFocus] = useState('');
  const [learningOutcome, setLearningOutcome] = useState('');
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingType, setBookingType] = useState('');
  const [showItinerary, setShowItinerary] = useState(false); // For toggling Itinerary component

 
  const [authID, setAuthID] = useState(null);

  const [selectedCourseBooking, setSelectedCourseBooking] = useState(null);

  const [img,setImg] =useState('')
  const [imgUrl,setImgUrl] =useState([])
  useEffect(() => {
    if (selectedCourseBooking !== null) {
      console.log("selectedCourseBooking now has a value:", selectedCourseBooking);
      setShowBookingForm(true);
    }
  }, [selectedCourseBooking]); 


  const handleCustomizeMap = () => {
    setShowItinerary(false); // Hide the Itinerary component first (to force refresh)
    
    // Set a small timeout to reset the state to show Itinerary component again
    setTimeout(() => {
      setShowItinerary(true); // Show the Itinerary component again after resetting
    }, 100);
  };
/*   useEffect(() => {
    setShowBookingForm(true);
  }, [selectedCourseBooking]);
 */
  const fetchFilteredCourses = async () => {
    const filterCriteria = {
      search,
      priceRange,
      eventDuration,
      location: locationFilter,
      educationalFocus,
      learningOutcome
    };

    try {
     
      const response = await fetch('http://localhost:8080/api/courses/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterCriteria)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched filtered courses:', data);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching filtered courses:', error);
    }
  };

  const handleCourseClick = async (id) => {
    console.log('In Click Func',id);
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedCourse(data);
      console.log('In Click Func data',data.type);

      const updateResponse = await fetch(`http://localhost:8080/api/courses/${id}/updateViewCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const  handleBookClick = async(type, selected) => {
    handleCloseClick();
    setBookingType(type);
    setSelectedCourseBooking(selected);
   // console.log("selected course to book"+selectedCourseBooking.id);
   // setShowBookingForm(true);
   

    if (!selected) {
      console.log("No course selected");
      return;
    }
  
    if (!authenticatedID) {
      console.log("User ID not available");
      return;
    }
  
    // Create an itinerary object
  /*   const itinerary = {
      stop: selected.title,
      location: selected.location, // Use the course location
      description: "Enjoy this amazing travel experience", // Common description
      date: new Date().toISOString().split('T')[0], // Set today's date (YYYY-MM-DD)
    };
  
    try {
      console.log("Booking course for user ID:", authenticatedID);
  
      // Send the itinerary object to the backend
      const response = await fetch(`http://localhost:8080/api/travellers/${authenticatedID}/itinerary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itinerary), // Send the full itinerary object
      });
  
      if (response.ok) {
        console.log("Course booked successfully");
        alert(`Course "${selected.title}" booked successfully!`);
      } else {
        const errorData = await response.json();
        console.error("Failed to book course:", errorData);
        alert(`Failed to book course: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error booking course:', error);
      alert('An error occurred while booking the course.');
    }
 */
  };


  const closeBookingForm = () => {
    setShowBookingForm(false);
  };
  const handleCloseClick = () => {
    setSelectedCourse(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetchFilteredCourses();
    
  }, [search, priceRange, eventDuration, locationFilter, educationalFocus, learningOutcome]);

  useEffect(() => {

      

 
    const auth = authenticatedID;
    setAuthID(auth);
    console.log("auth from services.js"+authenticated);
  console.log("authID from services.js"+authID);
  }, [authenticated]);
 
  useEffect(() => {
    setSearch(homeSearchVal);
    console.log("set home search val in services.js"+search);
    setTempDivStyle({ display: 'none' }); 
  }, [homeSearchVal]);

  
 // const [hoveredCourse, setHoveredCourse] = useState(null);
  const [tempDivStyle, setTempDivStyle] = useState(null);
  useEffect(() => {
    setTempDivStyle({ display: 'none' }); 
  }, []);
  const [hideTimeout, setHideTimeout] = useState(null);

  const handleMouseEnter = (e, course) => {
    // Clear any existing timeout to prevent hide delay from previous mouse leave
    if (hideTimeout) clearTimeout(hideTimeout);
    setHoveredCourse(course);


    // Get the bounding rectangle of the card
    const rect = e.currentTarget.getBoundingClientRect();

  setTempDivStyle({
    position: 'absolute',
    top: `${rect.top+ window.scrollY +rect.height/2}px`,
    left: `${rect.left+ window.scrollX +rect.width/2}px`,
    width: `${rect.width}px`,
    height: `${rect.height*2/3}px`,
    opacity: '0',
    animation: 'hover-details-appear 0.5s forwards',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.629)',
    border: '1px solid #ccc',
    padding:' 10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: '100000',
  });
};

const handleMouseLeave = () => {
  // Set a timeout to delay the hiding of the div
  const timeout = setTimeout(() => {
    setTempDivStyle((prevStyle) => ({
      ...prevStyle,
      opacity: '0',
      visibility: 'hidden',
      transition: 'opacity 0.2s, visibility 0.2s',
    }));
  }, 300); // Adjust the delay as needed

  setHideTimeout(timeout);
};
  return (
    <section id="explore">
    <div>
      <h1>Explore</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price Range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>
      {selectedCourse && (
        <div className="course-details-modal">
          <button className="close-button-small" onClick={handleCloseClick}>×</button>
          <h2 className="course-tittle">{selectedCourse.title}</h2>
          <div className="course-details-content">
            <div className="course-details-left">
              {/* Access the first image from the images list */}
              {selectedCourse.image && selectedCourse.image.length > 0 ? (
                <img 
                  src={selectedCourse.image[0]} 
                  alt={selectedCourse.title} 
                  className="course-details-image" 
                />
              ) : (
                <p>No image available</p>
              )}
              {/* Use the ProgramDetails component to display specific details */}
              <div className="course-details-left-bottom">
              <ProgramDetails program={selectedCourse} />
              </div>
            </div>
            <div className="course-details-middle">
              <p>{selectedCourse.description || "This Python course offers an unparalleled learning experience tailored for all skill levels, from beginners to advanced programmers. What sets this course apart is its comprehensive approach, combining both theoretical foundations and practical, hands-on projects. Unlike other courses that may focus only on code syntax, this course delves into the underlying principles of Python, providing a deep understanding that enables learners to solve real-world problems effectively. The course is continuously updated to reflect the latest industry standards, ensuring that learners acquire relevant skills. Additionally, with expert instructors and a community of learners, students can engage in discussions, receive personalized feedback, and collaborate on projects. Whether you're looking to start a new career in tech or enhance your existing skills, this Python course offers the tools, resources, and support needed to succeed in today’s competitive programming landscape al foundations and practical, hands-on projects. Unlike other courses that may focus only on code syntax, this course delves into the underlying principles of Python, providing a deep understanding that enables learners to solve real-world problems effectively. The course is continuously updated to reflect the latest industry standards, ensuring that learners acquire relevant skills. Additionally, with expert instructors and a comm course offers an unparalleled learning experience tailored for all skill levels, from beginners to advanced programmers. What sets this course apart is its comprehensive approach, combining both theoretical foundations and practical, hands-on projects. Unlike other courses that may focus only on code syntax, this course delves into the underlying principles of Python, providing a deep understanding that enables learners to solve real-world problems effectively. The course is continuously updated to reflect the latest industry standards, ensuring that learners acquire relevant skills. Additionally, with expert instructors and a community of learners, students can engage in discussions, receive personalized feedback, and collaborate on projects. Whether you're looking to start a new career in tech or enhance your existing skills, this Python course."}</p>
            </div>
            <div className="course-details-right">
              <CourseLocationMap location={selectedCourse.location} />
              <button className="book-button" onClick={()=>handleBookClick(selectedCourse.type,selectedCourse)}>Book</button>
            </div>
          </div>
        </div>
      )}
      
      <div className={`courses-list ${selectedCourse ? 'fade-out' : ''}`}>
        {courses.map((course) => (
          <Card
            key={course.id}
            className="course-card"
            sx={{ maxWidth: 345 }}
            onClick={() => handleCourseClick(course.id)}
            onMouseEnter={(e) => handleMouseEnter(e, course)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
                  {course.title}
                </Typography>
              }
              subheader={
                <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
                  {course.price}
                </Typography>
              }
            />
            <div className='card-test-container'>
            <CardMedia
              component="img"
              height="194"
              image={course.image && course.image.length > 0 ? course.image[0] : ''}
             // image="https://firebasestorage.googleapis.com/v0/b/eduexplore-4ac4e.appspot.com/o/files%2Fe21e7a04-372a-4d8f-a594-1577dc1e48f4?alt=media&token=94355f3a-763e-49e6-b1db-61a293fcbc80"
              alt="img"
              onError={(e) => {
                console.error("image loading error", e);
                e.target.onerror = null;
                e.target.src = defualtimg
               // e.target.src = "https://firebasestorage.googleapis.com/v0/b/eduexplore-4ac4e.appspot.com/o/files%2Fe21e7a04-372a-4d8f-a594-1577dc1e48f4?alt=media&token=94355f3a-763e-49e6-b1db-61a293fcbc80";
              }}
            /> 
            {hoveredCourse === course.id && (
              <div className="course-hover-details" style={tempDivStyle}>
                <p><strong>Price:</strong> {course.price}</p>
                
                <p><strong>Location:</strong> {course.location}</p>
                
              </div>
            )}
            </div>
            
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <Button variant="contained" className="bookBut" color="success" >
                Book
              </Button>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          {/*   {hoveredCourse === course.id && (
              <div className="course-hover-details" style={{zIndex:'1000000'}}>
                <p><strong>Price:</strong> {course.price}</p>
                <p><strong>Standard:</strong> {course.standard}</p>
                <p><strong>Location:</strong> {course.location}</p>
                <p><strong>Educational Focus:</strong> {course.educationalFocus}</p>
                <p><strong>Learning Outcome:</strong> {course.learningOutcome}</p>
                <p><strong>Event Duration:</strong> {course.eventDuration}</p>
              </div>
            )} */}
          </Card>
        ))}
      </div>
      <div>
        <button className="customize-map-button" onClick={handleCustomizeMap}>Customize Map</button>
        {/* Conditionally render Itinerary component after Customize Map button is clicked */}
        {/* Conditionally render Itinerary component after Customize Map button is clicked */}
        {showItinerary && <Itinerary authenticatedID={authenticatedID} />}
      </div>

      

{showBookingForm && <BookingForm type={bookingType} onClose={closeBookingForm} authenticatedID={authenticatedID} selectedCourseBooking={selectedCourseBooking}   />}
    </div>

{/*     <div className="course-hover" style={tempDivStyle}>
                  <p><strong>Price:</strong>  </p>
                  <p><strong>Standard:</strong> </p>
                  <p><strong>Location:</strong> </p>
                  <p><strong>Ratings:</strong></p>
                  <p><strong>Number of Bookings:</strong> </p>
                  <p><strong>Type:</strong></p>
                </div>
 */}
       {hoveredCourse &&       <div className="course-hover" style={tempDivStyle}>
                  <p><strong>Price:</strong> {hoveredCourse.price} </p>
                  <p><strong>Standard:</strong> {hoveredCourse.standard} </p>
                  <p><strong>Location:</strong> {hoveredCourse.location} </p>
                  <p><strong>Ratings:★★★</strong>{hoveredCourse.ratings}</p>
                  <p><strong>Number of Bookings:</strong> {hoveredCourse.numBookings}</p>
                  <p><strong>Type:</strong>{hoveredCourse.type}</p>
             
                 
                </div>} 
    </section>

    
  );
}

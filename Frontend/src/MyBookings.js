import React, { useState, useEffect } from 'react';
import './services.css';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
import defualtimg from './assets/default.png';
import { jwtDecode } from 'jwt-decode';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import tokenService from './TokenService'; 

import { DragOverlay } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { AnimatePresence } from 'framer-motion';
import Notification from './Notification';

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

function SortableItem({ booking }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: booking.id.toString(),
  });

  // Calculate the style for the dragging item
  const style = {
    transform: transform 
      ? `translate(${transform.x}px, ${transform.y}px)` 
      : undefined, // Apply the transform here
    transition,
    boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
    opacity: isDragging ? 0.8 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    
    zIndex: isDragging ? 1000 : 'auto',
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="course-card" sx={{ maxWidth: 345,borderRadius: '50px' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              B
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
              {booking.title}
            </Typography>
          }
          subheader={
            <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
              {booking.price}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={booking.image}
          alt={booking.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defualtimg;
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {booking.standard}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button variant="contained" color="success">
            View Details
          </Button>
          <ExpandMore
            expand={false}
            onClick={() => {}}
            aria-expanded={false}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    </div>
  );
}

export default function MyBookings({authenticated, authenticatedID}) {
  const [bookings, setBookings] = useState([]);
//  const [username, setUsername] = useState('');
 // const [authenticated, setAuthenticated] = useState(false);
 // const [authenticatedID, setAuthenticatedID] = useState();

  const [activeId, setActiveId] = useState(null);
//  const [token, setToken] = useState(null);

/*   authenticated

  useEffect(() => {
      setToken(localStorage.getItem('authToken'));

    

   
  }, []); */


  useEffect(() => {
   // setToken(localStorage.getItem('authToken'));
  /*   var authid=0;
    if (token) {
      try {

        const verifyTokenUserId = tokenService.verifyToken(token);
        if(verifyTokenUserId!=false)
        {
        const decodedToken = jwtDecode(token);
        const decodedTokenID = decodedToken.id;
        setAuthenticatedID(decodedTokenID);
        setUsername(decodedToken.username);
      //  setAuthenticated(true);
        authid = decodedToken.id;
        console.log(" token bookings:", authid);
        document.getElementById('MyBookingsDiv').style.display = 'block';
        }else{
          console.log(" Session Expired:");
          document.getElementById('MyBookingsDiv').style.display = 'none';

        }
      } catch (error) {
        console.error("Invalid token booking :", error);
        document.getElementById('MyBookingsDiv').style.display = 'none';
      }
    }else{
      console.log("Token not found :booking :");
    } */
      var authid=0;
   if(authenticated){
   
    console.log(" bookings:", authenticatedID);
    authid = authenticatedID;
    document.getElementById('MyBookingsDiv').style.display = 'block';
   

    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8080/booking/getList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authid),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();

  }else{
    document.getElementById('MyBookingsDiv').style.display = 'none';
    console.log(" User not Authenticated:");
  }
  }, [authenticated]);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (active.id !== over.id) {
      setBookings((items) => {
        const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
        const newIndex = items.findIndex((item) => item.id.toString() === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });

      const idsString = bookings.map(booking => booking.id).join(',');
      const bookingReset = { id: authenticatedID, bookingList: idsString };

      try {
        fetch('http://localhost:8080/booking/setList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingReset),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log('Booking order updated successfully');
        });
      } catch (error) {
        console.error('Error updating Booking order:', error);
      }
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  }; 

  const activeItem = bookings.find((booking) => booking.id.toString() === activeId);

  
  const ProceedWithPayment = () => {
    if(authenticated){
      fetchBookingsTotalPrice();

    }else{
      showNotification('Please login to proceed with payment');
    }
  };

  const fetchBookingsTotalPrice = async () => {
    var authid=0;
    authid = authenticatedID;
    try {
      const response = await fetch('http://localhost:8080/booking/getListTotalPrice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authid),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
     console.log('Total Price:', data);
     if(data.payment_url){
     // setIsPaymentInitiated(true);

      window.location.href=data.payment_url;
     }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Call checkPaymentStatus when the component mounts
useEffect(() => {
  checkPaymentStatus();  
}, [])

const [notification, setNotification] = useState(null);

  // Function to check URL query parameters and display success/failure popup
const checkPaymentStatus = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const status = queryParams.get('status');

  if (status === 'success') {

   // alert('Payment Successful!');
   updateBookingsAfterPayment();
   
  } else if (status === 'failure') {
  //  alert('Payment Failed!');
  showNotification('Payment Failed!');
   const currentUrl = window.location.href.split('?')[0]; 
   window.history.replaceState(null, '', currentUrl);
  }
};


const updateBookingsAfterPayment = async () => {
  
      
  var authid=0;
  authid = await authenticatedID;

  if (authid === 0 || authid === undefined|| authid === null) {
    console.log("Waiting for authid...");
    setTimeout(updateBookingsAfterPayment, 500); // Retry after 500ms
    return;
  }

  console.log("hereeee authid:",authid);

  try {
    const response = await fetch('http://localhost:8080/booking/updateBookingAfterPayment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authid),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    console.log('Booking table updated:', data);
   if(data =="Booking's table updated successfully"){
    showNotification('Payment Successful!');
    const currentUrl = window.location.href.split('?')[0]; 
    setPaymentCompleted(true);
    window.history.replaceState(null, '', currentUrl);
   }
    
  } catch (error) {
    console.error('Error updating bookings after payment:', error);
  }

};

const [paymentCompleted, setPaymentCompleted] = useState(false);

useEffect(() => {
  if (authenticatedID) {
    checkPaymentStatus();
  }
}, [authenticatedID]);  


const showNotification = (message) => {
  setNotification(message);
};

const handleNotificationClose = () => {
    setNotification(null); // Clear the notification when it is closed
};

  return (
    <section id='MyBookings' style={{ marginTop: '120px' }}>
      <AnimatePresence>
                {notification && (
                    <Notification message={notification} onClose={handleNotificationClose} />
                )}
            </AnimatePresence>
      <div id='MyBookingsDiv' style={{ display: 'none' }}>

        <div className="section-header" id='blog' style={{marginTop:'30px', marginBottom:'30px'}}>
         <h2>My Bookings</h2>
         <p>Drag & Drop program to edit your itinerary</p>
         </div>
        <Button type='submit' id='payButton' onClick={ProceedWithPayment}>
         {paymentCompleted ?'Payment Completed': 'Proceed with payment'}
         {paymentCompleted ? <DoneAllIcon /> : <DoubleArrowIcon />}
         </Button>         <div className={`courses-list 'fade-out' : ''}`}>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <SortableContext items={bookings.map(booking => booking.id.toString())} strategy={verticalListSortingStrategy}>
              {bookings.map((booking, index) => (
                <React.Fragment key={booking.id}>
                  <SortableItem booking={booking} style={{ borderRadius: '50px' }} />
                 {/*  {index < bookings.length - 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}>
                      <DoubleArrowIcon style={{ fontSize: '100px', color: 'gray',margin:'auto' }} />
                    </div>
                  )} */}
                </React.Fragment>
              ))}
            </SortableContext>
            <DragOverlay modifiers={[snapCenterToCursor]}>
              {activeItem ? <SortableItem booking={activeItem} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </section>
  );


}

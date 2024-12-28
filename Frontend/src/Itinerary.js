import React, { useContext, useState, useEffect } from 'react';
import './itinerary.css';
import MapComponent from './Map';
//import { UserContext } from './UserContext'; // Import UserContext to access userId
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
export default function Itinerary({authenticatedID }) {
 // const { userId } = useContext(UserContext); // Access userId from UserContext
  const [itinerary, setItinerary] = useState([]); // Local state to store the full itinerary objects
  const [newLocation, setNewLocation] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Modal visibility state
  const [editingItem, setEditingItem] = useState(null); // The item being edited
  const [editedLocation, setEditedLocation] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDate, setEditedDate] = useState('');

  // Fetch itinerary data when the component mounts
  useEffect(() => {
    const userID =authenticatedID;
    console.log('Authenticated ID in Itinerary: ',userID);
    const fetchItinerary = async () => {
      if (userID) {
        try {

          const response = await fetch(`http://localhost:8080/api/travellers/${userID}/itinerary`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            
          });
          if (response.ok) {
            const itineraryData = await response.json();
            setItinerary(itineraryData); // Update the state with fetched itinerary objects
          } else {
            console.error('Failed to fetch itinerary');
          }
        } catch (error) {
          console.error('Error fetching itinerary:', error);
        }
      }
    };

    fetchItinerary(); // Call the fetch function when the component is rendered
  }, [authenticatedID]);

  // Handle reordering after drag-and-drop
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(itinerary);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItinerary(items); // Update the order in state

    // Optionally, you can send the updated itinerary back to the backend
    saveUpdatedItinerary(items);
  };

  // Open the modal for editing
  const openEditModal = (item) => {
    setEditingItem(item);
    setEditedLocation(item.location);
    setEditedDescription(item.description);
    setEditedDate(item.date);
    setIsEditing(true); // Show modal
  };

  // Save edited details
  const saveEditedItem = () => {
    const updatedItinerary = itinerary.map(item =>
      item.id === editingItem.id ? {
        ...item,
        location: editedLocation,
        description: editedDescription,
        date: editedDate
      } : item
    );
    setItinerary(updatedItinerary);
    saveUpdatedItinerary(updatedItinerary);
    setIsEditing(false); // Hide modal
  };

  


  // Save reordered itinerary to backend
  const saveUpdatedItinerary = async (newItinerary) => {
    try {
      const response = await fetch(`http://localhost:8080/api/travellers/${authenticatedID}/itinerary/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItinerary),
      });
      if (!response.ok) {
        console.error('Failed to save reordered itinerary');
      }
    } catch (error) {
      console.error('Error saving reordered itinerary:', error);
    }
  };

  // Add location to the itinerary via backend API
  const addLocation = async () => {
    if (newLocation && authenticatedID) {
      const itineraryEntry = {
        stop: "Stops",
        location: newLocation,
        description: "Custom description", // A placeholder description for now
        date: new Date().toISOString().split('T')[0] // Today's date for testing purposes
      };
      
      try {
        const response = await fetch(`http://localhost:8080/api/travellers/${authenticatedID}/itinerary`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itineraryEntry),
        });

        if (response.ok) {
          const updatedTraveller = await response.json();
          setItinerary(updatedTraveller.itineraries); // Update the itinerary with the response
          setNewLocation(''); // Clear input field
        } else {
          console.error('Failed to add location');
        }
      } catch (error) {
        console.error('Error adding location:', error);
      }
    }
  };

  // Remove location from the itinerary via backend API
  const removeLocation = async (itineraryToRemove) => {
    const updatedItinerary = itinerary.filter(item => item.id !== itineraryToRemove.id);
    
    if (authenticatedID && itineraryToRemove) {
      try {
        console.log('Program:', itineraryToRemove);
        const response = await fetch(`http://localhost:8080/api/travellers/${authenticatedID}/itinerary/location`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itineraryToRemove),
        });
  
        if (response.ok) {
          setItinerary(updatedItinerary); // Update the itinerary after successful removal
        } else {
          console.error('Failed to remove location');
        }
      } catch (error) {
        console.error('Error removing location:', error);
      }
    }
  };

  return (
    <div>
        <div className="section-header">
        <h2 style={{marginTop:'30px'}}>My Iternary</h2>
        <ModeOfTravelIcon style={{ fontSize: '75px' }} />
        <p>View your whole journey here at your fingertips!</p><br/>
        <p>Enhanced with real time editing access to suit all your plans!</p>
        </div>
      <div className={`itinerary-container ${isEditing ? 'blurred' : ''}`}>
      {/* Left Column: Itinerary List */}
      <div className="itinerary-list-container">
    
        {/* Drag and Drop List */}
      {/* Drag and Drop List */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="itineraryy">
            {(provided) => (
              <ul className="itinerary-list" {...provided.droppableProps} ref={provided.innerRef}>
                {itinerary.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided) => (
                      <li
                        className="itinerary-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>
                        <p><strong>ID :</strong> {item.id}</p>
                          <p><strong>Location:</strong> {item.location}</p>
                          <p><strong>Description:</strong> {item.description}</p>
                          <p><strong>Date:</strong> {item.date}</p>
                          <button className="remove-btn" onClick={() => removeLocation(item)}>Remove</button>
                          <button className="edit-btn" onClick={() => openEditModal(item)}>Edit</button>

                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
  
        <div className="add-location-form">
          <input 
            type="text" 
            value={newLocation} 
            onChange={(e) => setNewLocation(e.target.value)} 
            placeholder="Add new location" 
            className="add-location-input"
          />
          <button className="add-location-btn" onClick={addLocation}>Add Location</button>
        </div>
      </div>
  
      {/* Right Column: Map */}
      {itinerary.length > 1 && (
        <div className="map-container">
          <h3>Itinerary Map</h3>
          <MapComponent 
            origin={itinerary[0].location} 
            destination={itinerary[itinerary.length - 1].location} 
            stops={itinerary.slice(1, -1).map(item => item.location)} 
          />
        </div>
      )}

      
    </div>
    {/* Edit Modal */}
    {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Edit Itinerary</h3>
            <label>
              Location:
              <input type="text" value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} />
            </label>
            <label>
              Description:
              <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
            </label>
            <label>
              Date:
              <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />
            </label>
            <div className="modal-buttons">
            <button className="save-btn modal-button" onClick={saveEditedItem}>Save</button>
            <button className="cancel-btn modal-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

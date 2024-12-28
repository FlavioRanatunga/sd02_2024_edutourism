import React from 'react';
import { Modal, Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const ServiceEditModal = ({ open, onClose, selectedService, setUpdatedCourse, handleSaveEdit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{ width: '500px', height: '650px', marginTop: '1%', overflow: 'scroll', marginBottom: '1%', scrollbarWidth: '8px' }}
        sx={{
          width: '650px',
          height: '700px',
          overflow: 'scroll',
          marginTop: '1%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          mx: 'auto',
          mt: '10%',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {selectedService ? `Edit ${selectedService.title}` : 'Add Service'}
        </Typography>
        {selectedService && (
          <form>
            {/* Common Fields */}
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Name"
                value={selectedService.title}
                onChange={(e) => setUpdatedCourse({ ...selectedService, title: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Price"
                value={selectedService.price}
                onChange={(e) => setUpdatedCourse({ ...selectedService, price: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Image URL"
                value={selectedService.image}
                onChange={(e) => setUpdatedCourse({ ...selectedService, image: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Box>

            {/* Conditionally render Hotel-specific fields */}
            {selectedService.type === 'Hotel' && (
              <>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Luxury Room Price"
                    value={selectedService.luxRoomPrice || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, luxRoomPrice: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Normal Room Price"
                    value={selectedService.normalRoomPrice || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, normalRoomPrice: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Available Luxury Rooms"
                    value={selectedService.availableLuxRooms || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, availableLuxRooms: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Available Normal Rooms"
                    value={selectedService.availableNormalRooms || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, availableNormalRooms: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedService.hasParking || false}
                        onChange={(e) => setUpdatedCourse({ ...selectedService, hasParking: e.target.checked })}
                      />
                    }
                    label="Has Parking"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedService.hasBreakfastIncluded || false}
                        onChange={(e) => setUpdatedCourse({ ...selectedService, hasBreakfastIncluded: e.target.checked })}
                      />
                    }
                    label="Breakfast Included"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedService.isAllInclusive || false}
                        onChange={(e) => setUpdatedCourse({ ...selectedService, isAllInclusive: e.target.checked })}
                      />
                    }
                    label="All Inclusive"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Check-In Time"
                    value={selectedService.checkInTime || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, checkInTime: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Check-Out Time"
                    value={selectedService.checkOutTime || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, checkOutTime: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Check-In Date"
                    type="date"
                    value={selectedService.checkInDate || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, checkInDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Check-Out Date"
                    type="date"
                    value={selectedService.checkOutDate || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, checkOutDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Number of Rooms"
                    value={selectedService.rooms || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, rooms: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Hotel Weblink"
                    value={selectedService.hotelWeblink || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, hotelWeblink: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
              </>
            )}

            {/* Conditionally render Course-specific fields */}
            {selectedService.type === 'Course' && (
              <>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Duration"
                    value={selectedService.duration || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, duration: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Participants"
                    value={selectedService.participants || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, participants: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Prerequisites"
                    value={selectedService.prerequisites || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, prerequisites: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Course Start Date"
                    type="date"
                    value={selectedService.courseStartDate || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, courseStartDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Course End Date"
                    type="date"
                    value={selectedService.courseEndDate || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, courseEndDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                {/* Add other Course fields as needed */}
              </>
            )}

            {/* Conditionally render TravelLocation-specific fields */}
            {selectedService.type === 'TravelLocation' && (
              <>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Travel Date"
                    type="date"
                    value={selectedService.travelDate || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, travelDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Travelers"
                    value={selectedService.travelers || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, travelers: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Guide Name"
                    value={selectedService.guideName || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, guideName: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                {/* Add other TravelLocation fields as needed */}
              </>
            )}

            {/* Conditionally render Package-specific fields */}
            {selectedService.type === 'Package' && (
              <>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={selectedService.startDate || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, startDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="End Date"
                    type="date"
                    value={selectedService.endDate || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, endDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Package Locations"
                    value={selectedService.packageLocations || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, packageLocations: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                {/* Add other Package fields as needed */}
              </>
            )}

            {/* Conditionally render Transport-specific fields */}
            {selectedService.type === 'Transport' && (
              <>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Transport Type"
                    value={selectedService.transportType || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, transportType: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Vehicle Type"
                    value={selectedService.vehicleType || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, vehicleType: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Max Passengers"
                    value={selectedService.maxPassengers || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, maxPassengers: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedService.isSelfDrive || false}
                        onChange={(e) => setUpdatedCourse({ ...selectedService, isSelfDrive: e.target.checked })}
                      />
                    }
                    label="Self Drive"
                  />
                </Box>
                {/* Add other Transport fields as needed */}
              </>
            )}

            {/* Conditionally render Event-specific fields */}
            {selectedService.type === 'Event' && (
              <>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Event Name"
                    value={selectedService.eventName || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, eventName: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Event Date"
                    type="date"
                    value={selectedService.eventDate || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, eventDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Start Time"
                    value={selectedService.startTime || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, startTime: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Attendees"
                    value={selectedService.attendees || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, attendees: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Venue"
                    value={selectedService.venue || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, venue: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Event Host"
                    value={selectedService.eventHost || ''}
                    onChange={(e) => setUpdatedCourse({ ...selectedService, eventHost: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
              </>
            )}

            <Button onClick={handleSaveEdit} variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default ServiceEditModal;

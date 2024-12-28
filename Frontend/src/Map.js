import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { Description } from '@mui/icons-material';

const libraries = ['places'];
const mapContainerStyle = {
  height: '500px',
  width: '75%',
  margin: 'auto',
  marginBottom: '50px',
  marginTop: '50px'
};
const center = {
  lat: 6.9271, // Center map on Colombo
  lng: 79.8612,
};

const MapComponent = ({ origin, destination, stops }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBk2aIAXGXg1mUuhsZVaPUSsjPkUmXTgBM', // Replace with your Google Maps API key
    libraries,
  });

  const [directions, setDirections] = useState(null);
  const [totalDistance, setTotalDistance] = useState('');
  const [totalDuration, setTotalDuration] = useState('');

  useEffect(() => {
    if (origin && destination && stops && isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      const directionsService = new window.google.maps.DirectionsService();

      const geocodeAddress = (address) => {
        return new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              resolve(results[0].geometry.location);
            } else {
              reject(`Geocode error: ${status}`);
            }
          });
        });
      };

      const getCoordinates = async () => {
        try {
          const originCoords = await geocodeAddress(origin);
          const destinationCoords = await geocodeAddress(destination);
          const stopCoords = await Promise.all(stops.map(stop => geocodeAddress(stop)));
          
          return { originCoords, destinationCoords, stopCoords };
        } catch (error) {
          console.error(error);
        }
      };

      const renderDirections = async () => {
        const { originCoords, destinationCoords, stopCoords } = await getCoordinates();

        directionsService.route(
          {
            origin: originCoords,
            destination: destinationCoords,
            waypoints: stopCoords.map(location => ({ location, stopover: true })),
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);

              // Calculate total distance and duration
              const legs = result.routes[0].legs;
              let distance = 0;
              let duration = 0;

              legs.forEach(leg => {
                distance += leg.distance.value;
                duration += leg.duration.value;
              });

              setTotalDistance((distance / 1000).toFixed(2) + ' km'); // Convert to km and format
              setTotalDuration((duration / 3600).toFixed(2) + ' hrs'); // Convert to hours and format
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      };

      renderDirections();
    }
  }, [origin, destination, stops, isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div id='itinerary' >
      <div className="section-header">
        
        
        <div style={{ textAlign: 'left', marginTop: '5px', width:'75%', margin:'auto', fontSize: '20px'}}>
          <span style={{ float: 'left',marginBottom:'20px', }} >Your Stops: {origin+", "}{stops}{", "+destination}</span>
        </div>
        {totalDistance && totalDuration && (
        <div style={{ textAlign: 'center', marginTop: '5px', width:'75%', margin:'auto', fontSize: '20px'}}>
          <span style={{ float: 'left',marginBottom:'20px', }} >Total Distance: {totalDistance}</span>
          <span  style={{ float: 'right',marginBottom:'20px' }} >Total Duration: {totalDuration}</span>
        </div>
      )}
      </div>
      
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}>
        {directions && <DirectionsRenderer directions={directions} />}

      </GoogleMap>
  
    </div>
  );
};

export default MapComponent;

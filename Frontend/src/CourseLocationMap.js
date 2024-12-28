import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  height: '300px',
  width: '100%',
  borderRadius: '5px',
};
const center = {
  lat: 6.9271, // Default center on Colombo
  lng: 79.8612,
};

const CourseLocationMap = ({ location }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBk2aIAXGXg1mUuhsZVaPUSsjPkUmXTgBM', // Replace with your Google Maps API key
    libraries,
  });

  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (location && isLoaded) {
      const geocoder = new window.google.maps.Geocoder();

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
          const coords = await geocodeAddress(location);
          setCoordinates(coords);
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      };

      getCoordinates();
    }
  }, [location, isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={coordinates || center}>
      {coordinates && <Marker position={coordinates} />}
    </GoogleMap>
  );
};

export default CourseLocationMap;

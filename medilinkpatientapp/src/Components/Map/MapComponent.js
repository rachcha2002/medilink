import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './MapComponent.css'; // Assuming you'll have custom CSS for styling
import image1 from '../../assets/images/common/logo.png';

const libraries = ['places'];

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [category, setCategory] = useState('hospital');
  const API_KEY = 'AIzaSyDYPmtB26Wq6bdiMMeNonoAUgoJ9go0nX4';
  const mapStyles = { height: '250px', width: '100%' };
  const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Default location (Colombo)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          fetchNearbyFacilities(location);
        },
        (error) => console.error('Error fetching user location:', error),
        { enableHighAccuracy: true }
      );
    }
  }, [isLoaded]);

  const fetchNearbyFacilities = (location) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error('Google Places API is not available.');
      return;
    }

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: '5000', // 5km radius
      type: category, // Use the selected category
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setFacilities(results);
      } else {
        console.error('Error fetching places:', status);
      }
    });
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (userLocation) {
      fetchNearbyFacilities(userLocation);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Nearest Health Facilities</h1>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search for a Health Facility" />
      </div>

      {/* Category buttons */}
      <div className="category-buttons">
        <button
          className={`category-btn ${category === 'hospital' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('hospital')}
        >
          Hospitals
        </button>
        <button
          className={`category-btn ${category === 'pharmacy' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('pharmacy')}
        >
          Pharmacies
        </button>
        <button
          className={`category-btn ${category === 'doctor' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('doctor')}
        >
          Dispensaries
        </button>
        <button
          className={`category-btn ${category === 'dentist' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('dentist')}
        >
          Dental Clinics
        </button>
        <button
          className={`category-btn ${category === 'physiotherapist' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('physiotherapist')}
        >
          Physical Therapy
        </button>
      </div>

      {/* Map */}
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={userLocation || defaultCenter}
        >
          {userLocation && <Marker position={userLocation} label="You" />}
          {facilities.map((facility, index) => (
            <Marker
              key={index}
              position={{
                lat: facility.geometry.location.lat(),
                lng: facility.geometry.location.lng(),
              }}
              title={facility.name}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Facility List */}
      <div className="facility-list">
        {facilities.length > 0 ? (
          facilities.map((facility, index) => (
            <div key={index} className="facility-item">
              <img
                src={facility.photos ? facility.photos[0].getUrl() : {image1}}
                alt={facility.name}
                className="facility-image"
              />
              <div className="facility-details">
                <h3>{facility.name}</h3>
                <p>{facility.vicinity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No facilities found.</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;

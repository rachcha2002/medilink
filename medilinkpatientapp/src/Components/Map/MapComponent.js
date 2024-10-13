import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './MapComponent.css'; // Assuming you'll have custom CSS for styling
import Modal from './LocationDetailsModal'; // Import the Modal component
import image1 from '../../assets/images/common/logo-color.png';

const libraries = ['places'];

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [facilities, setFacilities] = useState([]); // All facilities
  const [filteredFacilities, setFilteredFacilities] = useState([]); // Filtered facilities to display
  const [selectedFacility, setSelectedFacility] = useState(null); // State to hold selected facility
  const [category, setCategory] = useState('hospital');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const API_KEY = 'AIzaSyDYPmtB26Wq6bdiMMeNonoAUgoJ9go0nX4';
  const mapStyles = { height: '300px', width: '100%' };
  const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Default location (Colombo)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

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
        setFilteredFacilities(results); // Initialize the filtered facilities to all facilities
      } else {
        console.error('Error fetching places:', status);
      }
    });
  };

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

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (userLocation) {
      fetchNearbyFacilities(userLocation);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the facilities based on the search query
    const filtered = facilities.filter((facility) =>
      facility.name.toLowerCase().includes(query) || facility.vicinity.toLowerCase().includes(query)
    );
    setFilteredFacilities(filtered);
  };

  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility); // Set selected facility
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div className="map-container">
      {/* Header */}
      <div className="map-header">
        <h1>Nearest Health Facilities</h1>
      </div>

      {/* Search bar */}
      <div className="map-search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search for a Health Facility"
        />
      </div>

      {/* Category buttons */}
      <div className="category-buttons-map">
        <button
          className={`category-btn-map ${category === 'hospital' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('hospital')}
        >
          Hospitals
        </button>
        <button
          className={`category-btn-map ${category === 'pharmacy' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('pharmacy')}
        >
          Pharmacies
        </button>
        <button
          className={`category-btn-map ${category === 'doctor' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('doctor')}
        >
          Dispensaries
        </button>
        <button
          className={`category-btn-map ${category === 'dentist' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('dentist')}
        >
          Dental Clinics
        </button>
        <button
          className={`category-btn-map ${category === 'physiotherapist' ? 'active' : ''}`}
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
          {filteredFacilities.map((facility, index) => (
            <Marker
              key={index}
              position={{
                lat: facility.geometry.location.lat(),
                lng: facility.geometry.location.lng(),
              }}
              title={facility.name}
              onClick={() => handleFacilityClick(facility)} // Click to open modal
            />
          ))}
        </GoogleMap>
      </div>

      {/* Facility List */}
      <div className="facility-list-map">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((facility, index) => (
            <div key={index} className="facility-item-map" onClick={() => handleFacilityClick(facility)}>
              <img
                src={facility.photos ? facility.photos[0].getUrl() : image1}
                alt={facility.name}
                className="facility-image-map"
              />
              <div className="facility-details-map">
                <h5>{facility.name}</h5>
                <p>{facility.vicinity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No facilities found.</p>
        )}
      </div>

      {/* Modal Component */}
      {isModalOpen && selectedFacility && (
        <Modal facility={selectedFacility} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MapComponent;
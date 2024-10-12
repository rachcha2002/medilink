import React, { useState, useEffect } from 'react';
import { UserLocationContext } from '../../context/UserLocationContext';
//import MainHeader from '../../components/MainHeader';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
import MapComponent from '../../Components/Map/MapComponent';

const LocationScreen = () => {
  const [selectedFacility, setSelectedFacility] = useState('hospital');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocationList, setFilteredLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                coords: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
            },
            (error) => {
              setErrorMsg('Could not fetch location');
              console.log('Error getting location: ', error);
            }
          );
        } else {
          setErrorMsg('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.log('Error getting location: ', error);
        setErrorMsg('Could not fetch location');
      }
    })();
  }, []);


  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  if (!location) {
    return <p>Loading location...</p>;
  }

  return (
    <div className="bg-white h-full">
     {/* <MainHeader title="Nearest Health Facilities" />*/}
      <UserLocationContext.Provider value={{ location, setLocation }}>
       <MapComponent />
      </UserLocationContext.Provider>
    </div>
  );
};

const styles = {
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #6D31ED',
  },
  searchSection: {
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
};

export default LocationScreen;

import React, { useState, useEffect } from "react";
import { UserLocationContext } from "../../Context/UserLocationContext";
import "leaflet/dist/leaflet.css"; // Import Leaflet styles
import MapComponent from "../../Components/Map/MapComponent";

const LocationScreen = () => {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
              setErrorMsg("Could not fetch location");
              console.log("Error getting location: ", error);
            }
          );
        } else {
          setErrorMsg("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.log("Error getting location: ", error);
        setErrorMsg("Could not fetch location");
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


export default LocationScreen;

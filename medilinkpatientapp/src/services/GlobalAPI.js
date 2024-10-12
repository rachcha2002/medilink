import axios from 'axios';

const BASE_URL = "https://maps.googleapis.com/maps/api/place";

// Fetch Google API key from environment variables
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Function to get nearby places
const nearByPlace = async (lat, lng, type) => {
  try{
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/nearbyPlaces`, {
    params: {
      location: `${lat},${lng}`,
      radius: 3000,
      type: type,
      //key: API_KEY
    },
  });
  console.log(response.data);
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

// Function to search places by text
const searchByText = (searchText) => {
  return axios.get(`${BASE_URL}/textsearch/json`, {
    params: {
      query: searchText,
      key: API_KEY
    }
  });
};

export default {
  nearByPlace,
  searchByText
};

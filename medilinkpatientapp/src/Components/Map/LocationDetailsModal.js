import React from 'react';
import './LocationModal.css';
import image1 from '../../assets/images/common/logo-color.png';

const LocationDetailModal = ({ facility, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content-modal">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <img
          src={facility.photos ? facility.photos[0].getUrl() : image1}
          alt={facility.name}
          className="modal-facility-image"
        />
        <h2>{facility.name}</h2>
        <p><strong>Status:</strong> {facility.business_status || 'Unknown'}</p>
        <p><strong>Address:</strong> {facility.vicinity}</p>
        <p><strong>Rating:</strong> {facility.rating || 'No ratings'}</p>
        <p><strong>Opening Hours:</strong> {facility.opening_hours?.open_now ? 'Currently Open' : 'Closed'}</p>
        <p><strong>Categories:</strong></p>
        <div className="modal-categories">
          {facility.types?.map((type, index) => (
            <span key={index} className="modal-category">{type.replaceAll('_', ' ')}</span>
          ))}
        </div>
        <button className="modal-call-btn" onClick={() => window.location.href = `tel:${facility.international_phone_number || 'No number'}`}>
          Call
        </button>
      </div>
    </div>
  );
};

export default LocationDetailModal;

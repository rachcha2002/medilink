import React, { useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import Appointment2 from './Appointment2';
import Appointment3 from './Appointment3';
import Appointment4 from './Appointment4';
import './Appointment.css'; // Import the CSS file for styling

const Appointment = () => {
  const [activeTab, setActiveTab] = useState('Channeling');

  const renderAppointmentSection = () => {
    switch (activeTab) {
      case 'Channeling':
        return <Appointment2 />;
      case 'Clinic':
        return <Appointment3 />;
      case 'Testscan':
        return <Appointment4 />;
      default:
        return null;
    }
  };

  return (
    <section id="appointment" className="appointment-section">
      {/* Background Shapes */}
      <div className="shape shape4">
        <img src="/shape/section_shape.png" alt="Section Shape" />
      </div>
      <div className="shape shape6">
        <img src="/shape/contact-shape3.svg" alt="Contact Shape" />
      </div>

      {/* Section Heading */}
      <SectionHeading
        title="Make an appointment"
        subTitle="Manage your appointments effortlessly with us. Easily schedule, view, and manage upcoming appointments, ensuring you never miss a meeting or event. Stay organized and in control with reminders and quick access to all your bookings in one convenient place."
      />

      {/* Buttons for navigation */}
      <div className="button-group">
        <button
          onClick={() => setActiveTab('Channeling')}
          className="st-btn st-style1 st-color1 st-size-medium"
        >
          Channeling
        </button>
        <button
          onClick={() => setActiveTab('Clinic')}
          className="st-btn st-style1 st-color1 st-size-medium"
        >
          Clinic
        </button>
        <button
          onClick={() => setActiveTab('Testscan')}
          className="st-btn st-style1 st-color1 st-size-medium"
        >
          Tests & Scans
        </button>
      </div>

      {/* Appointment Section */}
      {renderAppointmentSection()}
    </section>
  );
};

export default Appointment;

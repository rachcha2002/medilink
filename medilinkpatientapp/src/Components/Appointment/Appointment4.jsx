import { Icon } from '@iconify/react';
import React, { useState } from 'react'

const Appointment4 = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    doctor: '',
    msg: ''
  });

  // Handler for input field changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    formData.append("access_key", "fcc74231-656a-425b-a54f-aff38354fadb");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        doctor: '',
        msg: ''
      });
      setLoading(false)
    }
  };

  return (
    <section id="appointment">
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="st-section-heading st-style2">
          <h2 className="st-section-heading-title">
            Make an <span className="st-pink">appointment</span> <br />
            to get early access
          </h2>
        </div>
        <div className="st-height-b35 st-height-lg-b35" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <form
              method="POST"
              onSubmit={onSubmit}
              className="st-appointment-form"
              id="appointment-form"
            >
              <input type="hidden" name="from_name" value="Nischinto Medical Appoinment" />
              <input type="hidden" name="replyto" value="custom@gmail.com" />
              <div id="st-alert1" />
              <div className="st-height-b35 st-height-lg-b35" />
              <div className="st-form-field st-style1 st-color2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleInputChange}
                  value={formData.name}
                  required
                />
              </div>
              <div className="st-form-field st-style1 st-color2">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="st-form-field st-style1 st-color2">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  onChange={handleInputChange}
                  value={formData.phone}
                  required
                />
              </div>
              <div className="st-form-field st-style1 st-color2">
                <input
                  name="date"
                  type="text"
                  id="date"
                  placeholder="dd/mm/yy"
                  onChange={handleInputChange}
                  value={formData.date}
                  required
                />
                <div className="form-field-icon">
                  <Icon icon="fa:calendar" />
                </div>
              </div>
              <div className="st-form-field st-style1 st-color2">
                <div className="st-custom-select-wrap">
                  <select
                    name="doctor"
                    className="st_select1"
                    id="doctor"
                    data-placeholder="Select doctor"
                    onChange={handleInputChange}
                    value={formData.doctor}
                    required
                  >
                    <option>Select Doctor</option>
                    <option value="jhon-doe">Dr. Jhon Doe</option>
                    <option value="mak-rushi">Dr. Mak Roshi</option>
                    <option value="mohoshin-kabir">Dr. Mohoshin Kabir</option>
                    <option value="nayon-borua">Dr. Nayon Borua</option>
                    <option value="rasel-islam">Dr. Rasel Islam</option>
                    <option value="mahid-islam">Dr. Mahid Islam</option>
                  </select>
                </div>
              </div>
              <div className="st-form-field st-style1 st-color2">
                <textarea
                  cols={30}
                  rows={10}
                  id="msg"
                  name="msg"
                  placeholder="Write something here..."
                  onChange={handleInputChange}
                  value={formData.msg}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  className="st-btn st-style1 st-color4 st-size-medium"
                  type="submit"
                  id="appointment-submit"
                  name="submit"
                >
                  {loading ? "Sending..." : "Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  )
}

export default Appointment4

import React, { useState } from 'react'
import parser from 'html-react-parser'
import { Icon } from '@iconify/react';

const Appointment3 = ({ data, varient }) => {
  const { title, img, phone } = data;

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
    <section id="appointment" className="st-gray-bg1">
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="row st-col-reverse-xl">
          <div className="col-xl-6">
            <div className="st-vertical-middle">
              <div className="st-vertical-middle-in">
                <form
                  method="POST"
                  onSubmit={onSubmit}
                  className="st-appointment-form"
                  id="appointment-form"
                >
                  <input type="hidden" name="from_name" value="Nischinto Medical Appoinment" />
                  <input type="hidden" name="replyto" value="custom@gmail.com" />
                  <div id="st-alert1" />
                  <div className="st-section-heading st-style2 text-left">
                    <h2 className="st-section-heading-title">{parser(title)}</h2>
                  </div>
                  <div className="st-height-b35 st-height-lg-b35" />
                  <div className="st-form-field st-style1 st-color1">
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
                  <div className="st-form-field st-style1 st-color1">
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
                  <div className="st-form-field st-style1 st-color1">
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
                  <div className="st-form-field st-style1 st-color1">
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
                  <div className="st-form-field st-style1 st-color1">
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
                  <div className="st-form-field st-style1 st-color1">
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
                  <button
                    className="st-btn st-style1 st-size-medium st-color4"
                    type="submit"
                    id="appointment-submit"
                    name="submit"
                  >
                    {loading ? "Sending..." : "Appointment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="st-right-full-width">
              <div className="st-infobox-wrap text-center">
                <img src={img} alt={img} />
                <div className="st-infobox st-style1 st-type1 st-color2">
                  <div className="st-infobox-text">
                    Monday - Friday: 8:00am - 8:00pm <br />
                    Saturday: 8:00am - 6:00pm
                    <br />
                    Sunday: closed
                  </div>
                  <div className="st-infobox-call">
                    <div className="st-infobox-icon">
                      <Icon icon="fa:phone" />
                    </div>
                    <div className="st-infobox-right">
                      <span>Call Today</span>
                      <h3>{phone}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  )
}

export default Appointment3

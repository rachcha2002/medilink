import React, { useState } from 'react'
import SectionHeading2 from '../SectionHeading/SectionHeading2'

const Contact3 = ({ data, varient }) => {

  const { sectionHeadingData } = data;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
        subject: '',
        msg: ''
      });
      setLoading(false)
    }
  };

  return (
    <section className={`${varient}`} id="contact">
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading2 data={sectionHeadingData} />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div id="st-alert" />
            <form
              onSubmit={onSubmit}
              className="row st-contact-form st-type2"
              method="post"
              id="contact-form"
            >
              <input type="hidden" name="from_name" value="Nischinto Medical" />
              <input type="hidden" name="replyto" value="custom@gmail.com" />
              <div className="col-lg-6">
                <div className="st-form-field st-style1 st-color2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    required
                    onChange={handleInputChange}
                    value={formData.name}
                  />
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-6">
                <div className="st-form-field st-style1 st-color2">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-6">
                <div className="st-form-field st-style1 st-color2">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    required
                    onChange={handleInputChange}
                    value={formData.subject}
                  />
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-6">
                <div className="st-form-field st-style1 st-color2">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    onChange={handleInputChange}
                    value={formData.phone}
                  />
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-12">
                <div className="st-form-field st-style1 st-color1">
                  <textarea
                    cols={30}
                    rows={10}
                    id="msg"
                    name="msg"
                    placeholder="Write something here..."
                    required
                    onChange={handleInputChange}
                    value={formData.msg}
                  />
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-6 offset-lg-3">
                <div className="text-center">
                  <div className="st-height-b10 st-height-lg-b10" />
                  <button
                    className={`st-btn st-style1 st-color4 st-size-medium w-100`}
                    type="submit"
                    id="submit"
                    name="submit"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
              {/* .col */}
            </form>
          </div>
          {/* .col */}
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  )
}

export default Contact3

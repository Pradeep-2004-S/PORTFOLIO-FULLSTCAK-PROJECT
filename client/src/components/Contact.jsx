import { useState } from 'react';
import axios from 'axios';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function Contact({ isActive }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success'|'error', msg: '' }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const res = await axios.post('/api/contact', form);
      if (res.data.success) {
        setAlert({ type: 'success', msg: res.data.message });
        setForm(initialForm);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Something went wrong. Please try again.';
      setAlert({ type: 'error', msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`contact ${isActive ? 'active' : ''}`}>
      <div className="contact-container">
        {/* Info */}
        <div className="contact-box">
          <h2>Let&apos;s Work Together</h2>
          <p className="desc">
            Have a project in mind or just want to say hi? Feel free to reach out — I&apos;d love
            to hear from you!
          </p>

          <div className="contact-detail">
            <i className="bx bxs-phone" />
            <div className="detail">
              <p>Phone</p>
              <p>(+91) 9384494216</p>
            </div>
          </div>

          <div className="contact-detail">
            <i className="bx bxs-envelope" />
            <div className="detail">
              <p>Email</p>
              <p>pradeepp54980@gmail.com</p>
            </div>
          </div>

          <div className="contact-detail">
            <i className="bx bx-map" />
            <div className="detail">
              <p>Address</p>
              <p> India,Tamil Nadu,Tirupattur,Ambur,Mittalam Melur</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-box">
          <div className="contact-form">
            <h2 className="heading">
              Contact <span>Me!</span>
            </h2>

            <div className="field-box">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Email Subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {alert && (
              <div className={`alert ${alert.type}`}>
                {alert.type === 'success' ? '✅ ' : '❌ '}
                {alert.msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(credentials));
  };

  return (
    <div className="register-form-container">
      <div className="register-form-wrapper">
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Full Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={credentials.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              className="form-input"
            />
          </div>

          {/* Email Field */}
          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Email Address:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
              className="form-input"
            />
          </div>

          {/* Password Field */}
          <div className="form-field">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              className="form-input"
            />
          </div>

          {/* Phone Number Field */}
          <div className="form-field">
            <label className="form-label" htmlFor="phone">
              Phone Number:
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={credentials.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
              className="form-input"
            />
          </div>

          {/* Address Field */}
          <div className="form-field">
            <label className="form-label" htmlFor="address">
              Address:
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={credentials.address}
              onChange={handleChange}
              placeholder="Enter Address"
              required
              className="form-input"
            />
          </div>

          {/* Secret Answer Field */}
          <div className="form-field">
            <label className="form-label" htmlFor="answer">
              Secret Answer:
            </label>
            <input
              id="answer"
              name="answer"
              type="text"
              value={credentials.answer}
              onChange={handleChange}
              placeholder="Enter Secret Answer"
              required
              className="form-input"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Register
          </button>

          {/* Status and Error Messages */}
          {status === "loading" && <p className="status-message loading">Registering...</p>}
          {status === "succeeded" && <p className="status-message success">Registration successful!</p>}
          {status === "failed" && <p className="status-message error">Error: {error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

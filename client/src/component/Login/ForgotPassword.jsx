// src/Components/Login/ForgotPassword.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/authSlice'; // Import the forgotPassword thunk

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth); // Access status and error from Redux state

  // Form state for email, answer, and new password
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'answer') setAnswer(value);
    if (name === 'newPassword') setNewPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the forgotPassword thunk with the required data
    dispatch(forgotPassword({ email, answer, newPassword }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="email">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
          </div>

          {/* Answer Input */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="answer">
              Secret Answer:
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={answer}
              onChange={handleChange}
              placeholder="Enter your secret answer"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
          </div>

          {/* New Password Input */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="newPassword">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {/* Status/Error Messages */}
        {status === 'succeeded' && (
          <p className="text-green-500 text-center mt-4">
            Your Password is reset Successfully
          </p>
        )}
        {status === 'failed' && (
          <p className="text-red-500 text-center mt-4">
            {error || 'Something went wrong. Please try again.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

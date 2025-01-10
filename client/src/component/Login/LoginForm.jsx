import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../redux/authSlice";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [info, setInfo] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email) newErrors.email = "Email is required.";
    if (!credentials.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(login(credentials));
      setInfo(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  useEffect(() => {
    if (info) setTimeout(() => setInfo(false), 1500);
  }, [info]);

  if (auth.accessToken)
    return (
      <div className="centered-container">
        <button className="logout-button" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    );

  return (
    <div className="login-form-container">
      <h2 className="login-form-heading">Log in to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-field">
          <label htmlFor="email" className="login-form-label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
            className={`login-form-input ${
              errors.email ? "error" : ""
            }`}
          />
          {errors.email && <p className="login-form-error-text">{errors.email}</p>}
        </div>

        <div className="login-form-field">
          <label htmlFor="password" className="login-form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            className={`login-form-input ${
              errors.password ? "error" : ""
            }`}
          />
          {errors.password && (
            <p className="login-form-error-text">{errors.password}</p>
          )}
        </div>

        <button type="submit" className="login-form-button">
          Log In
        </button>
        <button
          type="button"
          className="login-form-forgot-button"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
      </form>

      <div className="login-form-additional-info">
        <p>
          Don't have an account?{" "}
          <span
            className="link"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>

      {info && (
        <div className="login-form-error-message">
          {auth.error || "An error occurred. Please try again."}
        </div>
      )}
      {auth.status === "loading" && (
        <div className="login-form-loading-message">Logging in...</div>
      )}
    </div>
  );
};

export default LoginForm;

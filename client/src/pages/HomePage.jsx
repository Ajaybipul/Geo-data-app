import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FileUpload from "../component/FileUpload";
import Map from "../component/Map";
import { logout } from "../redux/authSlice";

const HomePage = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleFileUpload = (fileContent) => {
    setGeojsonData(fileContent);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: "auto" }}>Geo Data App</h2>
      </div>

      {/* Auth Section */}
      <div style={styles.authButtonsContainer}>
        {auth.accessToken ? (
          <>
            <span style={styles.userName}>Hello, {auth.user?.name || "Ajay"}</span>
            <button style={styles.authButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button style={styles.authButton}>Login</button>
          </Link>
        )}
      </div>

      {/* Main Content */}
      <div style={{ marginTop: "60px" }}>
        <FileUpload onFileUpload={handleFileUpload} />
        <Map geojsonData={geojsonData} />
      </div>
    </div>
  );
};

const styles = {
  authButtonsContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  authButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  userName: {
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: "10px",
  },
};

export default HomePage;

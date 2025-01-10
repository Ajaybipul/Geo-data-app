import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./component/Login/ForgotPassword";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  </Router>
);

export default App;

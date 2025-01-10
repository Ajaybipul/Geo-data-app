import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../component/Login/LoginForm";
import RegisterForm from "../component/Login/RegisterForm";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay */}
      <div className="relative flex items-center justify-center h-full px-4 py-8">
        <div className="max-w-lg w-full p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome to Our Platform
          </h1>

          {/* Tab Buttons */}
          <div className="flex mb-6 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-lg font-medium transition ${
                activeTab === "login"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 text-lg font-medium transition ${
                activeTab === "register"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form Content */}
          <div className="mt-4">
            {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
          </div>

          {/* Go Back Button */}
          <p
            className="text-center mt-6 text-blue-500 font-medium cursor-pointer hover:text-blue-700 transition"
            onClick={() => navigate("/")}
          >
            &larr; Back to Home
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

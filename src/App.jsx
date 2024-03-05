// Import necessary modules
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import About from "./components/about.jsx";
import Layout from "./components/layout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./components/main.jsx";



// Define your main App component
function App() {
  return (
    <>
    <ToastContainer />

    <Router>

      {/* Other routes */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/home" element={<Home/>} />



        
        


        {/* Other routes */}
      </Routes>
    </Router>
    </>
  );
}

export default App;

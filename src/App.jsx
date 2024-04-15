// Import necessary modules
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import About from "./components/about.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./components/main.jsx";
import Profile from "./components/Profile.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";
import ReadStories from "./components/readStories.jsx";
import Explore from "./components/Explore.jsx";
import MyStories from "./components/MyStories.jsx";
import ShareStories from "./components/shareStories.jsx";
import "./style/normalize.css"
import Hero from "./components/heroSection.jsx";
import ContactForm from "./components/contact.jsx";




// Define your main App component
function App() {
  return (
    <>

    <ToastContainer />

    <Router>

      {/* Other routes */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Hero />} /> 
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/delete" element={<DeleteAccount/>} />
        <Route path="/read" element={<ReadStories/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/share" element={<ShareStories/>} />
        <Route path="/hero" element={<Hero/>} />

        <Route path="/contact" element={<ContactForm/>} />




        <Route path="/my_stories" element={<MyStories/>} />








        
        


      </Routes>
    </Router>

    </>
  );
}

export default App;

import React from 'react';
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import bo from "../assets/bo.avif";


const Hero = () => {
  return (
    <>
      <nav className="bg" style={{ backgroundColor: '#092424' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-16">
                <NavLink to="/" className="flex items-center text-white">
                  <img src={logo} alt="logo" className="h-10 w-10 rounded-full mr-2" />
                  <span className="font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-wide transition duration-300 hover:text-gray-200">StoryCraftHub</span>
                </NavLink>
              </div>


            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 text-white">
                <NavLink to="/about" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-800" className="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</NavLink>
                <NavLink to="/contact" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-800" className="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact Us</NavLink>
                <NavLink to="/login" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-800" className="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login/Register</NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-fixed bg-no-repeat bg-center bg-cover h-screen relative overflow-x-hidden" style={{ backgroundImage: `url(${bo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="h-screen bg-opacity-50 bg-black flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="mx-2 text-center">
            <h1 className="text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl">
              <span className="text-white">Welcome</span> to <span className="text-white">StoryCraftHub</span>
            </h1>
            <h2 className="text-gray-200 font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight">
              Unleash Your Imagination with Captivating Storytelling
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-3xl mx-auto">
              StoryCraftHub is your platform to share, explore, and craft captivating stories. Whether you're an aspiring writer, a seasoned author, or simply love to read, discover a world of compelling narratives waiting for you.
            </p>
            <div className="inline-flex mt-8">
              <NavLink to="/register">
                <button className="p-4 mx-2 bg-green-500 hover:bg-green-600 font-bold text-white rounded-lg shadow-md transition duration-500 md:text-xl">Start Your Journey</button>
              </NavLink>
              <a href="#about">
                <button className="p-4 mx-2 bg-transparent border-2 border-green-500 hover:bg-green-500 hover:text-white font-bold text-green-500 rounded-lg shadow-md transition duration-500 md:text-lg">Learn More</button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Hero;

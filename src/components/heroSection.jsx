import React from 'react';
import MainNavbar from './Navigation/MainNavbar';

const Hero = () => {
  return (
    <>
      <MainNavbar />
      <header id="up" className="bg-fixed bg-no-repeat bg-center bg-cover h-screen relative overflow-x-hidden" style={{ backgroundImage: "url('https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')" }}>
        <div className="h-screen bg-opacity-50 bg-black flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="mx-2 text-center">
            <h1 className="text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl">
              <span className="text-white">Right</span> Place To
            </h1>
            <h2 className="text-gray-200 font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight">
              Get an <span className="text-white">Experience</span> compelling <span className="text-white">storytelling</span> Design
            </h2>
            <div className="inline-flex">
              <button className="p-2 my-5 mx-2 bg-[#548341] hover:bg-[#548341] font-bold text-white rounded border-2 border-transparent hover:border-[#548341] shadow-md transition duration-500 md:text-xl">Hire US!</button>
              <a href="#about"><button className="p-2 my-5 mx-2 bg-transparent border-2 bg-indigo-200 bg-opacity-75 hover:bg-opacity-100 border-[#548341] rounded hover:border-[#548341] font-bold text-[#548341] shadow-md transition duration-500 md:text-lg">Learn More</button></a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Hero;

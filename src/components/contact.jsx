import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import com from "../assets/comc.webp";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your logic to handle form submission, like sending the data to the server
        console.log(formData);
        // Reset the form after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className='min-h-screen min-w-screen'>
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
                                <NavLink to="/" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-800" className="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='w-full min-h-screen flex items-center justify-center' style={{ backgroundImage: `url(${com})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 ">
            <div className="mb-4 w-full">
    <label htmlFor="name" className="block text-white font-bold mb-2"style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>Name :</label>
    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your name" required />
</div>
<div className="mb-4">
    <label htmlFor="email" className="block text-white font-bold mb-2"style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>Email :</label>
    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" required />
</div>
<div className="mb-6 w-96">
    <label htmlFor="message" className="block text-white font-bold mb-2"style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>Message :</label>
    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your message" required></textarea>
</div>
      </form>
            </div>
        </div>
    );
};

export default ContactForm;

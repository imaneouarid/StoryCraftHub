import React, { useState, useEffect } from 'react';
import axios from 'axios';
import preloader from "../assets/bio_preloader.gif";
import profPicPreloader from "../assets/pic_preloader.gif";
import storiesPreloader from "../assets/main.gif";
import defaultCover from "../assets/about.png";
// import "../style/profile.css";

import { useNavigate } from 'react-router-dom';
import MainNavbar from './Navigation/MainNavbar';


const Profile = () => {
  const currentUser = localStorage.getItem('UserID');
  const [userData, setUserData] = useState(null);
  const [userStories, setUserStories] = useState([]); // Define userStories state
  const [showStories, setShowStories] = useState(false);
  const [showInterests, setShowInterests] = useState(false);


  const navigate = useNavigate()

  console.log(currentUser);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${currentUser}`);
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/stories/${currentUser}`);

        setUserStories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserStories();
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }
  const handleDeleteAccount = () => {
    navigate("/delete");


  }
  

  const {
    username,
    email,
    coverImg,
    userImg,
    bio,
    joinDate,
    firstName,
    lastName,
    interests,
    stories,
  } = userData;
  const toggleInterests = () => {
    setShowInterests(!showInterests);
    setShowStories(false);
  };

  const toggleStories = () => {
    setShowStories(!showStories);
    setShowInterests(false);
  };

  return (
    <section className='profile_sect'>
      <MainNavbar />
      <div className='main_div'>
  <div className='cover_div'>
    <img src={defaultCover} className="cover_pic" alt="Cover Image" />
  </div>
  <div className="user_card flex justify-between items-left p-5 bg-gray-100 rounded-lg w-1/2 mx-2">
    <div className="user_info flex items-center">
      <img src={defaultCover} alt="User Image" className="user_img w-20 h-20 rounded-full mr-5" />
      <div className="user_bio">
        {bio ? (
          <p className="text-gray-700">{bio}</p>
        ) : (
          <p className="text-gray-700">No bio created.</p>
        )}
      </div>
    </div>
    <div className="user_details">
      <div className="user_name mb-3">
        <p className="text-xl font-bold">{firstName} {lastName}</p>
        <p className="text-gray-600">@{username}</p>
      </div>
      <div className="account_actions">
        <p className="text-gray-600">Joined: {joinDate}</p>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md mt-3" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  </div>
</div>
<div className="interests_stories_container mt-5 flex">
  <div className="interests_container mx-5">
    <button className="section_button bg-white border-2  border-green-800 text-black px-6 py-3 rounded-md shadow-md  hover:bg-green-700 transition-colors duration-300" onClick={toggleInterests}>Interests</button>
    <div className={`interests_list mt-2 ${showInterests ? 'block' : 'hidden'}`}>
    {interests.map((interest, index) => (
        <div key={index} className="flex items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
          </svg>
          <p>{interest}</p>
        </div>
      ))}
    </div>
  </div>
  <div className="stories_container mx-5">
    <button className="section_button bg-white  border-2  border-green-800 text-black px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition-colors duration-300" onClick={toggleStories}> My Stories</button>
    <div className={`stories_list mt-2 ${showStories ? 'block' : 'hidden'}`}>
      {userStories.map((story) => (
        <div key={story._id} className="story mt-3 border-b pb-3">
          <h4 className="text-lg font-bold">{story.title}</h4>
          <p className="text-white">{story.content}</p>
        </div>
      ))}
    </div>
  </div>
</div>


    </section>
  );
};

export default Profile;
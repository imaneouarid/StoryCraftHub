import React, { useState, useEffect } from 'react';
import axios from 'axios';
import preloader from "../assets/bio_preloader.gif";
import profPicPreloader from "../assets/pic_preloader.gif";
import storiesPreloader from "../assets/main.gif";
import defaultCover from "../assets/about.png";
import "../style/profile.css";

import { useNavigate } from 'react-router-dom';
import MainNavbar from './Navigation/MainNavbar';


const Profile = () => {
  const currentUser = localStorage.getItem('UserID');
  const [userData, setUserData] = useState(null);
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
        const response = await axios.get(`/user/stories`);
        setUserStories(response.data.stories);
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
    dateJoined,
    firstName,
    lastName,
    interests,
    stories,
  } = userData;

  return (
    <section className='profile_sect'>
      <MainNavbar />
      <div className='main_div'>
        <div className='cover_div'>
          <img src={defaultCover} className="cover_pic" alt="Cover Image" style={{ width: '100%' }} />
        </div>
        <div className="user_card">
          <div className="user_card_div">
            <div className="user_img">
              <img src={defaultCover} alt="User Image" style={{ width: '150px', borderRadius: '50%' }} />
            </div>
            <div className="bio">
              {bio ? (
                <p>{bio}</p>
              ) : (
                <p>No bio created.</p>
              )}
            </div>
          </div>

          <div className="profile_username_div main_profile_username_div">
            <div className="acc_details">
              <div className="date_joined_div">
                <p className="date_joined"> Joined: {dateJoined}</p>
              </div>

              <button className="delete_story_btn delete_acc_btn" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>
          <div className="profile_names_div">
          <div>
            <p className="username_span_para">
              <span className="username_span">{firstName} <span className="username_span"> {lastName}</span> </span></p>
            <p className="profile_username">({username})</p>
          </div>
          </div>
        </div>

        
        <div>
          <h3>{username}'s Interests</h3>
          {interests.map((interest) => (
            <p key={interest}>{interest}</p>
          ))}
        </div>
        <div>
          <h3>{username}'s Stories</h3>
          {userStories.map((story) => (
            <div key={story._id}>
              <h4>{story.title}</h4>
              <p>{story.content}</p>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default Profile;









  {/* Stories */}
        {/* <div>
        <h3>{username}'s Stories</h3>
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story.id}>
              <h4>{story.title}</h4>
              <p>{story.content}</p>
            </div>
          ))
        ) : (
          <p>No stories published by this author.</p>
        )}
      </div> */}
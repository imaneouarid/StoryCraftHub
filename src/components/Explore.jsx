import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainNavbar from './Navigation/MainNavbar';
import logo from "../assets/logo.png";
import "../style/read.css";
import preloader from "../assets/main.gif";
import axios from "axios";

const Explore = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // handle fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/stories");
        console.log(response.data)
        setStories(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
        setLoading(false);
      }
    };
    fetchStories();
  }, []);
console.log("stories",stories[5]?.topics);
  return (
    <section className="explore_sect">
      <MainNavbar />
      <header className="login_header">
        <nav>
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </nav>
      </header>
      <div>
        <>
          <p className="explore_intro">Explore</p>
          <div className="all_stories">
            {loading && (
              <div className="main_preloader">
                <img
                  src={preloader}
                  alt="preloader"
                  className="main_preloader_img"
                />
              </div>
            )}
            {error && <p className="error">{error.message}</p>}
            {stories && stories?.map((story) => {
    return <div key={story._id} className="story-card">
            <div className="card-content">
            { story?.topics?.map((topic,index) => {
             return <span className="hi" key={index}>  {topic} |   </span>

            }) } 

                 <h1 className="authorh"> {story.title}  created by {story.isAnonymous==true ? "Anonyme" : story.author?.username }  </h1>
                 {/* <p>Author: {story.author}</p> */}
                 <p>Content : {story.content} </p>
                 <p>Date: {story.createdDate}</p>
              </div> 
  </div>;
})}
          </div>
        </>
      </div>
    </section>
  );
};

export default Explore;

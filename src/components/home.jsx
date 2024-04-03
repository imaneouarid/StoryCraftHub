import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import logo from "../assets/logo.png";
import preloader from "../assets/base_preloader.gif";
import "../style/home.css";
import MainNavbar from "./Navigation/MainNavbar";

// home page button options
const btnOptions = [
  "Fiction", "Non-Fiction", "Romance", "Thriller", "Who-done-it", "Historical", "Western", "Fantasy", "Paranormal", "Sci-Fi", "Food", "Fashion", "Mystery", "Horror", "Adventure", "Dystopian", "Young Adult", "Children's", "Coming of Age", "Folklore", "Poetry", "Technology", "Art", "Music", "Books", "Education", "Philosophy", "Psychology", "Society", "Environment", "Economics", "Crafts", "Gardening", "Home Improvement", "Travel", "Self-Help", "Health", "Fitness", "Biography", "Memoir", "Politics", "Religion", "Sports", "Entertainment", "Other"
];

const Home = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [loadInterests, setLoadInterests] = useState(true);

  const showToastMessage = () => {
    toast.error(`Please select at least one interest to continue.`, {
      position: toast.POSITION.TOP_RIGHT,
      className: "error_toast",
    });
  };

  const handleClick = (interest) => {
    setInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((item) => item !== interest);
      } else {
        return [...prevInterests, interest];
      }
    });
  };

  useEffect(() => {
    if (interests.length) {
      const updateInterests = async () => {
        const foundId = localStorage.getItem("UserID");

        try {
          const response = await axios.put(`http://localhost:3000/users/${foundId}`, {
            interests: interests,
          });
          console.log(response.data);
          setLoadInterests(false);
        } catch (err) {
          console.log(err);
          // Handle error
        }
      };
      updateInterests();
    }
  }, [interests]);

  const nextPageOption = () => {
    if (interests.length) {
      navigate("/main");
    } else {
      showToastMessage();
    }
  };

  return (
    <section className="home_sect">
      <MainNavbar />
      <header className="login_header">
        <nav>
          <Link to="/" className="home_logo_link">
            <img src={logo} alt="logo" className="home_logo" />
          </Link>
        </nav>
      </header>
      <div className="home_main_div">
        <p className="welcome">Welcome!</p>
        <br />
        <p className="interests home_interests">
          Customize your account. Select the topics that interest you below.
          What do you like reading and/or writing about?
        </p>
        <div className="home_main_div_btns">
          {btnOptions.map((btn, index) => (
            <button
              key={index}
              className={`home_main_div_btns_btn ${
                interests.includes(btn) ? "active" : ""
              }`}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      {loadInterests ? (
        <div className="preloader_div">
          <img
            src={preloader}
            alt="preloader"
            className="preloader home_preloader"
          />
        </div>
      ) : (
        <div className="next_btn_div">
          <button>
            <span className="next_btn" onClick={nextPageOption}>
              Next
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Home;




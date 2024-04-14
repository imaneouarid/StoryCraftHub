import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MainNavbar from "./Navigation/MainNavbar";
import logo from "../assets/logo.png";
import "../style/share.css";
import preloader from "../assets/submit.gif";
import axios from "axios";

const ShareStories = () => {
  // State variables
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [author, setAuthor] = useState(localStorage.getItem("UserID")); 
  const [response, setResponse] = useState("");
  const [titleResponse, setTitleResponse] = useState("");
  const [storyResponse, setStoryResponse] = useState("");
  const [genreResponse, setGenreResponse] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);
  const genresList = [
    "Adventure", "Art", "Biography", "Books", "Children's", "Coming of Age",
    "Crafts", "Dystopian", "Economics", "Education", "Entertainment", "Environment",
    "Fantasy", "Fashion", "Fiction", "Fitness", "Folklore", "Food", "Gardening",
    "Health", "Historical", "Home Improvement", "Horror", "Memoir", "Music",
    "Mystery", "Non-Fiction", "Other", "Paranormal", "Philosophy", "Poetry",
    "Politics", "Psychology", "Religion", "Romance", "Sci-Fi", "Self-Help",
    "Society", "Sports", "Technology", "Thriller", "Travel", "Western",
    "Who-done-it", "Young Adult"
  ];

  // Manage error responses
  useEffect(() => {
    setResponse("");
    setTitleResponse("");
    setStoryResponse("");
    setGenreResponse("");
  }, [title, story, genres]);

  // Capitalize sentences and acknowledge paragraphs
  const capitalize = (str) => {
    if (str.length === 0) {
      return str;
    } else if (str.length >= 1) {
      if (!str.includes(".") && !str.includes("?") && !str.includes("!")) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      } else {
        return str.replace(/(.+?)([.?!]\s|$)/g, (match, p1, p2) => {
          return p1.charAt(0).toUpperCase() + p1.slice(1) + p2;
        });
      }
    }
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    const genreDiv = document.querySelector(".genre_checkboxes");
    genreDiv.classList.toggle("visible");
  };

  // Handle genre selection
  const handleClick = (e) => {
    e.preventDefault();
    e.target.classList.toggle("selected");
    if (genres.includes(e.target.innerText)) {
      const index = genres.indexOf(e.target.innerText);
      genres.splice(index, 1);
    } else {
      genres.push(e.target.innerText);
      setGenres([...genres]); 
    }

    if (genres.length > 0) {
      setGenreResponse("");
    }

    if (genres.length >= 3) {
      const genreBtns = document.querySelectorAll(".genre_btn");
      genreBtns.forEach((btn) => {
        if (!btn.classList.contains("selected")) {
          btn.disabled = true;
        }
      });
    } else {
      const genreBtns = document.querySelectorAll(".genre_btn");
      genreBtns.forEach((btn) => {
        btn.disabled = false;
      });
    }
  };

  // Handle author radio input
 // Handle author radio input
const handleAuthor = (e) => {
  const value = e.target.value;
  console.log("Radio input value:", e.target.value);

  if (value === "Anonymous") {
    setAuthor("Anonymous");
  } else {
    setAuthor(localStorage.getItem("UserID"));
  }
};

  // Show toast message
  const showToastMessage = (message) => {
    toast.success(message, {
      position: 'top-right',
      className: "toast-message",
    });
  };

  // Reset genres after story is submitted
  const resetGenres = () => {
    setGenres([]);
    const genreBtns = document.querySelectorAll(".genre_btn");
    genreBtns.forEach((btn) => {
      btn.classList.remove("selected");
      btn.disabled = false;
    });
  };

  // Handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const paragraphs = story.split("\n").map((paragraph) => paragraph.trim());

    const storyData = {
      title: title,
      content: paragraphs.join("\n"),
      author: author === "Anonymous" ? null : author,
      isAnonymous: author === "Anonymous", 
      topics: genres,
    };

    if (title.length < 2) {
      setTitleResponse("Your title is too short. Please try again");
      document.querySelector(".title_input").focus();
      return;
    } else if (genres.length === 0) {
      setGenreResponse("Please select at least one genre");
      document.querySelector(".genre_selection_btn").focus();
      return;
    } else if (story.length < 20) {
      setStoryResponse("Your story is too short. Please try again");
      document.querySelector(".story_textarea").focus();
      return;
    }

    setLoadSubmit(true);
    try {
      console.log("data :",storyData)
      const response = await axios.post("http://localhost:3000/stories/create", storyData);
      console.log(response);
      setTitle("");
      setStory("");
      setAuthor(JSON.parse(localStorage.getItem("Usename")));
      resetGenres();
      window.scrollTo(0, 0);
      showToastMessage(response.data);
    } catch (error) {
      if (!error.response) {
        setResponse("No server response");
      } else if (error.response.status === 401) {
        setResponse("Unauthorized");
        alert("Unauthorized. Please log in again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else if (error.response.status === 400) {
        setResponse(error.response.data.message);
      } else {
        setResponse("Something went wrong. Please try again");
      }
    }
    setLoadSubmit(false);
  };

  return (
    <section className="share_stories_sect">
      <MainNavbar />
      <header className="login_header">
        <nav>
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </nav>
      </header>
      <h2 className="share_title">
        Share your story with us and we will share it with the world
      </h2>
      <div className="intro_sect">
        <h4>Just a few exceptions to consider...</h4>
        <ul>
          <li>We check the stories for plagiarism...</li>
          <li>While adding your stories to different genres...</li>
          <li>Try to vary the titles of your stories...</li>
        </ul>
      </div>
      <div className="share_stories_div">
        <form className="share_stories_form" onSubmit={handleSubmit}>
          <div className="story_title_div">
            {/* Title input */}
            <p className="response">{titleResponse}</p>
            <label htmlFor="title" className="hide_label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title_input"
            />
          </div>
          <div className="author_radio">
            {/* Radio input for author */}
            <p className="select_author">
              <strong>
                Publish your story as{" "}
                <span className="publish_opt">Yourself</span> or as an{" "}
                <span className="publish_opt"> Anonymous</span> author?
              </strong>
            </p>
            <div className="radio_inputs">
              <div className="individual_author_input">
              <input
                  type="radio"
                  name="author"
                  id="author"
                  value={localStorage.getItem("UserID")}
                  checked={author === localStorage.getItem("UserID")}
                  onChange={handleAuthor}
                />
                <label htmlFor="owner">
                  {(localStorage.getItem("Usename"))}
                </label>
              </div>
              <div className="individual_author_input">
                <input
                  type="radio"
                  name="author"
                  id="author"
                  value="Anonymous"
                  checked={author === "Anonymous"}
                  onChange={handleAuthor}
                />
                <label htmlFor="anonymous">Anonymous</label>
              </div>
            </div>
          </div>
          <div className="genre_popup">
            <p className="select_genres">
              <strong>Choose a maximum of 3 genre(s) for your story</strong>
            </p>
            <p className="response">
              <strong>{genreResponse}</strong>
            </p>
            <button className="genre_selection_btn" onClick={handleBtnClick}>
              Toggle Genre Selection
            </button>
            <div className="genre_checkboxes visible">
              <div className="genre_btns">
                {genresList.map((btn, index) => {
                  return (
                    <button
                      key={index}
                      className="genre_btn"
                      onClick={handleClick}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="response">
            <strong>{storyResponse}</strong>
          </p>
          <div className="story_textarea_div">
            <label htmlFor="story" className="hide_label">
              Story
            </label>
            <textarea
              type="text"
              name="story"
              id="story"
              rows="20"
              className="story_textarea"
              placeholder="Tell me a story..."
              required
              value={story}
              onChange={(e) => setStory(capitalize(e.target.value))}
            ></textarea>
          </div>
          <p className="publish_response">
            <strong>{response}</strong>
          </p>
          <div className="story_submit_div">
            <button type="submit" className="share_btn " onClick={handleSubmit}>
              <span>Publish</span>
              {loadSubmit && (
                <span className="preloader_span">
                  <img src={preloader} alt="preloader" />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ShareStories;

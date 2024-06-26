import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";



import "../../style/navbar.css";
import logo from "../../assets/logo.png";
import { useCookies } from "react-cookie";

const MainNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);




  useEffect(() => {
    const activeLink = document.querySelector(".active");
    if (activeLink) {
      activeLink.classList.remove("active");
      activeLink.classList.add("activated");
    }

  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();

    removeCookie("accessToken");

   navigate("/");
  };


  const handleToggle = () => {
    const toggle = document.getElementById("toggle");
    const toggler = document.getElementById("main_nav");
    toggle.classList.toggle("nav_active");
    toggler.classList.toggle("nav_active");
  };

  // handle submit and navigate to the search bar name
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/search/${
        username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
      }`
    );
    setUsername("");

    // close toggle
    const toggle = document.getElementById("toggle");
    const toggler = document.getElementById("main_nav");
    toggle.classList.toggle("nav_active");
    toggler.classList.toggle("nav_active");
  };

  return (
    <header className="main_navbar ">
      <nav id="main_nav">
        <Link to="/" className="nav_logo_link">
          <img src={logo} alt="logo" className="nav_logo" />
        </Link>
        <ul>
          {/* search bar */}
          <div>
            <li className="main_navbar_search">
              <form className="search_form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search for users"
                  className="nav_search_input"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value.trim())}
                />
                <button type="submit" className="nav_search_btn">
                  <BsSearch className="nav_search_icon" />
                </button>
              </form>
            </li>
          </div>
          <div className="main_nav_li">
            {/* home page */}
            <li className="main_navbar_list">
              <NavLink to="/home" className="main_link">
                Home
              </NavLink>
            </li>

            {/* about page */}
            <li className="main_navbar_list">
              <NavLink to="/about" className="main_link">
                About
              </NavLink>
            </li>

            {/* read stories page */}
            <li className="main_navbar_list">
              <NavLink to="/read" className="main_link">
                Read
              </NavLink>
            </li>

            {/* share stories page */}
            <li className="main_navbar_list">
              <NavLink to="/share" className="main_link">
                Share
              </NavLink>
            </li>
            <li className="main_navbar_list">
              <NavLink to="/profile" className="main_link">
                Profile
              </NavLink>
            </li>

            {/* logout page */}
            <li className="main_navbar_list logout_nav_btn">
              {/* <Logout /> */}
            </li>
            <li>
            <button onClick={handleLogout} className="logout-btn text-red-600">
              <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600" /> Logout
            </button>
          </li>
          </div>
         
        </ul>
      </nav>
      <div id="toggle" onClick={handleToggle}></div>
    </header>
  );
};

export default MainNavbar;

import React, { useState, useEffect } from "react";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import logo from "../assets/logo.png";
import preloader from "../assets/submit.gif";
// import "../Authentication/register_login.css";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [Email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);

  useEffect(() => {
    setResponse("");
  }, [firstName, Email, userName, password, confirmPassword]);

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName.length < 3  || userName.length < 3) {
      setResponse(
        "First name,  and username must be at least 3 characters long"
      );
      return;
    } else if (!PWD_REGEX.test(password)) {
      setResponse(
        "Password must be 8-24 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    } else if (password !== confirmPassword) {
      setResponse("Passwords do not match");
      return;
    }

    setLoadSubmit(true);

    try {
        const response = await axios.post("http://localhost:3000/users/register", {
            username: userName,
            email: Email,
            password: password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          showToastMessage(response); // Pass the server response to showToastMessage
      setFirstName("");
      setEmail("");
      setUserName("");
      setPassword("");
      setConfirmPassword("");
    //   showToastMessage();
      navigate("/login", { replace: true });
    } catch (error) {
      if (!error.response) {
        setResponse("No response from the server");
      } else {
        setResponse(error.response.data.message);
      }
    }

    setLoadSubmit(false);
  };

  const showToastMessage = () => {
    toast.success(`Registration successful 🤝 Please log in to continue.`, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
    });
  };

  return (
    <section className="registration">
      <header className="login_header">
        <nav>
          <img src={logo} alt="logo" className="register_login_logo" />
          <ul>
            <li>
              <NavLink to="/about" className="link register_link">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="link register_link">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="login_sect">
        <form className="register_form" onSubmit={handleSubmit}>
          <div>
            <h2 className="response">{response}</h2>
          </div>
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="label">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              autoComplete="off"
              placeholder="Enter your first name"
              value={firstName}
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="label">
              Email
            </label>
            <input
              type="email"
              name="Email"
              id="Email"
              autoComplete="off"
              placeholder="EnterEmail"
              value={Email}
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* User Name */}
          <div>
            <label htmlFor="username" className="label">
              User Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              placeholder="Select your username"
              value={userName}
              className="input"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              className="input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {/* Submit Button */}
          <div className="story_submit_div">
            <button type="submit" className="submit">
              <span>Register</span>
              {/* Preloader Span */}
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

export default Register;

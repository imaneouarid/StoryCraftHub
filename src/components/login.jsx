import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import logo from "../assets/logo.png";
import preloader from "../assets/submit.gif";
import { useCookies } from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [cookies,setCookies]= useCookies (["accessToken"])



  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setResponse("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadSubmit(true);

    try {

      const response = await axios.post(
        "http://localhost:3000/users/login",
        {
          email:email,
          password: password,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setResponse(response.data.message);
          console.log("Email:", email);
         console.log("Password:", password);
         console.log("Response from server:", response.data);
console.log("Status:", response.status);
console.log("username:",response.data.username);


    
          setCookies("access_token", response.data.accessToken);
          window.localStorage.setItem('UserID', response.data.id);
          window.localStorage.setItem('Usename', response.data.username);


          showToastMessage(response);

          console.log(response);
          navigate('/home')

          
        } catch (error) {
            if (!error.response) {
                setResponse(error.message);
              } else if (error.response.status === 401) {
                setResponse("email or password is incorrect");
              }  else if (error.response.status === 404) {
                setResponse("User not found");
              } else {
                setResponse(error.message);
              }        }
    
        setLoadSubmit(false);
      };

    



const showToastMessage = () => {
    toast.success(`Welcome user 😃`, {
        position: 'top-right',
        className: 'toast-message',
    });
  }
  

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
              <NavLink to="/register" className="link register_link">
                Register
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
          <div>
            <label htmlFor="email" aria-hidden="false" className="label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              className="input"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" aria-hidden="false" className="label">
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
          <div className="devise_container">
            <input
              type="checkbox"
              name="persist"
              id="persist"
              checked={false}
              onChange={() => {}}
              className="devise-checked"
            />
            <label htmlFor="persist" className="devise">
              Trust this device
            </label>
          </div>
          {/* submit */}
          <div className="story_submit_div">
            <button type="submit" className="submit">
              <span>Login</span>
              {/* preloader span */}
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

export default Login;


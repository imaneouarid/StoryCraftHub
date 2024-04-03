import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainNavbar from "./Navigation/MainNavbar";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios directly

import "../style/profile.css";
import preloader from "../assets/submit.gif";

const DeleteAccount = () => {
  const { username } = useParams();
  const navigate = useNavigate()
  const [loadSubmit, setLoadSubmit] = useState(false); // to show preloader when submit button is clicked

  // Function to handle account deletion
  const deleteAccount = async () => {
    try {
      // Display preloader while the request is being made
      setLoadSubmit(true);

      // Send DELETE request to delete user account
      const response = await axios.delete(`/api/users/${username}`);

      // Display success message
      toast.success(response.data.message);

      // Clear local storage and navigate to login page
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      // Display error message if request fails
      toast.error(err.response?.data?.message || "Failed to delete account");

      // Hide preloader on error
      setLoadSubmit(false);
    }
  };

  return (
    <section className="delete_acc_sect">
      <MainNavbar />
      <div className="delete_acc_main">
        <p className="sad_emoji">🥺</p>
        <p className="goodbye">We're sorry to see you go...</p>
        <p className="goodbye_text">
          All your data will be deleted from our database (except anonymous
          stories). If you published any stories with us, we advise you to
          back them up just in case you need to use them in the future.
        </p>
        <div>
          <button
            className="delete_account_permanently"
            onClick={deleteAccount}
            disabled={loadSubmit} // Disable button while the request is being made
          >
            <span>Delete Account Permanently</span>
            {loadSubmit && (
              <span className="preloader_span">
                <img src={preloader} alt="preloader" />
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteAccount;

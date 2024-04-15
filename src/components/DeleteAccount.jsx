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
  const [loadSubmit, setLoadSubmit] = useState(false); 

  const deleteAccount = async () => {
    try {
      setLoadSubmit(true);

      const response = await axios.delete(`http://localhost:3000/users/${username}`);

      toast.success(response.data.message);

      localStorage.clear();
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");

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
            disabled={loadSubmit} 
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

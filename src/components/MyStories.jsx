import React, { useState, useEffect } from "react";
import axios from "axios";
import MainNavbar from "./Navigation/MainNavbar";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import istoImage from "../assets/isto.jpg"; 


const MyStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = localStorage.getItem('UserID');

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/stories/user/${currentUser}`);
        if (response.data && response.data.stories) {
          setStories(response.data.stories);
        } else {
          setStories([]);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching stories");
        setLoading(false);
      }
    };

    fetchUserStories();
  }, [currentUser]);

  const handleDelete = async (storyId) => {
    try {
      setStories(prevStories => prevStories.filter(item => item._id !== storyId));
    } catch (error) {
      console.error(error);
      setError("Error deleting story");
    }
  };

 

  return (
    <div>
      <MainNavbar />
      <div className=" min-h-screen" style={{ backgroundImage: `url(${istoImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-4xl font-bold text-center text-slate-900 mb-8">Welcome to Your Stories</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && stories.length === 0 && <p className="text-white text-center text-xl text font-bold  shadow-xl  rounded-lg "> No stories found ,Go and share with us ur creativity  .</p>}
        {!loading && stories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story._id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold mb-2">{story.title} by me </h2>
                <p className="text-gray-600">{story.content}</p>
                <div className="mt-4 flex justify-between">
                  <span className="text-gray-500">{new Date(story.createdDate).toDateString()}</span>
                  <div>
                    <button >
                      <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                    </button>
                    <button onClick={() => handleDelete(story._id)}>
                      <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStories;

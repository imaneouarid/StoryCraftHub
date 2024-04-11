import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyStories = () => {
  const [stories, setStories] = useState([]);
  
  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/stories/${userId}`);
        setStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching user stories:', error);
        // Handle error
      }
    };

    fetchUserStories();
  }, []); // Fetch stories when component mounts

  const handleDeleteStory = async (storyId) => {
    try {
      // await axios.delete(`http://localhost:3000/stories/deleteStory/${storyId}`);
      setStories(stories.filter(story => story._id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  const handleUpdateStory = (storyId) => {
   console.log('hiii');
  };

  return (
    <div>
      <h2>My Stories</h2>
      {stories.map(story => (
        <div key={story._id}>
          <h3>{story.title}</h3>
          <p>{story.content}</p>
          <button onClick={() => handleDeleteStory(story._id)}>Delete</button>
          <button onClick={() => handleUpdateStory(story._id)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default MyStories;

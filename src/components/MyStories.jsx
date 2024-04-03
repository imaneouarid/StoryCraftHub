import React, { useEffect, useState } from "react";
import axios from "axios";

const MyStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/stories/my_stories");
        setStories(response.data.stories);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserStories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>My Stories</h2>
      {stories.map((story) => (
        <div key={story._id}>
          <h3>{story.title}</h3>
          <p>{story.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MyStories;

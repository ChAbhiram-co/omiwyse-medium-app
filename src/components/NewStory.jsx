import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewStory() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [moral, setMoral] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  console.log(JSON.parse(localStorage.getItem("articles")));

  const handleSave = () => {
    if (!title || !author || !moral || !content) {
      alert("All fields are required!");
      return;
    }

    const newStory = {
      id: Date.now(), 
      title,
      author,
      moral,
      content,
    };
    const savedStories = JSON.parse(localStorage.getItem("articles")) || [];
    
    savedStories.push(newStory);
    localStorage.setItem("articles", JSON.stringify(savedStories));

    alert("Story saved successfully!");
    navigate("/"); 
  };

  return (
    <div className="new-story-container">
      <h2>Write Your Story</h2>
      <input
        type="text"
        placeholder="Story Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Moral of the Story"
        value={moral}
        onChange={(e) => setMoral(e.target.value)}
      />
      <textarea
        placeholder="Write your story here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Save Story</button>
    </div>
  );
}

export default NewStory;

//console.log(localStorage.getItem("articles"));


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve articles from local storage
  const [article, setArticle] = useState(null);
  const [moral, setMoral] = useState("");
  const [content, setContent] = useState(""); // Added state for content

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const articleIndex = storedArticles.findIndex((a) => a.id.toString() === id);

    if (articleIndex !== -1) {
      setArticle(storedArticles[articleIndex]);
      setMoral(storedArticles[articleIndex].moral); // Initialize moral state
      setContent(storedArticles[articleIndex].content); // Initialize content state
    } else {
      alert("Article not found!");
    }
  }, [id]); // When `id` changes, run the effect

  const handleMoralChange = (e) => {
    setMoral(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value); // Update content when user t
  };

  const handleSave = () => {
    if (!article) return; 

    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const articleIndex = storedArticles.findIndex((a) => a.id.toString() === id);

    if (articleIndex !== -1) {
      storedArticles[articleIndex].moral = moral;
      storedArticles[articleIndex].content = content; 
      localStorage.setItem("articles", JSON.stringify(storedArticles));
      alert("Article updated successfully!");
      navigate(`/article/${id}`); // Navigate to the article detail page
    } else {
      alert("Error: Article not found in storage.");
    }
  };

  if (!article) {
    return <h2>⚠️ Article Not Found!</h2>;
  }

  return (
    <div className="edit-article">
      <h1>Edit Article: {article.title}</h1>
      <h3>By {article.author}</h3>

      <label>
        <strong>Edit Content:</strong>
        <textarea
          value={content}
          onChange={handleContentChange} // Handle content change
          rows="10"
          className="content-textarea"
        />
      </label>

      <label>
        <strong>Edit Moral:</strong>
        <input type="text" value={moral} onChange={handleMoralChange} />
      </label>

      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}

export default EditArticle;

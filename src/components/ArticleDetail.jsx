import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function ArticleDetail() {
  //useParams is a hook provided by React Router that enables access to dynamic parameters from the current URL
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // State for articles
  const [articles, setArticles] = useState([]);

  // Load articles from localStorage when component mounts
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    setArticles(storedArticles);
  }, []);

  // Find the current article using ID
  const article = state?.article || articles.find((a) => a.id === Number(id));

  if (!article) {
    return <h2>Article Not Found</h2>;
  }

  // State for editing
  const [editedMoral, setEditedMoral] = useState(article.moral);
  const [editedContent, setEditedContent] = useState(article.content);
  const [isEditing, setIsEditing] = useState(false);

  // Save edited article
  const handleSave = () => {
    console.log("Saving article...");

    // Update the article in the array
    const updatedArticles = articles.map((a) =>
      a.id === article.id ? { ...a, moral: editedMoral, content: editedContent } : a
    );

    // Save updated articles in localStorage
    localStorage.setItem("articles", JSON.stringify(updatedArticles));

    // Update state to reflect changes
    setArticles(updatedArticles);
    setIsEditing(false);
  };
  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this article?");
    if (confirmDelete) {
      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      // Remove selected 
      const updatedArticles = storedArticles.filter((a) => a.id !== article.id);
      // Track deleted articles to prevent reloading after logout
      const deletedArticleIds = JSON.parse(localStorage.getItem("deletedArticles")) || [];
      if (!deletedArticleIds.includes(article.id)) {
        localStorage.setItem("deletedArticles", JSON.stringify([...deletedArticleIds, article.id]));
      }
      // Save updated articles
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      setArticles(updatedArticles);
      navigate("/");
    }
  };
  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <h3>By {article.author}</h3>
      <hr />

      <strong>Content:</strong>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="edit-textarea"
        />
      ) : (
        <p>{editedContent}</p>
      )}

      <br />

      <strong>Moral:</strong>
      {isEditing ? (
        <textarea
          value={editedMoral}
          onChange={(e) => setEditedMoral(e.target.value)}
          className="edit-textarea"
        />
      ) : (
        <p>{editedMoral}</p>
      )}

      <br />

      {isEditing ? (
        <>
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </>
      ) : (
        <>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="edit-button" onClick={handleDelete}>Delete</button>
        </>
      )}
      <button onClick={() => navigate("/")} className="back-button">← Back to Articles</button>
    </div>
  );
}
export default ArticleDetail;
//<button className="edit-button" >Delete</button></>

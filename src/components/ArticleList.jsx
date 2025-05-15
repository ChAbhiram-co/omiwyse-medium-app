import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import articles from "./data/articleContent";

function ArticleList({searchText}) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  // Default hardcoded stories
  const defaultArticles = [
    { id: 1, title: "The Thief’s Story",
     author: "Ruskin Bond",
     moral: "Trust and kindness can transform a person’s life." ,
     content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief. He had learned the art of stealing from a young age and survived by robbing people. One day, he met a kind-hearted man named Arun, who was in his early twenties and worked as a writer. Deepak saw Arun as an easy target, so he tricked him into offering him work. Arun, unaware of Deepak’s true intentions, allowed him to stay in his house and even promised to teach him how to read and write. At first, Deepak planned to rob Arun as soon as he got the chance. He noticed that Arun kept money under his mattress. One night, when Arun was asleep, Deepak finally decided to steal from him. He quietly took the money and ran away.As he walked through the streets, a strange feeling of guilt started creeping into his heart. For the first time, someone had trusted him and given him a chance to change. Arun had been kind to him, treating him like a student rather than a servant. This thought troubled Deepak. He stood near a clock tower, hesitating.In the end, his conscience won over his greed. He decided to return the money. Silently, he slipped back into Arun’s house and kept the money under the mattress.The next morning, Arun noticed the damp notes but said nothing. Instead, he smiled at Deepak and gave him a cup of tea. Deepak knew that Arun had understood everything, but his kindness remained unchanged."},
    { id: 2, title: "Idgah",
      author: "Munshi Premchand",
      moral: "True love is selfless. Hamid’s sacrifice teaches us that caring for others is more important than personal pleasures." ,
      content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief."},
    { id: 3, title: "The Monkey and the Crocodile",
     author: "Vishnu Sharma", 
     moral: "Wisdom and quick thinking can save you from any danger. Also, one should never betray a true friend.", 
     content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief."},
    { id: 4, title: "The Value of Time", 
      author: "David Thompson", 
      moral: "Time is our most precious resource, use it wisely.",
      content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief." },
    { id: 5, title: "Silence Can Manifest Everything",
       author: "Krishnamurti", 
       moral: "Silence is not empty; it is full of answers. When the mind is calm, everything manifests effortlessly." ,
       content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief."},
    { id: 6, title: "Hard Work Pays Off",
     author: "James Lee",
     moral: "Effort and dedication always lead to rewards.",
     content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief." },
    { id: 7, title: "The Clay Toy", 
     author: "Rabindranath Tagore", 
     moral: "Silence is not weakness; it is power. A quiet mind sees what a restless one cannot.",
     content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief." },
    { id: 8, title: "The Silent River.", 
     author: "R.K. Narayan", 
     moral: "Dream big; imagination leads to great achievements.",
     content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief."},
    { id: 9, title: "Love and Compassion",
     author: "Isabella ", 
     moral: "A heart filled with love brings happiness to all.",
     content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief." },
    { id: 10, title: "Knowledge is Power", 
      author: "Ethan Garcia", 
      moral: "Learning and wisdom open doors to new possibilities." ,
      content: "Once upon a time, a 15-year-old boy named Deepak was a skilled thief."}
  ];

  // console.log(articles);
  
  // Load stories from localStorage or use default stories
    const [articles, setArticles] = useState(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles"));
    return storedArticles ? [...defaultArticles, ...storedArticles]: defaultArticles;
  });


  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const deletedArticleIds = JSON.parse(localStorage.getItem("deletedArticles")) || [];
    const filteredDefaults = defaultArticles.filter(a => !deletedArticleIds.includes(a.id));
    const updatedArticles = [...filteredDefaults, ...storedArticles];
    setArticles(updatedArticles);
  }, []);
  const handleRestoreStories = () => {
    localStorage.removeItem("deletedArticles"); 
    setArticles([...defaultArticles, ...JSON.parse(localStorage.getItem("articles")) || []]); 
    //alert("Default stories restored!");
    confirm("Default stories restored!");
  };

  /*///useEffect(() => {
    //localStorage.setItem("articles", JSON.stringify(articles.filter(a => !defaultArticles.some(d => d.id === a.id))));
  //}, [articles]);
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    setArticles([...defaultArticles, ...storedArticles]);
}, []);*/

  
  //const filteredArticles = articles.filter(article =>
    //article.title.includes(searchText)
//);
 // Filter 
 const filteredArticles = articles.filter(article =>
 article.title.toLowerCase().includes(searchText.toLowerCase())
);
//console.log(articles)
console.log(filteredArticles)
  const handleNavigation = (article) => {
    if (isLoggedIn !== "true") {
      alert("You need to log in to view this article!");
      return;
    }
    navigate(`/article/${article.id}`, { state: { article } });
  };

  return (
    <div className="article-container">
      <h2>Stories</h2>
      <div className="article-grid">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-card">
            <h3>{article.title}</h3>
            <p><strong>{article.author}</strong></p>
            <p>{article.moral}</p>

            <button className="arrow-btn" onClick={() => handleNavigation(article)}>→</button>
          </div>
          
        ))}
      </div>
      <button onClick={handleRestoreStories} className="restore-button">
  Restore Default Stories
</button>
    </div>
  );
}
export default ArticleList;


// Filter 
// const filteredArticles = articles.filter(article =>
// article.title.toLowerCase().includes(searchText.toLowerCase())
//);


import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ArticleList from "./components/ArticleList"; 
import ArticleDetail from "./components/ArticleDetail";
import Membership from "./page/Membership"; 
import Footer from "./components/Footer"; 
import "./styles.css";
import NewStory from "./components/NewStory";
import EditArticle from "./components/EditArticle";  
import { useState } from "react";
import Jokes from  "./page/Jokes";
import Weather from "./components/Weather";
import Users from "./components/Users"; 

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
function AppContent() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [searchText, setSearchText] = useState("");
  return (
    <>  
      <Header isLoggedIn={isLoggedIn} setSearchText={setSearchText} />
      {location.pathname === "/" && <HeroSection />}
      <Routes> 
        <Route path="/" element={<ArticleList searchText={searchText} />} /> 
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/new-story" element={<NewStory />} />
        <Route path="/edit-article/:id" element={<EditArticle />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;

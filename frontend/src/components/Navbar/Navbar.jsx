import React, { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin, setCategory }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const suggestionsRef = useRef(null);

  const allItems = [
    { name: "Salad" },
    { name: "Soups" },
    { name: "Snacks" },
    { name: "Desserts" },
    { name: "Meals" },
    { name: "Shakes" },
    { name: "Pasta" },
    { name: "Noodles" },
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setSuggestions(
        allItems.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (categoryName) => {
    setSearchQuery(categoryName);
    setSuggestions([]);
    setIsFocused(false);
    
    // Navigate to the explore menu section
    navigate("/");
    
    // Set timeout to ensure the page has loaded before scrolling
    setTimeout(() => {
      const exploreMenuSection = document.getElementById("explore-menu");
      if (exploreMenuSection) {
        exploreMenuSection.scrollIntoView({ behavior: "smooth" });
        
        // Set the selected category
        setCategory(categoryName);
      }
    }, 100);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() !== "") {
      // Find matching category
      const matchingItem = allItems.find(
        item => item.name.toLowerCase() === searchQuery.toLowerCase()
      );
      
      if (matchingItem) {
        handleSuggestionClick(matchingItem.name);
      } else {
        // Search for partial matches
        const partialMatch = allItems.find(
          item => item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (partialMatch) {
          handleSuggestionClick(partialMatch.name);
        } else {
          // If no match, just navigate to menu
          navigate("/");
          setTimeout(() => {
            const exploreMenuSection = document.getElementById("explore-menu");
            if (exploreMenuSection) {
              exploreMenuSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      }
    }
  };

  return (
    <div className="navbar">
      <Link to="/"><img className="logo" src={assets.logo} alt="Nutrivista Logo" /></Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>Home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>Menu</a>
        <a href="#app-download" onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>Mobile App</a>
        <a href="#footer" onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>Contact Us</a>
      </ul>

      {/* SEARCH BAR - Reduced Size */}
      <form className={`search-bar ${isFocused ? "focused" : ""}`} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search meals..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
        />
        
        {suggestions.length > 0 && isFocused && (
          <div className="suggestions" ref={suggestionsRef}>
            {suggestions.map((item, index) => (
              <div 
                key={index} 
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </form>

      <div className="navbar-right">
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
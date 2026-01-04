import "./styles/userinfo.css";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function UserDataGet() {
    const [likesMovies, setlikesMovies] = useState(false);
    const [likesTV, setlikesTV] = useState(false);
    const [GenresLiked, setGenresLiked] = useState([]);
    const navigate = useNavigate();
    

    const handleToggle = (e) => {
        e.preventDefault();
        const button = e.target;
        button.classList.toggle("selected");
        if (button.textContent === "Movies") {
            setlikesMovies(!likesMovies);
        } else if (button.textContent === "TV Shows") {
            setlikesTV(!likesTV);
        } else {
            const genre = button.textContent;
            setGenresLiked(prevGenres => {
                if (prevGenres.includes(genre)) {
                    return prevGenres.filter(g => g !== genre); // Remove genre if already selected
                } else {
                    return [...prevGenres, genre]; // Add genre if not selected
                }
            });
        
    }};

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = localStorage.getItem("username");
        const port = import.meta.env.VITE_PORT;
        axios.post(`http://localhost:${port}/setpreferences`, { username, likesMovies, likesTV, GenresLiked })
        .then(res => {
            console.log(res);
            navigate('/home');
        })
        .catch(err => {
            console.log('Error submitting preferences:', err);
        });

    }

  return (
    <>
      <Header />
      <form className="userinfo" onSubmit={handleSubmit}>
        <h1>Lets get started</h1>
        <span>What would you like to watch?</span>
        <div className="types">
          <button onClick={handleToggle}>Movies</button>
          <button onClick={handleToggle}>TV Shows</button>
        </div>
        <span>What genres do you like?</span>
        <div className="genres">
          <button onClick={handleToggle}>Action</button>
          <button onClick={handleToggle}>Adventure</button>
          <button onClick={handleToggle}>Comedy</button>
          <button onClick={handleToggle}>Drama</button>
          <button onClick={handleToggle}>Fantasy</button>
          <button onClick={handleToggle}>Horror</button>
          <button onClick={handleToggle}>Romance</button>
          <button onClick={handleToggle}>Sci-Fi</button>
          <button onClick={handleToggle}>Thriller</button>
        </div>
        <button className="submituserdata">Submit</button>
      </form>
    </>
  );
}

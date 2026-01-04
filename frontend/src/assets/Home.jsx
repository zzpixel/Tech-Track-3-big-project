import Header from "./Header.jsx"
import "./styles/homepage.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState(null);
  const [avaibleOptions, setAvaibleOptions] = useState(null); // Options available to the user based on login status
  const navigate = useNavigate();


  const port = import.meta.env.VITE_PORT; // Defined port for simplicity. Vite has a saftey feature that prevents ENV vars from being accessed unless they start with VITE_.

  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Once again, local storage is insecure, just for proof of concept
    
    if (storedUsername) {
      setUsername(" " + storedUsername);
      setAvaibleOptions(<></>)
      axios.get(`http://localhost:${port}/user/${storedUsername}`) // Fetch user data from backend
      .then(res => {
        console.log(res);
        if (res.data.GenresLiked.length === 0) { // If user has not set up preferences yet
          setAvaibleOptions(<button onClick={() => navigate('/getstarted')}>Get Started</button>)
        } else {
          setAvaibleOptions(<>Placeholder</>)
        }
      })
      .catch(err => {
        console.log('Error fetching user data:', err);
      })
    }
    else { // if user is not logged in
      setUsername(""); // instead of undefined
      setAvaibleOptions(<span>Please <a href="/signin">Signin</a> or <a href="/signup">Signup</a> to continue.</span>) 
    }
  }, []);

  return (
    <div>
      <Header/>
      <h1>Welcome{username}!</h1>
      {avaibleOptions}
    </div>
  )
}
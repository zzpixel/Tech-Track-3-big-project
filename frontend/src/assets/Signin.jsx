import "./styles/signinup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warnBox, setwarnBox] = useState(null);
  const navigate = useNavigate();

  const port = import.meta.env.VITE_PORT; // Defined port for simplicity. Vite has a saftey feature that prevents ENV vars from being accessed unless they start with VITE_.

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission / page reload
    axios.post(`http://localhost:${port}/login`, { username, password }) // Send signin data to backend
    .then(res => {
      console.log(res);
      if (res.data === "Success") {
        localStorage.setItem("username", username); // Store username in localStorage this is extremely insecure, just for use as proof of concept
        navigate("/home"); // Redirect to home on successful signin
      } else {
        setwarnBox(<span className="warning">{res.data}</span>); // Display failed login message
      }
    })
    .catch(err => {
      console.log('Error:', err);
      setwarnBox(<span className="warning">An error occurred during login</span>); // Display error message
    })
  }
  return (
    <form className="mainform" onSubmit={handleSubmit}>
        <h1 className="welcomebanner">Welcome back!</h1>
        <div className="signupdiv">
            <h1>Sign In</h1>
            <span>Username</span>
            <input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
            <span>Password</span>
            <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button> 
            {/* Buttons within 'form' html elements automatically 'submit' the form.
                Default behavior of the button can be changed manually. */}
            {warnBox}
            <div> <p>Dont have an account yet?</p> <a href="">Click here to Signup</a> </div>
           
        </div>

    </form>
  )
}
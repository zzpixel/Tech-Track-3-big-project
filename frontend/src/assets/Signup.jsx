import { useState } from "react";
import "./styles/signinup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [warnBox, setwarnBox] = useState(null);

  const navigate = useNavigate();

  const port = import.meta.env.VITE_PORT; // Defined port for simplicity. Vite has a saftey feature that prevents ENV vars from being accessed unless they start with VITE_.

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission / page reload
    axios.post(`http://localhost:${port}/register`, { username, password, email }) // Send signup data to backend
    .then(res => {
      console.log(res);
      if (res.data === "Username already taken") {
        setwarnBox(<span className="warning">Username already taken</span>);
      } else if (res.data === "Username cannot be empty / contain spaces") {
        setwarnBox(<span className="warning">Username cannot be empty or contain spaces</span>);
      } else {
        localStorage.setItem("username", username); // Store username in localStorage
        navigate("/home"); // Redirect to home on successful signup
      }
    })
    .catch(err => {
      console.log(err);
      setwarnBox(<span className="warning">An error occurred during signup</span>); // Display simple error message.
    })
  }

  return (
    
    <form className="mainform" onSubmit={handleSubmit}>
        <h1 className="welcomebanner">Welcome!</h1>
        <div className="signupdiv">
            <h1>Signup</h1>
            <span>Username</span>
            <input type="text" placeholder="Create a Username" onChange={(e) => setUsername(e.target.value)}/>
            <span>Password</span>
            <input type="password" placeholder="Create a Password" onChange={(e) => setPassword(e.target.value)}/>
            <span>Email</span>
            <input type="text" placeholder="Enter Email (Optional)" onChange={(e) => setEmail(e.target.value)}/>
            <button>Lets get started!</button>
            {warnBox}
            <div> <p>Already have an account?</p> <a href="">Click here to Login</a> </div>
           
        </div>

    </form>
  )
}
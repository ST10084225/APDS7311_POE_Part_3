import React from "react";
// We import bootstrap to make our application look better.
import "../styles/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
 // Here, we display our Navbar
export default function Navbar() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

 return (
   <div>
     <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
      <a className="navbar-brand" style={{'font-size': '50px'}}  href="/">Mernify</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
         <ul className="navbar-nav me-auto">
         <li className="nav-item">
             <NavLink className="nav-link" to="/">
              Posts
             </NavLink>
           </li>
           <li className="nav-link">|</li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Create Post
             </NavLink>
           </li>
           <li className="nav-link">|</li>
           <li>
           <NavLink className="nav-link" to="/register">
               Register
             </NavLink>
           </li>
           <li className="nav-link">|</li>
           <li>
           <NavLink className="nav-link" to="/login">
               Login
             </NavLink>
           </li>
           <li className="nav-link">|</li>
           <li>
            <NavLink className="nav-link" to="/login" onClick={() => {Logout();}}>
            Logout
            </NavLink>
           </li>
         </ul>
       </div>
       </div>
     </nav>
   </div>
 );
}
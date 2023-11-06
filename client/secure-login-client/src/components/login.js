import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Login() {
 const [form, setForm] = useState({
   email: "",
   password: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
// This function will handle the submission.
async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
  
    await fetch("https://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson)
    }).then((response) => response.json()
    .then((data) => 
    {
      console.log(data, "Datas");
      localStorage.setItem('token', JSON.stringify(data.token))
      console.log(data.token, "Token")
      if (response.ok){
        navigate("/");
      }
      else
      {
        window.alert("No account matching these login details exists")
      }
    }))
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setForm({ email: "", password: ""});
}
  // This following section will display the form that takes the input from the user.
 return (
   <div className="m-2">
     <h3>Login</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
    
       <div className="form-group mt-2">
         <input
           type="submit"
           value="Login"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 export default function Edit() {
 const [form, setForm] = useState({
   caption: "",
   posts: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      const id = params.id.toString();
      const response = await fetch(`https://localhost:4000/api/posts/get/${params.id.toString()}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        },
      });
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const record = await response.json();
      if (!record) {
        window.alert(`Post with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setForm(record);
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      caption: form.caption,
    };
  
    // This will send a post request to update the data in the database.
    const token = localStorage.getItem('token')
    await fetch(`https://localhost:4000/api/posts/${params.id.toString()}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    });
  
    navigate("/");

}
  // This following section will display the form that takes input from the user to update the data.
 return (
   <div className="m-2">
     <h3>Edit Post</h3>
     <card className="card border-primary" style={{ marginTop: 20, 'overflow': 'hidden', padding: 20}}>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="caption">Caption: </label>
         <input
           type="text"
           className="form-control"
           id="caption"
           value={form.caption}
           onChange={(e) => updateForm({ caption: e.target.value })}
         />
       </div>
       <div className="form-group mt-2">
         <input
           type="submit"
           value="Update post"
           className="btn btn-primary"
         />
       </div>
     </form>
     </card>
   </div>
 );
}
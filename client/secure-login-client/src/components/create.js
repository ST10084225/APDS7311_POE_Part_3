import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    caption: ""
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newPost = { ...form };
    const token = localStorage.getItem('token')
    console.log('tokens in create', token)

    await fetch("https://localhost:4000/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(newPost),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({caption: ""});
    navigate("/");
  }

  const token = localStorage.getItem('token')
  if (!token){
  navigate("/login");
  }
  else if (token)
  {
    return (
      <div className="m-2">
        <h3>Create New Post</h3>
        <card className="card border-primary" style={{ marginTop: 20, 'overflow': 'hidden', padding: 20}}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
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
              value="Create Post"
              className="btn btn-primary"
            />
          </div>
        </form>
        </card>
      </div>
    );
  }
}
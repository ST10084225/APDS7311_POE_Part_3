import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const Record = (props) => (
 <tr>
   <td>{props.caption}</td>
   <td>
   <button className="btn btn-link"
       onClick={() => {
         props.editRecord(props._id);
       }}>Edit</button> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);

export default function RecordList() {
 const [records, setRecords] = useState([]);
 const navigate = useNavigate();
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const token = localStorage.getItem('token')
      const response = await fetch(`https://localhost:4000/api/posts/`, {
        method: "GET",
        headers: {
          authorization: token,
        }
      });
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        navigate("/login")
        return;
      }
  
      const records = await response.json();
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length]);
  
  // This method will delete a record
  async function deleteRecord(id) {
    const token = localStorage.getItem('token')
    console.log('tokens in create', token)
    await fetch(`https://localhost:4000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      }
    });
  
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
}

async function editRecord(id) {

navigate('/edit/' + id)  
  }

  // This method will map out the records on the table
 function recordList() {
  if (records.length > 0){
   return records.map((record) => {
     return (
       <Record
         caption={record.caption}
         editRecord={() => editRecord(record._id)}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
  }
  else{
    return ( <tr>
      <td>No Posts Added</td>
      <td></td>
    </tr> )
  }
 }
  // This following section will display the table with the records of individuals.
  const token = localStorage.getItem('token')
  if (token){
 return (
   <div className="m-2">
     <h3>Record List</h3>
     <card className="card border-primary" style={{ marginTop: 20, 'overflow': 'hidden'}}>
     <table className="table">
       <thead className="table-primary">
         <tr>
           <th>Caption</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody className="table-secondary">{recordList()}</tbody>
     </table>
     </card>
   </div>
 );
  }
  else
  {
    navigate("/login");
  }
}
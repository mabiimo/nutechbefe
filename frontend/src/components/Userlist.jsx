import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUsers = (usersId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Users!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/users/${usersId}`);
        getUsers();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <h1 className="title ">Users</h1>
      <h2 className="subtitle">List Of Users </h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>no.</th>
            <th>name</th>
            <th>email</th>
            <th>role</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((users, index) => (
            <tr key={users.UUID}>
              <td>{index + 1}</td>
              <td>{users.name}</td>
              <td>{users.email}</td>
              <td>{users.role}</td>
              <td>
                <Link to={`/users/edit/${users.uuid}`} className="button is-small is-info">
                  Edit
                </Link>
                <button onClick={() => deleteUsers(users.uuid)} className="button is-small is-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;

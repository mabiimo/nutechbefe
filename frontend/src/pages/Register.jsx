import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidht">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={saveUser} className="box">
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input type="password" placeholder="Conf Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="input" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">role</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field ">
                  <div className="control">
                    <button type="submit" className="button is-success is-fullwidth">
                      Register
                    </button>
                  </div>
                </div>
                <div className="is-centered">
                  <Link to={"/"}>Already have an account? Login here!</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

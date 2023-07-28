import React from "react";

const FormEditUser = () => {
  return (
    <div>
      <h1 className="title ">User</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" placeholder="Name" className="input" />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input type="text" placeholder="Email" className="input" />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input type="password" placeholder="Password" className="input" />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input type="password" placeholder="Conf Password" className="input" />
                </div>
              </div>
              <div className="field">
                <label className="label">role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field ">
                <div className="control">
                  <button className="button is-success ">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;

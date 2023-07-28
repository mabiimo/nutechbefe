import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu has-shadow pl-2">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/product"}>Product</NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>Users</NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Setting</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-light ">
              Log Out
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;

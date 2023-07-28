import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <React.Fragment>
        <Navbar />
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
          <div className="column is-2">
            <Sidebar />
          </div>
          <div className="column has-bacground-light">
            <main>{children}</main>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Layout;

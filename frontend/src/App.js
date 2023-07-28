import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Register from "./pages/Register";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

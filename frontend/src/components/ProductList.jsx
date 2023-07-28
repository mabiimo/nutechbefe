import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormAddProduct from "./FormAddProduct";
import Swal from "sweetalert2";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/product");
    setProduct(response.data);
  };

  const handleAddNewClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const deleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/product/${productId}`);
        getProducts();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="is-fullwidth">
      <h1 className="title">Product</h1>
      <h2 className="subtitle">List Of Product</h2>
      <button onClick={handleAddNewClick} className="button is-primary mb-2">
        Add New
      </button>
      <table className="table is-striped is-fullwidth">
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product.uuid}>
              <td>
                <img src={product.image} alt={product.name} style={{ width: "100px" }} />
              </td>
              <td>{product.name}</td>
              <td>{product.buyPrice}</td>
              <td>{product.sellPrice}</td>
              <td>
                <Link to={`/product/edit/${product.uuid}`} className="button is-small is-info">
                  Edit
                </Link>
                <button onClick={() => deleteProduct(product.uuid)} className="button is-small is-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
          {Array.from({ length: Math.ceil(product.length / productsPerPage) }).map((_, index) => (
            <li key={index}>
              <button className={`pagination-link${index + 1 === currentPage ? " is-current" : ""}`} aria-label={`Goto page ${index + 1}`} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {showForm && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleCloseForm}></div>
          <div className="modal-content">
            <FormAddProduct />
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={handleCloseForm}></button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

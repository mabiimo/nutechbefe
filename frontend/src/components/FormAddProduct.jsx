import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UploadImage from "./FileUpload";

const FormAddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [buyPrice, setBuyprice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");
  const [msg, setMsg] = useState("");

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Berhasil Menyimpan Product ",
        text: "Silahkan Kembali ke Halaman Product Kemudian Refresh",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
        timer: 2500,
      });

      await axios.post("http://localhost:5000/product", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        name: name,
        buyPrice: buyPrice,
        sellPrice: sellPrice,
        stock: stock,
      });
      navigate("/product");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <form onSubmit={saveProduct}>
      <div className="box p-5 is-shadow">
        <p className="has-text-centered">{msg}</p>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
          </div>
        </div>
        <div className="field">
          <label className="label">Buy Price</label>
          <div className="control">
            <input type="text" placeholder="Buy Price" value={buyPrice} onChange={(e) => setBuyprice(e.target.value)} className="input" />
          </div>
        </div>
        <div className="field">
          <label className="label">Sell Price</label>
          <div className="control">
            <input type="text" placeholder="Sell Price" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} className="input" />
          </div>
        </div>
        <div className="field">
          <label className="label">Stock</label>
          <div className="control">
            <input type="text" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="input" />
          </div>
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            {/* Menggunakan komponen UploadImage */}
            <UploadImage />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-success" type="submit">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormAddProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        const { name, buyPrice, sellPrice, stock } = response.data;
        setName(name);
        setBuyPrice(buyPrice);
        setSellPrice(sellPrice);
        setStock(stock);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/product/${id}`, {
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
    <div>
      <h1 className="title">Product</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
                </div>
              </div>
              <div className="field">
                <label className="label">Buy Price</label>
                <div className="control">
                  <input type="text" placeholder="Buy Price" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} className="input" />
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
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
